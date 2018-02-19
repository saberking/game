const addPainting=(x,y,z)=>{
  new Construct({
    zone:zone(x,y,z),
    name:'painting',
    passable:true
  })
}
const addToilet=(x,y,z)=>{
  new Construct({
    zone:zone(x,y,z),
    name:'toilet',
    passable:false
  })
}
const addSofa=(x,y,z=10)=>{
  new Construct({
    zone:{left:x,top:y,right:x+5,bottom:y,z},
    name:'sofa'
  })
}
const addSofa2=(x,y,z=10)=>{
  new Construct({
    zone:{left:x,top:y-1,right:x+2,bottom:y,z},
    name:'sofa2'
  })
}
const addSofaV=(x,y,z=10)=>{
  new Construct({
    zone:{left:x,top:y-1,right:x,bottom:y+4,z},
    name:'sofaV',
    height:0
  })
}
const addSofaV2=(x,y,z=10)=>{
  new Construct({
    zone:{left:x,top:y-1,right:x,bottom:y+4,z},
    name:'sofaV2',
    height:0
  })
}
const addTable=(x,y,z=10)=>{
  new Construct({
    zone:{left:x,top:y,right:x+5,bottom:y+18,z},
    name:'table'
  })
}
const addTable2=(x,y,z=10)=>{
  new Construct({
    zone:zone(x,y,z,3),
    name:'table2'
  })
}
const addBed=(x,y,z=10)=>{
  new Construct({
    zone:zone(x,y,z,2,2),
    name:'bed',
    actions:['sleep'],
    height:1
  })
}
const addCounter=(x,y,z)=>{
  new Construct({
    zone:zone(x,y,z,4),
    name:'counter'
  })
}


const addTree=(x,y,z)=>{
  new Construct({
    zone:zone(x,y,z),
    name:'tree'
  })
}
const addDesk=(x,y,z)=>{
  new Construct({
    zone:zone(x,y,z,1,3),
    name:'desk'
  })
}

const addCoffin=(x,y,z)=>{
  new Construct({
    name:'coffin',
    zone:zone(x,y,z),
    height:0,
    actions:['openCoffin']
  })
}
