let moveThroughTime=0
let moveThrough=(start,{x,y,z=currentWorld},faction)=>{
  if(x%1||y%1||z%1){
    console.log(x,y,z)
    throw new Error()
  }
  if(!exists({x,y,z}))return
  let starttime=Date.now()
  if(isNaN(x)||isNaN(y))throw new Error()
  if(distance(start,{x,y})>1||blockedByWall({x:start.x,y:start.y,z},{x,y,z})||!isPassable({x,y,z}) ){
    moveThroughTime+=Date.now()-starttime
    return false
  }
  let possible=false
  if(isEmpty({x,y,z})){
    moveThroughTime+=Date.now()-starttime
    return true
  }
  else {
    let friendly
    if(!combat||(stillToMove[0]&&stillToMove[0].controlled))friendly=creatures.filter(c=>c.controlled)
    else friendly=creatures.filter(c=>c.faction===faction)
    friendly.forEach(c=>{
      if(c.x===x&&c.y===y&&c.z===z)possible=true
    })
  }
  moveThroughTime+=Date.now()-starttime
  return possible
}
