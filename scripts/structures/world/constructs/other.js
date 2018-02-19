const addCorpse=(x,y,z,items=randomItem())=>{
  new Construct({
    zone:zone(x,y,z,1,2),
    name:'corpse',
    height:0,
    actions:['search'],
    items
  })
}
const addBoxingRing=(x,y,z)=>{
  new Construct({
    zone:zone(x,y,z,4,7),
    name:'boxingRing',
    passable:true,
    height:0
  })
}


const addCoach=(x,y,z,dest)=>{
  new Construct({
    zone:zone(x,y,z,3,3),
    name:'coach',
    actions:['travel'],
    dest
  })
}
const addStaircase=(x,y,z,dest)=>{
  new Construct({
    zone:zone(x,y,z,2,4),
    name:dest.z>z?'staircase':'staircaseDown',
    actions:['climb'],
    dest,
  })
}
const addStaircase2=(x,y,z,dest)=>{
  new Construct({
    zone:zone(x,y,z,1,2),
    name:'staircase2',
    actions:['travel'],
    dest
  })
}
const addGate=(x,y,z)=>{
  removeConstructs(x,y,z,4)
  new Construct({
    zone:zone(x,y,z,2),
    name:'gate',
  })
}
const addWell=(x,y,z,dest)=>{
  new Construct({
    name:'well2',
    zone:zone(x,y,z,3,4),
    dest,
    height:0
  })
}
