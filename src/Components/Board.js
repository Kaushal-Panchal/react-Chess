import React from 'react'
import './Board.css'

const color=[
    0,1,0,1,0,1,0,1,
    1,0,1,0,1,0,1,0,
    0,1,0,1,0,1,0,1,
    1,0,1,0,1,0,1,0,
    0,1,0,1,0,1,0,1,
    1,0,1,0,1,0,1,0,
    0,1,0,1,0,1,0,1,
    1,0,1,0,1,0,1,0
];
export default function Board() {   

    return (
        <>
            <div className="board">
                {
                        color.map((item,i)=>{
                            if(item===0)
                                return <div key={i} className="red-box">  </div>                  
                            else 
                                return <div key={i} className="white-box">  </div>
         
                        })
                        
                }
            </div>
        </>
    )
}
