const horBlock=(x,y,z,t=false)=>{
    world[z][x][y].blocking+='t'
    world[z][x+1][y].blocking+='t'
    if(t){
      world[z][x][y].opacity=0
      world[z][x+1][y].opacity=0
    }
}
const addWindow=(x,y,z)=>{
  removeConstructs(x,y,z)
  new Construct({
    zone:zone(x,y,z),
    name:'window'
  })
  horBlock(x,y,z,true)
}
const addWallV=(x,y,z)=>{

  new Construct({
    zone:zone(x,y,z,2,2),
    name:'wallV'
  })
  world[z][x][y].blocking+='r'
  world[z][x+1][y].blocking+='l'
  world[z][x][y+1].blocking+='r'
  world[z][x+1][y+1].blocking+='l'
}

const addWallH=(x,y,z)=>{
  new Construct({
    zone:zone(x,y,z),
    name:'wallH'
  })
  horBlock(x,y,z)
}
const addFenceH=(x,y,z)=>{
  new Construct({
    zone:zone(x,y,z),
    name:'fenceH'
  })
  horBlock(x,y,z,true)
}
const addDoorOpen=(x,y,z)=>{
  removeConstructs(x,y,z,2)
  new Construct({
    zone:zone(x,y,z),
    name:'doorOpen',
    actions:['closeDoor'],
    passable:true
  })
}
const addDoorClose=(x,y,z)=>{
  removeConstructs(x,y,z,2)
  new Construct({
    zone:zone(x,y,z),
    name:'doorClose',
    actions:['openDoor']
  })
  horBlock(x,y,z)
}
const addWallCross=(x,y,z)=>{
  removeConstructs(x,y,z,2,2)
  new Construct({
    zone:zone(x,y,z,2,2),
    name:'wallCross'
  })
  world[z][x][y].blocking='r'
  world[z][x+1][y].blocking='l'
  world[z][x][y+1].blocking='rt'
  world[z][x+1][y+1].blocking='lt'
}
const addWallDiagUp=(x,y,z)=>{

  world[z][x][y+1].blocking+='t'
  world[z][x+1][y+1].blocking+='t'
  world[z][x+1][y].blocking+='r'
  world[z][x+2][y].blocking+='l'
  new Construct({
    zone:zone(x,y,z,2,2),
    name:'wallDiagUp'
  })
}
const addWallDiagDown=(x,y,z)=>{

  if(!world[z][x][y+1])console.log(x,y,z)
  world[z][x][y+1].blocking+='t'
  world[z][x+1][y+1].blocking+='t'
  world[z][x][y].blocking+='l'
  world[z][x-1][y].blocking+='r'
  new Construct({
    zone:zone(x,y,z,2,2),
    name:'wallDiagDown'
  })
}
const addWallDiagUp2=(x,y,z)=>{
  new Construct({
    zone:zone(x,y,z,2,3),
    name:'wallDiagUp2'
  })
  world[z][x][y+1].blocking+='br'
  world[z][x][y+2].blocking+='t'
  world[z][x+1][y].blocking+='br'
  world[z][x+1][y+1].blocking+='lt'
  world[z][x+2][y].blocking+='l'
}
const addWallDiagDown2=(x,y,z)=>{
  new Construct({
    zone:zone(x,y,z,2,3),
    name:'wallDiagDown2'
  })
  world[z][x+1][y+1].blocking+='bl'
  world[z][x+1][y+2].blocking+='t'
  world[z][x][y].blocking+='bl'
  world[z][x][y+1].blocking+='rt'
  world[z][x-1][y].blocking+='r'
}
