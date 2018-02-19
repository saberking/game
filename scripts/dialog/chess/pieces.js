const createPawn=color=>({
  color,
  name:'pawn',
  value:1
})
const createRook=color=>({
  moves:rookMoves,
  color,
  name:'rook',
  speed:7,
  value:5
})
const createKing=color=>({
  moves:kingMoves,
  color,
  name:'king',
  speed:1,
  value:10
})
const createQueen=color=>({
  moves:kingMoves,
  color,
  name:'queen',
  speed:7,
  value:8
})
const createBishop=color=>({
  moves:bishopMoves,
  color,
  name:'bishop',
  speed:7,
  value:3
})
const createKnight=color=>({
moves:knightMoves,
color,
name:'knight',
speed:1,
value:3
})
