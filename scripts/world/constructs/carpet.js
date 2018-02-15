const addRug=(x,y,z)=>{
  new Construct({
    name:'rug',
    zone:zone(x,y,z,2,6),
    passable:true,
    height:0
  })
}
const addYard=(x,y,z)=>{
  new Construct({
    zone:zone(x,y,z,2,4),
    height:0,
    passable:true,
    name:'yard'
  })
}
const addCarpet=(x,y,z)=>{
  new Construct({
    name:'carpet',
    zone:zone(x,y,z,5,6),
    passable:true,
    height:0
  })
}
const addCarpet2H=(x,y,z)=>{
  new Construct({
    name:'carpet2H',
    zone:zone(x,y,z,3,5),
    passable:true,
    height:0
  })
}
const addCarpet2V=(x,y,z)=>{
  new Construct({
    name:'carpet2V',
    zone:zone(x,y,z,3,5),
    passable:true,
    height:0
  })
}
