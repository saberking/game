
const resign=(c)=>{
  let cr=creatures.find(c=>c.name==='kasparov')
  if(c==='black'){
    addMessage('You win!')
    moveCreatureTo(cr,{x:cr.x-2,y:cr.y+1})
  } else {
    addMessage('you lose')
    makeHostile(cr)
  }
  timedEvents.remove('chess')
  setTimeout(closeDialog,5000)
}
const draw=()=>{
  resign('white')
}
const moveRealPiece=(m)=>{
  let boardState=chessBoard
  if(boardState[m.to.x][m.to.y]&&boardState[m.to.x][m.to.y].name==='king'){
    resign(boardState[m.to.x][m.to.y].color)
  }
  movePiece(boardState,m)
}
const movePiece=(boardState,m)=>{

  boardState[m.to.x][m.to.y]=boardState[m.from.x][m.from.y]
  boardState[m.from.x][m.from.y]=null
  if(boardState[m.to.x][m.to.y].name==='pawn'){
    if(m.to.y===0||m.to.y===7){
      boardState[m.to.x][m.to.y]=createQueen(boardState[m.to.x][m.to.y].color)
    }
  }
}
const inCheck=(boardState,color)=>{
  let kingPos={}
  boardState.forEach((c,x)=>{
    c.forEach((s,y)=>{
      if(s&&s.name==='king'&&s.color===color)kingPos={x,y}
    })
  })
  let otherColor=color==='white'?'black':'white'
  let moves=getPossibleMoves(boardState,otherColor)
  if(moves.find(m=>m.to.x===kingPos.x&&m.to.y===kingPos.y))return true
}
let copyBoard=(boardState)=>{
  const copy=[]
  for(let i=0;i<8;i++)copy[i]=boardState[i].slice()
  return copy
}
// const benefit=(boardState,m)=>{
//   const color=boardState[m.from.x][m.from.y].color
//   const current=getPoints(boardState)
//   const copy=copyBoard(boardState)
//   movePiece(copy,m)
//   const pos=getPossibleMoves(copy,'white').filter(m=>tryOut(copy,m))
//   if(!pos.length)return 100
//   let copy2=copyBoard(copy)
//   movePiece(copy2,pos[0])
//   let pointsAfterWhiteMove=getPoints(copy2)
//   pos.forEach(m=>{
//     let copy3=copyBoard(copy)
//     movePiece(copy3,m)
//     let points=getPoints(copy3)
//     if(points>pointsAfterWhiteMove)pointsAfterWhiteMove=points
//   })
//   return current-pointsAfterWhiteMove
// }
const tryOut=(boardState,m)=>{
  const copy=copyBoard(boardState)
  movePiece(copy,m)
  // console.log(m,copy,boardState)
  if(!inCheck(copy,copy[m.to.x][m.to.y].color))return true
}
const onBoard=(x,y)=>x>=0&&x<8&&y>=0&&y<8
const getPossibleMoves=(boardState,color)=>{
  let possibleMoves=[]
  boardState.forEach((c,x)=>{
    c.forEach((s,y)=>{
      if(s&&s.color===color){
        if(s.name!=='pawn'){
          let moves=s.moves.slice()
          for(let i=1;i<=s.speed;i++){
            let indices=[]
            moves.forEach((m,index)=>{
              if(onBoard(x+i*m.x,y+i*m.y)){
                let piece=boardState[x+i*m.x][y+i*m.y]
                if(piece)indices.push(index)
                if(!piece||piece.color!==color){
                  let mv={from:{x,y},to:{x:x+m.x*i,y:y+m.y*i}}
                  possibleMoves.push(mv)
                }
              }
            })
            indices.reverse()
            indices.forEach(i=>moves.splice(i,1))
          }
        }else{
          let takeY=color==='white'?1:-1
          for(let i=0;i<2;i++){
            if(onBoard(x-1+2*i,y+takeY)){
              let piece=boardState[x-1+2*i][y+takeY]
              if(piece&&piece.color!==color)possibleMoves.push({from:{x,y},to:{x:x-1+2*i,y:y+takeY}})
            }
          }
          if(onBoard(x,y+takeY)){
            if(!boardState[x][y+takeY])possibleMoves.push({from:{x,y},to:{x,y:y+takeY}})
          }
          if(!s.hasMoved&&!boardState[x][y+takeY]&&!boardState[x][y+2*takeY]){
            possibleMoves.push({from:{x,y},to:{x,y:y+2*takeY}})
          }
        }
      }
    })
  })
  return possibleMoves
}
