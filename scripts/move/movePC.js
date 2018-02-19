
const combatMovePC=(coords,mover)=>{
  let dist=distance(mover,coords)
  if(dist<=2&&combat){
    let possible=combatMovePossible(mover,coords)

    if(possible){
      moveCreatureTo(mover,coords)
      return true
    }

  }
}
const startLongMove=(route,mover,cb)=>{
  mover.dest=route[route.length-1]
  startMove(mover,1000/moveSpeed,route[1],route)
  if(2===route.length) setTimeout(()=>{endMove(mover);cb&&cb()},1000/moveSpeed)
  else  setTimeout(()=>{
      timeoutMove(mover,route,2,cb)
    },1000/moveSpeed)
  return true
}
const peaceMovePC=(coords,mover)=>{
  if(!combat&&distance(mover,coords)<=maxLongMove){
    let route=routeToward(mover,coords)
    if(route){
      if(mover.moving)queuedRoute=route
      else startLongMove(route,mover)
      return true
    }else {
      console.log('blocked')
    }
  }
}
const movePC = (coords,mover=selected)=>{
  if(!mover)return
  if(combat){
    if(mover.moving)return
    return combatMovePC(coords,mover)
  }
  return peaceMovePC(coords,mover)
}
const timeoutMove=(mover,route,i,cb)=>{
  if(!combat){
    if(queuedRoute){
      startLongMove(queuedRoute,mover)
      queuedRoute=null
      return
    }
    startMove(mover,1000/moveSpeed,route[i])
    if(i===route.length-1) setTimeout(()=>{endMove(mover);cb&&cb()},1000/moveSpeed)
    else setTimeout(()=>timeoutMove(mover,route,i+1,cb),1000/moveSpeed)
  }else{
    endMove(mover)
  }
}
