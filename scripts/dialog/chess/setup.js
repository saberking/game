let chessBoard=[]
for(let i=0;i<8;i++)chessBoard[i]=[]
const createPawns=(b,y,c)=>{
  for(let i=0;i<8;i++){
    b[i][y]=createPawn(c)
  }
}
chessBoard.forEach(c=>{
  for(let i=0;i<8;i++){c.push(null)}
})
const createPieces=(color,y)=>{
  chessBoard[0][y]=createRook(color)
  chessBoard[7][y]=createRook(color)
  chessBoard[1][y]=createKnight(color)
  chessBoard[6][y]=createKnight(color)
  chessBoard[2][y]=createBishop(color)
  chessBoard[5][y]=createBishop(color)
  chessBoard[3][y]=createQueen(color)
  chessBoard[4][y]=createKing(color)
}
createPieces('white',0)
createPieces('black',7)
createPawns(chessBoard,1,'white')
createPawns(chessBoard,6,'black')
const startGame=()=>{
  console.log('chess')
  updateChessDialog('white')
}
