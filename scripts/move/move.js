const moveTime=d=>1000*d/moveSpeed

const moveCreatureTo =(c, {x, y})=>{
  c.dest={x,y,z:c.z}
  let ending=()=>{
    endMove(c);
  }
  if(combat){
    ending=()=>{
      endMove(c);
      finished(c)
    }
  }
  let time=moveTime(distance({x,y},c))
  startMove(c, time,{x,y})
  if(combat)c.status.initiative++
  setTimeout(ending,time)
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
  if(mover.moving){
    if(selected&&mover.id===selected.id)moveEndTime=Date.now()
    mover.dest={x:mover.x,y:mover.y,z:mover.z}
    mover.moving = false
  }
  if(!combat&&selected&&selected.id===mover.id&&queuedRoute)startLongMove(queuedRoute,mover)
  queuedRoute=null
}
