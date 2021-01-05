import React, { useEffect, useState } from 'react'
import db from './firebase';
import './Piece.css';
import * as myFunc from './Utils/Utils.js';
// "♔♕♗♘♙♖♚♛♝♞♟♜"
const icons = {
    wKing : "♔",
    wQueen:"♕",
    wBishop:"♗",
    wHorse:"♘",
    wElephant:"♖",
    wPawn:"♙",
    bKing : "♚",
    bQueen:"♛",
    bBishop:"♝",
    bHorse:"♞",
    bElephant:"♜",
    bPawn:"♟",
}
const initialSet=[
    icons.bElephant,icons.bHorse,icons.bBishop,icons.bQueen,icons.bKing,icons.bBishop,icons.bHorse,icons.bElephant,
    icons.bPawn,icons.bPawn,icons.bPawn,icons.bPawn,icons.bPawn,icons.bPawn,icons.bPawn,icons.bPawn,
    "","","","","","","","",
    "","","","","","","","",
    "","","","","","","","",
    "","","","","","","","",
    icons.wPawn,icons.wPawn,icons.wPawn,icons.wPawn,icons.wPawn,icons.wPawn,icons.wPawn,icons.wPawn,
    icons.wElephant,icons.wHorse,icons.wBishop,icons.wQueen,icons.wKing,icons.wBishop,icons.wHorse,icons.wElephant
];

export default function Pieces({streamName,player,setPlayer,martyr,setMartyr}) {   
    const [pieceMapping,setPieceMapping] = useState(initialSet);
    const [srcSelected,setSrcSelected] = useState(false);
    var [srcIndex,setSrcIndex] = useState(-1);   
    var destIndex = -1;
    //console.log(streamName);

    useEffect(()=>{
        checkMate();                    
    });
    useEffect(()=>{
        const unSubscribe = db.collection("GameStream")
        .doc(streamName)
        .get()
        .then((docSnap)=>{
            if(docSnap.exists){
                if(docSnap.data().joinedPlayerOnStream===2){
                    alert("This stream is busy!");
                    console.log("Busy Stream");
                    window.location.reload();
                }
                //Joining the stream
                db.collection("GameStream").doc(streamName).set({
                    playerTurnOnStream:1,
                    joinedPlayerOnStream:2,
                    pieceMappingOnStream:initialSet,
                    martyrListOnStream:martyr,
                }).then(()=>{
                    db.collection("GameStream").doc(streamName).onSnapshot((snapShot)=>{
                        let recievedData = snapShot.data();
                        setPieceMapping(recievedData.pieceMappingOnStream);
                        setPlayer(recievedData.playerTurnOnStream);
                        setMartyr(recievedData.martyrListOnStream);
                    });
                })
            }
            else{
                createGameStream().then(()=>{
                    db.collection("GameStream").doc(streamName).onSnapshot((snapShot)=>{
                        let recievedData = snapShot.data();
                        setPieceMapping(recievedData.pieceMappingOnStream);
                        setPlayer(recievedData.playerTurnOnStream);
                        setMartyr(recievedData.martyrListOnStream);
                    });
                });
            }
        })
        return unSubscribe;
    },[]);
    const createGameStream = async()=>{
        await db.collection("GameStream").doc(streamName).set({
            playerTurnOnStream:1,
            joinedPlayerOnStream:1,
            pieceMappingOnStream:initialSet,
            martyrListOnStream:martyr,
        })
        .then(()=>{console.log("Doc initalised")})
        .catch((err)=>{console.log(err)});
    }
    

    const checkMate = ()=>{
        if(martyr.includes(icons.wKing)||martyr.includes(icons.bKing)){
            var resp = window.confirm("GAME OVER");
            if(resp===true) window.location.reload();
        } 
    }

    const selectSource= (e)=>{      
        const pieceVal= e.target.innerText;
        const id = e.target.id;
        let index = parseInt(id);
        console.log(player);
        const isValid = myFunc.checkSelectionValidity(pieceVal,player,index,pieceMapping);
        if(!isValid){
            console.log("In select source");
            alert("Unvalid selection");
            return;
        }        
        setSrcIndex(index);
        setSrcSelected(true);        
    }
    
    const selectDest = async (e)=>{
        const pieceVal = e.target.innerText;
        const id = e.target.id;
        console.log(player);
        console.log(srcSelected);
        console.log(pieceVal);
        const isValid = myFunc.checkTargetValidity(pieceVal,player);
        if(!isValid){
            console.log("In select dest");
            alert("Unvalid selection");
            return;
        }
        let index = parseInt(id);
        destIndex = index;
        const canIMove = myFunc.isValidMove(srcIndex,destIndex,pieceMapping);
        if(!canIMove){
            alert("Uh oh can't go there");            
            return;
        }
        //Update piece mapping && change Player;
        const [newMartyrList,newPieceMapping] = myFunc.move(srcIndex,destIndex,pieceMapping,martyr);
        // setPieceMapping(newPieceMapping);
        // setMartyr(newMartyrList);
        // setPlayer((prev)=>{
        //     if(prev===1) return 2;
        //     return 1;
        // });
        let newPlayerTurn = player===1?2:1;
        db.collection("GameStream").doc(streamName).update({
            pieceMappingOnStream:newPieceMapping,
            martyrListOnStream:newMartyrList,
            playerTurnOnStream:newPlayerTurn,
        });
        setSrcSelected(false);  
    }
    return (
        <>
            <div className="piece-board">
                {
                        pieceMapping.map((item,i)=>{ 
                                var idStr = i.toLocaleString();
                                                          
                                return <div key={i} id={idStr} className="piece" 
                                onClick={(e)=>{
                                    if(srcSelected){
                                        selectDest(e);
                                        
                                    } 
                                    else{
                                        selectSource(e);
                                        }
                                    }}> {item} </div>        
                        })
                        
                }
            </div>
        </>
    )
}
