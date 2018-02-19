
const combatMovePC=(coords,mover)=>{
  let dist=distance(mover,coords)
  if(dist<=2&&combat){
    let possible=combatMovePossible(mover,coords)

    if(possible){
      moveCreatureTo(mover,coords)
      setTimeout(()=>finished(mover),500)
      return true
    }

  }
}
const startLongMove=(route,mover,cb)=>{
  mover.dest=route[route.length-1]
  startMove(mover,500/moveSpeed,route[1],route)
  if(2===route.length) setTimeout(()=>{endMove(mover);cb&&cb()},500/moveSpeed)
  else  setTimeout(()=>{
      timeoutMove(mover,route,2,cb)
    },500/moveSpeed)
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
    startMove(mover,500/moveSpeed,route[i],route)
    if(i===route.length-1) setTimeout(()=>{endMove(mover);cb&&cb()},480/moveSpeed)
    else setTimeout(()=>timeoutMove(mover,route,i+1,cb),480/moveSpeed)
  }else{
    endMove(mover)
  }
}
