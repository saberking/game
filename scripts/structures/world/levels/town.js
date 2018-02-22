los[5]=daytimeLos
maxwidth[5]=61
maxheight[5]=50
minwidth[5]=0
minheight[5]=0
worldNames[5]='Town'

const buildTown=()=>{
  startingPos[5]={x:8,y:13,z:5}

  buildTomb({left:4,right:maxwidth[5]-5,top:1,bottom:maxheight[5]-7},5,0)
buildTomb({left:4,right:12,top:7,bottom:15},5)

buildTomb({left:12,right:24,top:7,bottom:15},5)
buildTomb({left:4,right:12,top:21,bottom:37},5)
buildTomb({left:12,right:24,top:21,bottom:31},5)
buildTomb({left:36,right:44,top:1,bottom:9},5)
buildTomb({left:32,right:56,top:35,bottom:43},5)
buildTomb({top:9,bottom:29,left:32,right:48},5)


buildWallV(16,1,5,4)
buildWallV(24,1,5,2)
buildWallV(44,35,5,5)

buildWallH(24,9,5,3)
buildWallH(40,17,5,3)
buildWallH(48,17,5,5)
buildWallH(52,9,5,3)
buildWallH(52,25,5,3)
addYard(52,27,5)
addFenceH(52,30,5)
addFenceH(54,30,5)
addWallCross(56,29,5)

buildDoorwayH(6,7,5)
buildDoorwayH(20,15,5)
buildDoorwayH(36,35,5)
buildDoorwayH(48,35,5)
buildDoorwayH(4,21,5)
buildDoorwayH(12,21,5)

buildDoorwayV(12,7,5)
buildDoorwayV(32,17,5)
buildDoorwayV(36,3,5)
buildDoorwayV(48,11,5)

addWallCross(24,9,5)

buildDoorwayH(38,9,5)


  addBed(11,3,5)

  addHatStand(22,11,5)
  addArmorRack(14,12,5)
  // spawnCreature(shopkeeper,{x:18,y:12,z:5,  items:[chainMail,leatherJacket,clothShirt,clothShirt,sandals,sandals,
  //     leatherBoots,clothCap,clothCap,leatherHelm,steelHelm,jeans,jeans,leatherTrousers,underpants
  //   ]})

  addCauldron(6,36,5)
  addPlant(10,26,5)
  addPlant(10,29,5)
  spawnCreature(shopkeeper,{x:6,y:26,z:5,
    items:[magicHerbs,magicHerbs,magicPowder,magicPowder,staff,staff,syringe]}
  )

  addCounter3(14,28,5)
  spawnCreature(shopkeeper,{x:20,y:25,z:5,items:[rustySword,knife,bow,modItem(arrow,{quantity:10}),
    modItem(musketBalls,{quantity:5}),modItem(musketBalls,{quantity:5}),musket,dagger,sword,club]})

  buildPassageH(32,17,5,5)

  addDesk(37,12,5)
  spawnCreature(mayor,{x:34,y:14,z:5})
  spawnCreature(tim,{x:46,y:18,z:5})
  spawnCreature(dog,{x:20,y:5,z:5})
  spawnCreature(oldWoman,{x:52,y:21,z:5})
  // addConstruct('levers',42,18,5,2,1,['pullLever'],[],1)
  addBoxingRing(33,22 ,5)
  addGate(22,44,5)
  addCoach(19,38,5)

  // revealArea({left:minwidth[5],right:maxwidth[5],top:minheight[5],bottom:maxheight[5]},5)

}
