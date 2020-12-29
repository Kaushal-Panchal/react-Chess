export const checkSelectionValidity = (piece,player,index,arr)=>{
    if(piece==="")return false;
    let isWhite = whitePlayer.includes(piece);
    let isBlack = blackPlayer.includes(piece);
    let selectedPieceIsCorrect = false;
    if(player ===1 && isWhite) selectedPieceIsCorrect= true;
    if(player ===2 && isBlack) selectedPieceIsCorrect = true;
    if(!selectedPieceIsCorrect) return false;
    var moveIsValid = false;
    for (let i = 0; i < 64; i++) {
        if(i===index) continue;
        if(isValidMove(index,i,arr)) moveIsValid=true;       
    }
    
    return moveIsValid;
}
export const checkTargetValidity = (piece,player)=>{
    if(piece==="") return true;
    let isWhite = whitePlayer.includes(piece);
    let isBlack = blackPlayer.includes(piece);
    if(player ===1 && isBlack) return true;
    if(player ===2 && isWhite) return true;
    return false;
}

export const move = (srcIndex,destIndex,pieceArr,martyrArr)=>{
    if(pieceArr[destIndex]!==""){
        martyrArr.push(pieceArr[destIndex]);
        pieceArr[destIndex] = pieceArr[srcIndex];
        pieceArr[srcIndex] = "";
    }
    else{
        pieceArr[destIndex] = pieceArr[srcIndex];
        pieceArr[srcIndex] = "";
    }
    return [martyrArr,pieceArr];
}


export const isValidMove = (srcIndex,destIndex,arr)=>{
    
    var selectedPiece = arr[srcIndex];
    var moveIsValid = false;
    switch (selectedPiece) {
        case "♔":
            moveIsValid = kingMovePath(srcIndex,destIndex,arr);
            break;
        case "♚":
            moveIsValid = kingMovePath(srcIndex,destIndex,arr);
            break;
        case "♕":
            moveIsValid = queenMovePath(srcIndex,destIndex,arr);
            break;
        case "♛":
            moveIsValid = queenMovePath(srcIndex,destIndex,arr);
            break;
        case "♗":
            moveIsValid = bishopMovePath(srcIndex,destIndex,arr);
            break;
        case "♝":
            moveIsValid = bishopMovePath(srcIndex,destIndex,arr);
            break;
        case "♘":
            moveIsValid = horseMovePath(srcIndex,destIndex,arr);
            break;
        case "♞":
            moveIsValid = horseMovePath(srcIndex,destIndex,arr);
            break;    
        case "♖":
            moveIsValid = elephantMovePath(srcIndex,destIndex,arr);
            break;
        case "♜":
            moveIsValid = elephantMovePath(srcIndex,destIndex,arr);
            break;
        case "♙":
            
            moveIsValid = pawnMovePath(srcIndex,destIndex,arr);
            break;
        case "♟":
            
            moveIsValid = pawnMovePath(srcIndex,destIndex,arr);
            break;    
        default:
            break;
    }
    return moveIsValid;
}
//Top-Boundary = 0 - 7
//Left-Boundary = 0 - 56
//Right-Boundary = 7 - 63
//Bottom-Boundary = 56 - 63

//const boundary = [0,1,2,3,4,5,6,7,8,16,24,32,40,48,56,15,23,31,39,47,55,63,57,58,59,60,61,62];
const leftBoundary = [0,8,16,24,32,40,48,56];
const rightBoundary = [7,15,23,31,39,47,55,63];

const isBoundary = (currIndex,nextMove)=>{
    let isOnLeftBound = leftBoundary.includes(currIndex);
    let isOnRightBound = rightBoundary.includes(currIndex);
    if(isOnLeftBound && (nextMove===-1 ||nextMove===-9||nextMove===7)){
        return true;
    }
    else if(isOnRightBound &&(nextMove===1 ||nextMove===9||nextMove===-7)) return true;

    return false;
}

