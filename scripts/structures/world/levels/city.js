maxwidth[9]=119
maxheight[9]=160
minheight[9]=0
minwidth[9]=0
minwidth[10]=40
maxwidth[10]=99
minheight[10]=25
maxheight[10]=78
startingPos[9]={x:76,y:151,z:9}
worldNames[9]='City'
const cityNPCs=[shopkeeper,mayor,oldWoman]
const cityNPC=()=>cityNPCs[floor(random()*cityNPCs.length)]
const addInhabitant=(x,y,z)=>spawnCreature(cityNPC(),{x,y,z})

const buildCity=()=>{
  buildPostman(0,0,9)
}
const buildMarket=(x,y,z)=>{
  buildWallV(68+x,39+y,z,9,z)
  buildWallV(76+x,39+y,z,9,z)
  buildWallV(80+x,39+y,z,9,z)
  buildWallV(88+x,39+y,z,9,z)
  buildWallH(68+x,47+y,z,5,z)
  buildWallH(80+x,47+y,z,5,z)

  buildFenceH(x+70,y+40,9,3)
  buildFenceH(x+82,y+40,9,3)
  buildFenceH(x+70,y+56,9,3)
  buildFenceH(x+82,y+56,9,3)

  spawnCreature(cow,{x:72,y:41,z:9})
  spawnCreature(cow,{x:84,y:41,z:9})
  spawnCreature(cow,{x:72,y:51,z:9})
  spawnCreature(cow,{x:84,y:51,z:9})

  spawnCreature(farmer,{x:78,y:58,z:9})
}
const buildRoundabout=(x,y,z,size=1)=>{
  buildStoneWallV(x,y+8*size,z,9,z)
  buildStoneWallV(x+36*size,y+8*size,z,9,z)
  buildWallDiagDown(x+4*size,y+29*size,z,4*size)
  buildWallDiagDown(x+24*size,y,z,4*size+1)
  buildWallDiagDown2(x,y+25*size,z,2*size)
  buildWallDiagDown2(x+34*size,y+5*size,z,2*size)

  buildStoneWallH(x+12*size,y,z,7,z)
  buildStoneWallH(x+12*size,y+32*size,z,7,z)
  buildWallDiagUp(x+4*size,y+4*size,z,4*size)
  buildWallDiagUp(x+26*size,y+32*size,z,4*size)
  buildWallDiagUp2(x+34*size,y+27*size,z,2*size)
  buildWallDiagUp2(x,y+7*size,z,2*size)

}
const buildPark=(x,y,z)=>{
  buildDoorwayH(x+20,y+103,z)
  buildDoorwayH(x+60,y+103,z)
}
const buildCourtHouse=(x,y,z)=>{
  buildWallV(24+x,51+y,z,8)
  buildWallV(24+x,71+y,z,11)
  buildWallV(32+x,51+y,z,8)

  buildTomb({left:24+x,top:71+y,right:32+x,bottom:77+y},z)
  removeConstructs(24+x,71+y,z,6)
  addStaircase(26+x,71+y,z,{x:26+x,y:70+y,z:z-1})
  addTable(14+x,76+y,z)
  addCounter(14+x,58+y,z)
  for(let i=0;i<3;i++){
    addPlant(x+34,y+54+4*i,z)
    addPlant(x+38,y+54+4*i,z)
    addPlant(x+42,y+54+4*i,z)
  }

  buildWallH(24+x,67+y,z,18)
  buildPassageH(x+12,y+67,z,7)
  buildDoorwayH(x+28,y+67,z)
  buildDoorwayH(x+36,y+67,z)
  buildDoorwayH(x+16,y+67,z)
  buildDoorwayH(x+16,y+71,z)
}
const buildPostman=(x,y,z)=>{
  addPlant(34,126,9)
  addPlant(110,124,9)
  addTree(49,104,9)
  addTree(100,99,9)

  buildRoundabout(x+60,y+31,z)
  buildCourtHouse(x,y,z)

  buildMarket(x,y,z)

  // changeArea({left:x+13,right:x+71,top:y+103,bottom:y+122},9,'grass')

  buildStoneWallV(x,y+49,z,50,z)
  buildWallV(x+4,y+93,z,6)
  buildStoneWallV(x+72,y+82,z,6,z)
  buildStoneWallV(x+20,y+21,z,11,z)
  buildStoneWallV(x+12,y+23,z,12,z)
  buildStoneWallV(x+12,y+57,z,6,z)
  buildStoneWallV(x+78,y+1,z,11,z)
  buildStoneWallV(x+84,y+71,z,39)
  buildStoneWallV(x+88,y+1,z,11,z)
  buildStoneWallV(x+92,y+85,z,11,z)
  buildWallV(x+96,y+131,z,9)
  buildWallV(x+108,y+131,z,9)
  buildStoneWallV(x+108,y+41,z,6,z)
  buildStoneWallV(x+112,y+51,z,5,z)
  buildStoneWallV(x+12,y+71,z,12)
  buildStoneWallV(x+56,y+123,z,13)
  buildWallV(112+x,81+y,z,3)


  buildStoneWallH(x+12,y+27,z,6,z)
  buildStoneWallH(x+20,y+41,z,11,z)
  buildStoneWallH(x+20,y+51,z,11,z)
  buildStoneWallH(x+80,y+3,z,6,z)
  buildStoneWallH(x+12,y+93,z,31,z)
  buildStoneWallH(x+108,y+51,z,5,z)
  buildStoneWallH(x+108,y+59,z,5,z)
  buildStoneWallH(x,y+147,z,60)
  buildStoneWallH(x,y+133,z,37  )
  buildStoneWallH(x+72,y+85,z,7)
  buildWallH(80+x,21+y,z,6)


  buildTomb({left:x+84,right:x+108,top:y+107,bottom:y+131},z)
  buildTomb({left:x+12,right:x+72,top:y+85,bottom:y+93},z)
  buildTomb({left:x+44,right:x+72,top:y+123,bottom:y+133},z)
  buildTomb({left:x+20,right:x+32,top:y+113,bottom:y+133},z)
  buildTomb({left:x,right:x+18,top:y+93,bottom:y+103},z)
  buildTomb({left:84+x,right:96+x,top:107+y,bottom:119+y},z)
  buildTomb({left:x+52,right:x+72,top:y+101,bottom:y+111},9)
  buildTomb({left:x+56,right:x+68,top:y+139,bottom:y+147},z)
  buildTomb({left:x+56,right:x+84,top:y+77,bottom:y+85},z)
  buildTomb({left:x+108,right:x+116,top:y+99,bottom:y+131},z)
  buildTomb({left:x+84,right:x+116,top:y+99,bottom:y+107},z)
  buildTomb({left:x+108,right:x+116,top:y+131,bottom:y+147},z)

addWallCross(76+x,147+y,z)
addWallCross(80+x,147+y,z)

  removeConstructs(84+x,121+y,z,2,10)

  removeConstructs(76+x,147+y,z,4,2)
  buildTomb({left:x+12,right:x+32,top:y+103,bottom:y+113},9)
  buildTomb({left:x+32,right:x+44,top:y+133,bottom:y+147},9)
  buildDoorwayH(x+24,y+103  ,z)
  buildDoorwayH(x+64,y+101,z)

  buildWallDiagUp(x+10,y+57,z,5)
  buildWallDiagUp(x,y+49,z,6)
  buildWallDiagUp(x+40,y+40,z,20)
  buildWallDiagUp(x+84,y+70,z,13)

  buildWallDiagDown2(x+40,y+50,z,17)
  buildWallDiagDown2(x+88,y+20,z,11)


  buildDoorwayH(x+72,y+63,z)

  addCoach(72+x,139+y,z)
}
