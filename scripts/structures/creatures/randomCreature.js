const randomCreature=(spot,z=currentWorld,bonus=0)=>{
  let score=bonus+d20()
  if(score<3)spawnCreature(goblin,spot.x,spot.y,z)
  else if(score<6)spawnCreature(zombie,spot.x,spot.y,z)
  else if(score<9)spawnCreature(greenOoze,spot.x,spot.y,z)
  else if(score<12)spawnCreature(neonaziZombie,spot.x,spot.y,z)
  else if(score<15)spawnCreature(zombieQueen,spot.x,spot.y,z)
  else spawnCreature(vampire,spot.x,spot.y,z)
}
let randomSpot=(l,t,r,b,z)=>{
  while(1){
    let x = 2*round((l+ random()*(r-l))/2)
    let y=2*round((t+random()*(b-t-2))/2)+1
    if(exists({x,y,z})){
      if(isEmpty({x,y,z})){
        return {x,y,z}
      }
    }
  }
}