const kingMovePath =(srcIndex,destIndex,arr)=>{
    let currIndex = srcIndex;
    let movement =[9,-9,-7,7,8,1,-8,1];
    for (let i = 0; i < 8; i++) {
        if(currIndex+movement[i]===destIndex){
            if(arr[destIndex]==="") return true;
            else if(arr[destIndex]!=="" && isOppositePiece(arr[srcIndex],arr[destIndex])){
                return true;
            }
        }    
    }
    return false;
};
const queenMovePath =(srcIndex,destIndex,arr)=>{
    //Queen can move diagonally as well as straight
    let movement =[9,-9,-7,7,8,1,-8,1];
    for (let i = 0; i <8; i++) {
        let currIndex = srcIndex;
        while (currIndex>=0 && currIndex<64 && currIndex!==destIndex) {
            currIndex = currIndex + movement[i];
            if(currIndex===destIndex){
                if(arr[destIndex]==="") return true;
                else if(arr[destIndex]!=="" && isOppositePiece(arr[srcIndex],arr[destIndex])){
                    return true;
                }
                return false;
            }
            if(isBoundary(currIndex,movement[i])) break;
            if(arr[currIndex]!=="") break;
        }       
    }
    return false; 
};
const bishopMovePath =(srcIndex,destIndex,arr)=>{
    let movement =[9,-9,-7,7];
    for (let i = 0; i <4; i++) {
        let currIndex = srcIndex;
        while (currIndex>0 && currIndex<64 && currIndex!==destIndex) {
            currIndex = currIndex + movement[i];
            if(currIndex===destIndex){
                if(arr[destIndex]==="") return true;
                else if(arr[destIndex]!=="" && isOppositePiece(arr[srcIndex],arr[destIndex])){
                    return true;
                }
                return false;
            }
            if(isBoundary(currIndex,movement[i])) break;
            if(arr[currIndex]!=="") break;
        }       
    }
    return false; 
};
const elephantMovePath =(srcIndex,destIndex,arr)=>{
    let movement =[8,1,-8,1];
    for (let i = 0; i <4; i++) {
        let currIndex = srcIndex;
        while (currIndex>0 && currIndex<64 && currIndex!==destIndex) {
            currIndex = currIndex + movement[i];
            if(currIndex===destIndex){
                if(arr[destIndex]==="") return true;
                else if(arr[destIndex]!=="" && isOppositePiece(arr[srcIndex],arr[destIndex])){
                    return true;
                }
                return false;
            }
            if(isBoundary(currIndex,movement[i])) break;
            if(arr[currIndex]!=="") break;
        }       
    }
    return false;
};
const horseMovePath =(srcIndex,destIndex,arr)=>{
    //2 and half for horse
    let movement = [-17,-15,-6,10,17,15,6,10];
    let isOnLeftBound = false;
    let isOnRightBound = false;
    for (let i = 0; i < leftBoundary.length; i++) {
        if(leftBoundary[i]===srcIndex||leftBoundary[i]+1===srcIndex){
            isOnLeftBound = true;
        }
    }
    for (let i = 0; i < rightBoundary.length; i++) {
        if(rightBoundary[i]===srcIndex||rightBoundary[i]+1===srcIndex){
            isOnRightBound = true;
        }
    }
    for (let i = 0; i < movement.length; i++) {
        if(isOnLeftBound && (movement[i]===-10||movement[i]===6))continue;
        if(isOnRightBound && (movement[i]===10||movement[i]===-6))continue;
        if(srcIndex+movement[i]===destIndex){
            if(arr[destIndex]==="")return true;
            else if(arr[destIndex]!=="" && isOppositePiece(arr[srcIndex],arr[destIndex])) return true;
            break;
        }
    }
    return false;
};
const pawnMovePath =(srcIndex,destIndex,arr)=>{
    //Pawn Moves only ahead and attacks on diagonal;
    //console.log("Pawn is called");
    let isBlack = blackPlayer.includes(arr[srcIndex]);    
    let isOnLeftBound = leftBoundary.includes(srcIndex);
    let isOnRightBound = rightBoundary.includes(srcIndex);
    if(isBlack){
        if(srcIndex+8===destIndex && arr[destIndex]==="") return true;
        else if(!isOnRightBound && srcIndex+9===destIndex && isOppositePiece(arr[srcIndex],arr[destIndex])) return true;
        else if(!isOnLeftBound && srcIndex+7===destIndex && isOppositePiece(arr[srcIndex],arr[destIndex])) return true;
    }
    else {
        if(srcIndex-8===destIndex && arr[destIndex]==="") return true;
        else if(!isOnLeftBound && srcIndex-9===destIndex && isOppositePiece(arr[srcIndex],arr[destIndex])) return true;
        else if(!isOnRightBound && srcIndex-7===destIndex && isOppositePiece(arr[srcIndex],arr[destIndex])) return true;
    }
    return false;
};


var whitePlayer = "♔♕♗♘♙♖";
var blackPlayer = "♚♛♝♞♟♜";

const isOppositePiece = (currentPiece,destPiece)=>{
    if(whitePlayer.includes(currentPiece) && whitePlayer.includes(destPiece)) return false;
    if(blackPlayer.includes(currentPiece) && blackPlayer.includes(destPiece)) return false;
    return true;
}