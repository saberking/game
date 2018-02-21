const connected=(a,b)=>shortMovePossible(a,b,(a,b)=>isPassable(b))
const combatMovePossible=(a,b)=>shortMovePossible(a,b,(a,b)=>moveThrough(a,b,a.faction))
const upOrDownAway=(c, x, target) => {
  if(c.y>target.y && isEmpty({x,y:c.y+1})) return 1
  else if(c.y<target.y && isEmpty({x,y:c.y-1})) return -1
  else if(isEmpty({x,y:c.y+1}))return 1
  else return -1
}
const canMoveLeft = c=>isEmpty({x:c.x-2,y:c.y+1})||isEmpty({x:c.x-2, y:c.y-1})
const canMoveRight = c=>isEmpty({x:c.x+2,y:c.y+1})||isEmpty({x:c.x+2, y:c.y-1})
const adjacentMovePossible=(a,b)=>{
  if(a.z!==b.z)return
  if(distance(a,b)>1)return

  if(!isEmpty(b))return

  if(!exists(a)||!exists(b))return

  if(blockedByWall(a,b))return

  return true
}
const shortMovePossible=(a,b,func)=>{

  let dist=distance(b,a)
  if(!isEmpty(b))return false
  if(dist===0)return true
  let possible=false
  if(adjacentMovePossible(a,b))possible=true

  else if(dist===2){
    if(b.x===a.x){
        possible=func(a,{x:b.x,y:(b.y+a.y)/2})&&
          func({x:b.x,y:(b.y+a.y)/2},b)
    }else if(b.y===a.y){
      possible=(func(a,{x:(b.x+a.x)/2,y:b.y-1})&&func({x:(b.x+a.x)/2,y:b.y-1},b))||
        (func(a,{x:(b.x+a.x)/2,y:b.y+1})&&func({x:(b.x+a.x)/2,y:b.y+1},b))
    }else if(Math.abs(b.x-a.x)===4){
      possible=func(a,{x:(b.x+a.x)/2,y:(b.y+a.y)/2})&&func({x:(b.x+a.x)/2,y:(b.y+a.y)/2},b)
    }else{
        possible=(func(a,{x:b.x,y:(2*a.y+b.y)/3})&&func({x:b.x,y:(2*a.y+b.y)/3},b))||
          (func(a,{x:a.x,y:(2*b.y+a.y)/3})&&func({x:a.x,y:(2*b.y+a.y)/3},b))
    }
  }
  return possible
}
let singleMoveToward = (c, target)=>{
  if(isNaN(target.x)||isNaN(target.y))throw new Error()
  let route=routeToward(c,target)
  if(route){
    for(let i=2;i>0;i--){
      if(route[i]&&isEmpty(route[i])){
        moveCreatureTo(c,route[i])
        return true
      }
    }
  }
}
let awayDir=(c,target)=>{
  if(c.x>target.x && canMoveRight(c)){
    return {x:c.x+2, y:c.y+upOrDownAway(c,c.x+2,target),z:c.z}
  }else if(c.x<target.x && canMoveLeft(c)){
    return {x:c.x-2, y:c.y+upOrDownAway(c, c.x-2, target),z:c.z}
  }else if(c.y>target.y+1&& adjacentMovePossible(c,{x:c.x,y:c.y+2,z:c.z})){
    return {x:c.x, y:c.y+2,z:c.z}
  }else if (c.y<target.y-1&&adjacentMovePossible(c,{x:c.x,y:c.y-2,z:c.z})){
    return {x:c.x, y:c.y-2,z:c.z}
  }
  return c
}
let singleMoveAway = (c,target,cont) =>{
  let dest=c
  for(let i=0;i<2;i++){
    dest=awayDir(dest,target)
  }
  if(dest.x===c.x&&dest.y===c.y)return
  moveCreatureTo(c,dest)
  return true
}
