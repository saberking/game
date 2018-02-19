let cltime=0
const hexVisibility = (x,y,filtered=controlled.filter(c=>c.status.status==='active'&&c.z===currentWorld))=>{
  const closest=filtered.filter(c=>distance(c,{x,y})<los[currentWorld])
  let start=Date.now()
  let view=false
  for(let i =0;i<closest.length&&!view;i++){
      view=view||lineOfSite(closest[i].x,closest[i].y,x,y)

  }
  return view
}

const blocking=({x,y,z})=>{
  if(!world[z][x]) console.log(z,x,y)

  if(world[z][x][y])return world[z][x][y].blocking
  throw new Error()
}
const blockedByWall=(a,b)=>{
  if(!exists(a)||!exists(b)){
    console.log(a,b)
    throw new Error()
  }
  if(a.x===b.x&&a.y>b.y){
    if(blocking(a))return true
  }
  if(a.x===b.x&&a.y<b.y){
    if(blocking(b))return true
  }
}

const canSee=(a,b)=>{
  let view=false
    view=lineOfSite(a.x,a.y,b.x,b.y)||lineOfSite(a.x,a.y,b.x+1,b.y)
  view=view||lineOfSite(a.x,a.y,b.x,b.y+1)
  view=view||lineOfSite(a.x,a.y,b.x+1,b.y+1)
  return view
}

const lineOfSite=(x1,y1,x2,y2)=>{
  x1+=0.5,y1+=0.5
  let xDistance =Math.abs(x2-x1)
  let yDistance=Math.abs(y2-y1)

  let xVec=x2-x1>=0?1:-1
  let yVec=y2-y1>=0?1:-1
  let opacitySum=0

  const getStartY=(i)=>round(y1+yVec*i*yDistance/xDistance-yVec/1000000)
  const getEndY=i=>{
    const dist=i+1>xDistance?0.5:1
    const minus=0
    return round(y1+yVec*((i+dist)*yDistance/xDistance-minus)-yVec/1000000)
  }

  for(let i = 0;i<xDistance;i++){

    let startY=getStartY(i)

    let endY=getEndY(i)
    let start=min(startY,endY),end=max(startY,endY)

    let block

    if(i+1<=xDistance){
      block=blocking({z:currentWorld,x:x1+xVec*(i+0.5),y:endY})
      let opac=world[currentWorld][x1+xVec*(i+0.5)][endY].opacity
        if(block){
          if((block.includes('l')&&xVec<0)||(block.includes('r')&&xVec>0)){
            opacitySum+=opac
          }
        }

    }

    for(let y=start;y<=end;y++){
      block=blocking({z:currentWorld,x:x1+xVec*(i+0.5),y})
      if(block){
        if(block.includes('t')){
          if(
            y!==start||
            (i&&yVec>0&&getEndY(i-1)!==y)||
            (yVec<0&&getStartY(i+1)!==y&&y!==y2&&world[currentWorld][x1+xVec*(i+1.5)]&&world[currentWorld][x1+xVec*(i+1.5)][y].blocking.includes('t'))
          ){
            opacitySum+=world[currentWorld][x1+xVec*(i+0.5)][y].opacity
          }
        }
      }
      if(opacitySum>=1)return false
    }
  }
  return true
}
const isCreatureVisible=c=>{
  if(c.carried)return false
  if(c.controlled)return true
  if(c.z>currentWorld)return false
  const checkFunc=i=>world[i]&&world[i][c.x]&&world[i][c.x][c.y+currentWorld-i]&&
        world[i][c.x][c.y+currentWorld-i].terrain==='air'
  for(let i=currentWorld;
    c.z===i||(c.z<i&& checkFunc(i));
    i--){
      if(c.z===i){
        return currentView[c.x][c.y+currentWorld-c.z]||
          currentView[c.x+1][c.y+currentWorld-c.z]||
          currentView[c.x][c.y+currentWorld-c.z+1]||
          currentView[c.x+1][c.y+currentWorld-c.z+1]

      }
    }
}
