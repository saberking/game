
const getPoints=(boardState)=>{
  let points={white:0,black:0}
  for(let i=0;i<8;i++){
    for(let j=0;j<8;j++){
      if(boardState[i][j]){
        points[boardState[i][j].color]+=boardState[i][j].value
      }
    }
  }
  return points.white-points.black
}
const findExtreme=(arr,fn1,fn2)=>{
  let e=[arr[0]]
  let maxval=fn1(arr[0])
  arr.forEach(a=>{
    let fna=fn1(a)
    let newmax=fn2(maxval,fna)
    if(fna===maxval)e.push(a)
    if(newmax!==maxval){
      maxval=newmax
      e=[a]
    }

  })
  return {arr:e,val:maxval}
}
const findVal=(arr,fn1,fn2)=>{
  let maxval=fn1(arr[0])
  arr.forEach(a=>{
    maxval=fn2(maxval,fn1(a))
  })
  return maxval
}
const getBestMoves=(boardState,ahead,possibleMoves)=>{
  let fn=findExtreme
  // if(ahead===1)fn=findVal
  return fn(possibleMoves,m=>{
    let points=0
    let copy=copyBoard(boardState)
    if(boardState[m.to.x][m.to.y])points+=boardState[m.to.x][m.to.y].value
    movePiece(copy,m)
    let poss2=getPossibleMoves(copy,'white').filter(m2=>tryOut(copy,m2))
    if(!poss2.length)return 100
    // if(ahead===2){
      points+=findVal(poss2,m2=>{
        let p2=0
        let copy2=copyBoard(copy)
        movePiece(copy2,m2)
        if(copy[m2.to.x][m2.to.y])p2-=copy[m2.to.x][m2.to.y].value
        // let poss3=getPossibleMoves(copy2,'black').filter(m3=>tryOut(copy2,m3))
        // if(!poss3.length) return -100
        return p2
      },min)
    // }
    return points
  },max)
}
let moveCount=0
const chessMove=(color)=>{
  if(!dialogOpen)return
  let boardState=chessBoard
  moveCount++
  // if(moveCount===5){
  //   timedEvents.add({interval:5,name:'chess',event:()=>{if(!inCheck(chessBoard,'white'))chessMove('black')}})
  // }
  let st=Date.now(),post=0,be=0,b2=0,b=0,by=0
  let possibleMoves=getPossibleMoves(boardState,color).filter(m=>tryOut(boardState,m) )
  // console.log(Date.now()-st)
  // st=Date.now()
  if(possibleMoves.length){
    const bestM=getBestMoves(boardState,2,possibleMoves)
    st=Date.now()
    const bestMoves=bestM.arr
    const besty2=findExtreme(bestMoves,m=>{
      let copy=copyBoard(boardState)
      movePiece(copy,m)
      return getPossibleMoves(copy,'white').length
    },min).arr
    // console.log(Date.now()-st)
    // st=Date.now()
    const besty=findExtreme(besty2,m=>{
      let copy=copyBoard(boardState)
      movePiece(copy,m)
      return getPossibleMoves(copy,'black').length

    },max).arr
    // console.log(Date.now()-st)
    // st=Date.now()
    const best=besty[floor(random()*besty.length)]
    // possibleMoves.sort((a,b)=>benefit(boardState,b)-benefit(boardState,a))
    // let ben=benefit(boardState,possibleMoves[0])
    // possibleMoves=possibleMoves.filter(m=>benefit(boardState,m)===ben)
    // let m=possibleMoves[floor(random()*possibleMoves.length)]
    moveRealPiece(best)
    if(boardState[best.to.x][best.to.y].name==='pawn')boardState[best.to.x][best.to.y].hasMoved=true
    updateChessDialog('white')
    console.log(Date.now()-st)
    st=Date.now()
  }else if(inCheck(boardState,color)){
    resign(color)
  }else draw()
}
