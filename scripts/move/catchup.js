let catchuptime=0
const catchup=()=>{
  if(combat||!selected)return
  let start=Date.now()
  let success=false
  controlled.filter(c=>c.z===currentWorld&&c.id!==selected.id&&
    distance(c,selected)>1&&distance(c,selected)<=maxLongMove&&
    c.status.status==='active').forEach(c => {
        if(c.moving||catchupMove(c,selected.dest))success=true
  })
  catchuptime+=Date.now()-start
  return success
}
const singleCatchupMove=(c,dest)=>{
  if(c.catchupRoute&&c.catchupRoute.length&&isEmpty(c.catchupRoute[0])&&distance(dest,c.catchupRoute[c.catchupRoute.length-1])<=2){
    moveCreatureTo(c,c.catchupRoute[0])
    c.catchupRoute.splice(0,1)
    return true
  }
}
const catchupMove=(c,dest)=>{
  if(!dest.z)throw new Error()
  if(singleCatchupMove(c,dest))return true
  // if(c.lastDestination&&dest.x===c.lastDestination.x&&dest.y===c.lastDestination.y&&
  //   (Date.now()-c.lastCatchup<stuckInterval)) return false

  c.lastDestination={x:dest.x,y:dest.y}
  c.catchupRoute=routeToward(c,dest)
  // c.lastCatchup=Date.now()
  if(c.catchupRoute){
    c.catchupRoute=c.catchupRoute.slice(1)
  }
  return singleCatchupMove(c,dest)
}
