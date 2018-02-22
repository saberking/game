const castle2BuilderFloor=(z,xAdjust,yAdjust)=>{
  fillWorld(z)
  buildTomb({left:6+xAdjust,right:50+xAdjust,top:4+yAdjust,bottom:32+yAdjust},z)
  // changeArea({left:6+xAdjust,right:50+xAdjust,top:3+yAdjust,bottom:33+yAdjust},z,stone)
  buildTomb({left:18+xAdjust,right:42+xAdjust,top:14+yAdjust,bottom:24+yAdjust},z)
  // changeArea({left:19+xAdjust,right:42+xAdjust,top:15+yAdjust,bottom:23+yAdjust},z,air)
  copyWalls(z-1,z)
  buildDoorwayV(18+xAdjust,6+yAdjust,z)
  addStaircase(32+xAdjust,29+yAdjust,z,{x:34+xAdjust,y:28+yAdjust,z:z-1})
  addWindow(28+xAdjust,25+yAdjust,z)
}
const buildCastle2=()=>{
  addPainting(24,25,7)
  addToilet(48,16,7)
  addToilet(48,20,7)
  spawnCreature(toilet,{x:48,y:17,z:7})
  addToilet(48,17,7)
  addToilet(48,19,7)
  addToilet(48,21,7)
  // addCarpet2H(22,26,7)
  // addCarpet2H(16,26,7)
  // addCarpet2H(10,26,7)
  // addCarpet2V(44,16,7)
  // addCarpet2V(44,26,7)
  // addCarpet2V(44,21,7)

  addTreasure('bookcase',8,5,7)
  addTreasure('bookcase',10,5,7)
  addTreasure('bookcase',12,5,7)
  addTreasure('bookcase',14,5,7)
  addTreasure('bookcase',16,5,7)

  addCreatureGroup(unholyBible,{x:8,y:9,z:7},3)

  spawnCreature(skeleton,{x:8,y:17,z:7})
  spawnCreature(skeleton,{x:12,y:17,z:7})
  spawnCreature(skeleton,{x:16,y:17,z:7})

  spawnCreature(kasparov,{x:12,y:23,z:7})

  addConstruct('shrine3',21,7,7,2)
  addConstruct('orangshrine',26,8,7)
  addConstruct('shrine3',29,7,7,2)
  addConstruct('ganesh',21,5,7,1.5)
  addConstruct('ganesh',24,5,7,1.5)
  addConstruct('ganesh',27,5,7,1.5)
  addConstruct('ganesh',30,5,7,1.5)



  addMagicChest(38,6,7)
  addMagicChest(46,6,7)
  addMagicChest(38,13,7)
  addMagicChest(46,13,7)
  addSofa(40,6,7)
  addPlant(41,13,7)
  addPlant(44,13,7)
  spawnCreature(evilWizardKing,{x:46,y:8,z:7})
}
