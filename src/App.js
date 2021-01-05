
import { useEffect, useState } from 'react';
import './App.css';
import Board from './Components/Board';
import Pieces from './Components/Pieces';

function App() {
  const [playerTurn,setPlayerTurn] = useState(1);
  const [martyred,setMartyred] = useState([]);
  const [streamId,setStreamId] = useState("");
  useEffect(()=>{
    
    setStreamId(prompt("Please enter a stream ID"));

  },[]);
  return (
    <>
    {
      streamId===""
      ?<div></div>
      :<div>
      <div className="info-col">
        <div className="item">a</div>
        <div className="item">b</div>
        <div className="item">c</div>
        <div className="item">d</div>
        <div className="item">e</div>
        <div className="item">f</div>
        <div className="item">g</div>
        <div className="item">h</div>
    </div>
    <div className="main">
      <div className="info-row">
        <div className="item">1</div>
        <div className="item">2</div>
        <div className="item">3</div>
        <div className="item">4</div>
        <div className="item">5</div>
        <div className="item">6</div>
        <div className="item">7</div>
        <div className="item">8</div>
      </div>
      <div className="board-body">  
        <Pieces streamName={streamId} player={playerTurn} setPlayer={setPlayerTurn} martyr={martyred} setMartyr={setMartyred}></Pieces>
        <Board ></Board>
        
      </div>
      <div className="information-board"> 
          <div className="player-info">Player
          {
            playerTurn===1?( 
              <div className="player">White</div>
            ):
            (
              <div className="player">Black</div>
            )
          }
          </div>
      </div>
    </div>
    <h1 style={{textAlign:'center'}}>Martyrs</h1>
    <div className="martyrs-list">
      {
        martyred.map((item,i)=>{
          return <div key={i} >{item}</div>
        })
      }
    </div>
      </div>
    }
    
    </>
  );
}

export default App;
