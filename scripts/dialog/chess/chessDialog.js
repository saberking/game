let piece=null
const updateChessDialog=(color)=>{
  openDialog()
  dialogType={type:'chess'}
  const dialog=document.getElementById('dialog')
  let html='<div style="margin:25">'+chessBoardPic(piece)+'</div>'
  let piecesRemaining=0
  chessBoard.forEach((c,x)=>{
    c.forEach((p,y)=>{
      if(p){
        html+=chessPieceHtml(x,y,color,piece)
        if(p.color==='white')piecesRemaining++
      }
    })
  })
  dialog.innerHTML=html
  if(color==='black'){
    setTimeout(()=>chessMove('black'),1000)
  }
  else{
    if(!getPossibleMoves(chessBoard,'white').filter(m=>tryOut(chessBoard,m)).length)resign('white')
    if(piecesRemaining<2)resign('white')
  }
}
const chessBoardPic=piece=>{
  let onclicktext=''
  let highlightText=''
  if(piece){
    onclicktext=' onclick="attemptChessMove(event)" '
    highlightText='<img src="assets/chess/chessHighlight.png" style="position:absolute;left:'+(piece.x*50+25)+';top:'+((7-piece.y)*50+25)+'"/>'
  }
  let html='<img src="assets/chess/chessBoard.png"'+onclicktext+'/>'+highlightText
  return html
}
const attemptChessMove=({offsetX,offsetY})=>{
  let s=Date.now()
  let dest={x:floor(offsetX/50),y:7-floor(offsetY/50)}
  const possibleMoves=getPossibleMoves(chessBoard,'white').filter(m=>tryOut(chessBoard,m))
  if(possibleMoves&&possibleMoves.find(m=>m.from.x===piece.x&&m.from.y===piece.y&&m.to.x===dest.x&&m.to.y===dest.y)){
    moveRealPiece({from:piece,to:dest})
    if(chessBoard[dest.x][dest.y].name==='pawn')chessBoard[dest.x][dest.y].hasMoved=true
    piece=null
    // if(moveCount<5){
      updateChessDialog('black')
    // }
    // else updateChessDialog('white')
  }else {
    piece=null
    updateChessDialog('white')
  }
  console.log(Date.now()-s)
}
const selectPiece=(x,y)=>{
  piece={x,y}
  updateChessDialog('white')
}
const chessPieceHtml=(x,y,color,piece)=>{
  let onclickhtml=''
  if(color==='white'&&!inCheck(chessBoard,'black')){
    if(piece&&chessBoard[x][y].color==='black'){
      onclickhtml=' onclick="attemptChessMove({offsetX:'+x*50+',offsetY:'+((7-y)*50)+'})" '
    }
    if(chessBoard[x][y].color==='white'){
      onclickhtml=' onclick="selectPiece('+x+','+y+')" '
    }
  }
  return '<img src="assets/chess/'+chessBoard[x][y].name+chessBoard[x][y].color+'.png" style="position:absolute;left:'+(x*50+20)+';top:'+((7-y)*50+25)+'"'+onclickhtml+'/>'
}
