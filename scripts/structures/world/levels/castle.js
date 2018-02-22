maxwidth[6]=maxwidth[7]=67
maxheight[6]=maxheight[7]=50
minwidth[6]=minwidth[7]=0
minheight[6]=minheight[7]=0

worldNames[6]='Castle'

const defaultCastleBuilderFloor=(z,xAdjust,yAdjust)=>{
  startingPos[6]={x:16,y:41,z:6}
  startingPos[7]={x:32,y:29,z:7}
  // changeArea({left:minwidth[6]+xAdjust,right:maxwidth[6]+xAdjust,top:minheight[6]+yAdjust,bottom:maxheight[6]+yAdjust},z,stone)
  // changeArea({left:minwidth[6]+xAdjust,right:maxwidth[6]+xAdjust,top:40+yAdjust,bottom:50+yAdjust},z,dirt)
  // changeArea({left:54+xAdjust,right:59+xAdjust,top:0+yAdjust,bottom:37+yAdjust},z,water)
  // changeArea({left:0+xAdjust,right:59+xAdjust,top:34+yAdjust,bottom:37+yAdjust},z,water)
  // changeArea({left:0+xAdjust,right:3+xAdjust,top:0+yAdjust,bottom:37+yAdjust},z,water)
  buildTomb({left:6+xAdjust,right:50+xAdjust,top:4+yAdjust,bottom:32+yAdjust},z)
  buildTomb({left:18+xAdjust,right:42+xAdjust,top:14+yAdjust,bottom:24+yAdjust},z)
  addShade({left:18+xAdjust,right:42+xAdjust,top:14+yAdjust,bottom:24+yAdjust},z,0)
  buildStoneWallH(6+xAdjust,22+yAdjust,z,7,z)
  buildStoneWallH(42+xAdjust,14+yAdjust,z,5,z)
  buildStoneWallH(6+xAdjust,14+yAdjust,z,7,z)
  buildStoneWallV(18+xAdjust,4+yAdjust,z,6,z)
  addWallCross(42+xAdjust,32+yAdjust,z)
  buildStoneWallV(34+xAdjust,4+yAdjust,z,6,z)

  buildDoorwayH(10+xAdjust,22+yAdjust,z)
  buildDoorwayH(10+xAdjust,14+yAdjust,z)
  buildDoorwayV(34+xAdjust,6+yAdjust,z)
  buildDoorwayV(42+xAdjust,26+yAdjust,z)

  castle2BuilderFloor(z+1,xAdjust,yAdjust)

  buildDoorwayV(18+xAdjust,16+yAdjust,z)
  buildDoorwayV(42+xAdjust,18+yAdjust,z)
  buildDoorwayH(26+xAdjust,14+yAdjust,z)
  buildDoorwayH(26+xAdjust,32+yAdjust,z)
  addStaircase(32+xAdjust,29+yAdjust,z,{x:32+xAdjust,y:29+yAdjust,z:z+1})
  buildPassageV(26+xAdjust,24+yAdjust,z,5 )

}

const buildCastle=()=>{

  defaultCastleBuilderFloor(6,0,0)
  buildCastle2()
  buildWallV(30,24,6,5)

  // addCarpet(11,6,6)

  addConstruct('tree',20,16,6)
  addConstruct('tree',20,24,6)
  addConstruct('tree',40,16,6)
  addConstruct('tree',40,24,6)
  addWeaponsRack(24,16,6)
  addArmorRack(8,18,6,[randomArmor()])
  // changeArea({left:26,right:29,top:34,bottom:37},6,bridgeV)

  addWell(34,18,6,{x:110,y:125,z:1})
  spawnCreature(ogre,{x:46,y:10,z:6,weapon:enchant(club,4)})
  addChest(40,6,6)
  // addRug(14,16,6)
  spawnCreature(greenOoze,{x:12,y:7,z:6})
  spawnCreature(radioactiveOoze,{x:10,y:8,z:6})
  let zombieRoute=linearRoute([{x:40,y:9},{x:26,y:8},{x:28,y:19},{x:40,y:21},{x:40,y:27}],6)
  addCreatureGroup(neonaziZombie,{x:40,y:9,z:6},3,zombieRoute)
  addCreatureGroup(parishPriest,{x:36,y:28,z:6},1)
  addCreatureGroup(goblin,{x:20,y:28,z:6},3,null,{weapon:[knife,bow,bow],shield:[null,modItem(arrow,{quantity:10}),modItem(arrow,{quantity:10})]})
  addCoach(7,44,6,startingPos[5])
}
