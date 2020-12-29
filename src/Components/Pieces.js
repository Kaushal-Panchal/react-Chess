import React, { useEffect, useState } from 'react'
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

export default function Pieces({player,setPlayer,martyr,setMartyr}) {   
    const [pieceMapping,setPieceMapping] = useState(initialSet);
    const [srcSelected,setSrcSelected] = useState(false);
    var [srcIndex,setSrcIndex] = useState(-1);   
    var destIndex = -1;

    useEffect(()=>{
        checkMate();
    });
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
        const isValid = myFunc.checkSelectionValidity(pieceVal,player,index,pieceMapping);
        if(!isValid){
            alert("Unvalid selection");
            return;
        }        
        setSrcIndex(index);
        setSrcSelected(true);        
    }
    
    const selectDest = (e)=>{
        const pieceVal = e.target.innerText;
        const id = e.target.id;
        const isValid = myFunc.checkTargetValidity(pieceVal,player);
        if(!isValid){
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
        setPieceMapping(newPieceMapping);
        setMartyr(newMartyrList);
        setPlayer((prev)=>{
            if(prev===1) return 2;
            return 1;
        });
        setSrcIndex(-1);
        destIndex = -1;
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
