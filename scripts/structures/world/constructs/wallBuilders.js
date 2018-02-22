const copyWalls=(a,b)=>{
  let cs=constructs.filter(c=>{
    if(c.zone.z===a&&c.zone.top>=minheight[b]&&c.zone.bottom<=maxheight[b]&&
        c.zone.left>=minwidth[b]&&c.zone.right<=maxwidth[b])return true
  })

  cs.filter(c=>c.name==='wallV').forEach(c=>
    addWallV(c.zone.left,c.zone.top,b)
  )
  cs.filter(c=>c.name==='wallH').forEach(c=>
    addWallH(c.zone.left,c.zone.top,b)
  )
  cs.filter(c=>c.name==='wallCross').forEach(c=>
    addWallCross(c.zone.left,c.zone.top,b)
  )
  cs.filter(c=>c.name==='wallDiagUp2').forEach(c=>addWallDiagUp2(c.zone.left,c.zone.top,b))
  cs.filter(c=>c.name==='wallDiagUp').forEach(c=>addWallDiagUp(c.zone.left,c.zone.top,b))
  cs.filter(c=>c.name==='wallDiagDown').forEach(c=>addWallDiagDown(c.zone.left,c.zone.top,b))
  cs.filter(c=>c.name==='wallDiagDown2').forEach(c=>addWallDiagDown2(c.zone.left,c.zone.top,b))
}
const buildWallH=(x,y,z,length)=>{
  buildStoneWallH(x,y,z,length)
}
const buildWallV=(x,y,z,length)=>{
  buildStoneWallV(x,y,z,length)
}

const buildStoneWallH=(x,y,z,length)=>{

  for(let i = 0;i<length;i++){

    addWallH(x+2*i,y+1,z)
  }
  addWallCross(x,y,z)
  addWallCross(x+length*2-2,y,z)
}

const buildStoneWallV=(x,y,z,length)=>{

  for(let i =0;i<length;i++){
    // world[z][x][i].terrain=wallStoneV
    addWallV(x,y+2*i,z)
  }
  addWallCross(x,y,z)
  addWallCross(x,y+2*length-2,z)
}
const buildTomb=({left,top,right,bottom},z,shade=0.25)=>{
  buildStoneWallH(left,top,z,(right-left)/2+1)
  buildStoneWallH(left,bottom,z,(right-left)/2+1,z)
  buildStoneWallV(left,top,z,(bottom-top)/2+1,z)
  buildStoneWallV(right,top,z,(bottom-top)/2+1,z)
  // if(shade)addShade({left:left+1,top:top+1,right,bottom},z,shade)
}
const buildPassageH=(x,y,z,length)=>{
  buildTomb({left:x,top:y,right:x+2*length-2,bottom:y+4},z)
  buildDoorwayV(x,y,z)
  buildDoorwayV(x+2*length-2,y,z)
}
const buildPassageV=(x,y,z,length)=>{
  buildTomb({left:x,top:y,right:x+4,bottom:y+length*2-2},z)
  console.log(x,y,z,'bar')
  buildDoorwayH(x,y,z)
  buildDoorwayH(x,y+2*length-2,z)
}
const buildDoorwayH=(x,y,z,door=false)=>{
  removeConstructs(x+2,y+1,z,2)
  // addWallCross(x,y,z)
  if(door)addDoorClose(x+2,y+1,z)
  // addWallCross(x+4,y,z)
}

const buildDoorwayV=(x,y,z)=>{
  removeConstructs(x,y+2,z,2,2)
  // addWallCross(x,y,z)
  // addWallCross(x,y+4,z)
}
const buildFenceH=(x,y,z,length)=>{
  for(let i=0;i<length;i++){
    addFenceH(x+2*i,y,z)
  }
}
const buildHouse = ({left,top,right,bottom},z=20)=>{
  buildWallH(left,top,z,(right-left)/2+1,z)
  buildWallH(left,bottom,z,(right-left)/2+1,z)

}
const buildWallDiagUp=(x,y,z,length)=>{
  for(let i=0;i<length;i++)addWallDiagUp(x+2*i,y-i,z)
}
const buildWallDiagUp2=(x,y,z,length)=>{
  for(let i=0;i<length;i++)addWallDiagUp2(x+2*i,y-2*i,z)
}
const buildWallDiagDown=(x,y,z,length)=>{
  for(let i=0;i<length;i++)addWallDiagDown(x+2*i,y+i,z)
}
const buildWallDiagDown2=(x,y,z,length)=>{
  for(let i=0;i<length;i++)addWallDiagDown2(x+2*i,y+2*i,z)
}
