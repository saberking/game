
const fillWorld=(z)=>{
  let left=minwidth[z],right=maxwidth[z],top=minheight[z],bottom=maxheight[z]
  for(let i =left;i<=right;i++){
    world[z][i]=[]
    for(let j =top;j<=bottom;j++){
      world[z][i][j]=new Hex({})
    }
  }
}

const revealArea=({left,top,right,bottom},z)=>{
  for(let i =left;i<=right;i++){
    for(let j =top;j<=bottom;j++){
      if(!world[z][i][j])console.log(z,i,j)
      world[z][i][j].seen=true
      constructs.forEach(c=>{
        if(inside({x:i,y:j,z},c.zone)&&c.name.toLowerCase().includes('wall'))
          c.seen=true
        })
    }
  }
}

const addShade=({left,right,top,bottom},z,shade=0.25)=>{
  for(let i = left;i<=right;i++){
    for(let j=top;j<=bottom;j++){
            world[z][i][j].shade=shade
    }

  }
}

const clearArea=({left,top,right,bottom},z)=>{
      removeConstructs(left,top,z,right-left+1,bottom-top+1)
}
const isPassable=({x,y,z=currentWorld})=>{
  const normal=normalise({x,y,z})
  if(!exists(normal)){
    console.log(x,y,z,normal)
    return false
  }
  let count=0
  for(let i=0;i<2;i++)
    for(let j=0;j<2;j++){
      if(!world[z]||!world[z][normal.x+i])console.log('z,x',z,x,world[9])
      world[z][normal.x+i][normal.y+j].passable&&count++

    }
  if(count>=3)return true
  if(count===2&&world[z][normal.x][normal.y].blocking==='t') return true
}
