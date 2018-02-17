const upOrDownAway=(c, x, target) => {
  if(c.y>target.y && isEmpty({x,y:c.y+1})) return 1
  else if(c.y<target.y && isEmpty({x,y:c.y-1})) return -1
  else if(isEmpty({x,y:c.y+1}))return 1
  else return -1
}

const moveCreatureTo =(c, {x, y}, next)=>{
  c.dest={x,y,z:c.z}
  startMove(c, 500/moveSpeed,{x,y})
  if(combat)c.status.initiative++
  setTimeout(()=>{
    endMove(c);
  },500/moveSpeed)
}




const startMove = (creature, time,coords) => {
  if(creature.controlled)
    zoneTriggers.forEach(z=>{
      if(inside(coords,z)&&!inside(creature,z)){
        z.event()
      }
    })
  if(combat)refuseInput=true
  creature.movingFrom = {}
  creature.movingFrom.x = creature.x
  creature.movingFrom.y = creature.y
  creature.x=coords.x
  creature.y=coords.y
  if(!creature.moving){
    creature.moving = true
  }
  creature.movingTime = time
  creature.moveStartTime = Date.now()
}


const endMove = (mover) => {
  if(combat&&stillToMove&&stillToMove[0]&&stillToMove[0].controlled)refuseInput=false
  if(mover.moving){
    if(selected&&mover.id===selected.id)moveEndTime=Date.now()
    mover.dest={x:mover.x,y:mover.y,z:mover.z}
    mover.moving = false
    if(combat)endCombatAction(mover)
  }
  if(!combat&&selected&&selected.id===mover.id&&queuedRoute)startLongMove(queuedRoute,mover)
  queuedRoute=null
}
const canMoveLeft = c=>isEmpty({x:c.x-2,y:c.y+1})||isEmpty({x:c.x-2, y:c.y-1})
const canMoveRight = c=>isEmpty({x:c.x+2,y:c.y+1})||isEmpty({x:c.x+2, y:c.y-1})
