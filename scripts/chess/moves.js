const rotate=({x,y})=>({x:-y,y:x})
const rookMoves=[{x:1,y:0}]
const bishopMoves=[{x:1,y:1}]
const knightMoves=[{x:1,y:2},{x:-1,y:2}]
for(let i=0;i<3;i++){
  rookMoves.push(rotate(rookMoves[i]))
  bishopMoves.push(rotate(bishopMoves[i]))
  knightMoves.push(rotate(knightMoves[2*i]))
  knightMoves.push(rotate(knightMoves[2*i+1]))
}
const kingMoves=bishopMoves.concat(rookMoves)
