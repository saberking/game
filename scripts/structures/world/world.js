const minwidth=[]
const minheight=[]
const maxwidth = []
const maxheight=[]
const shade=[]
let worldNames=[]

let creatureGroups=[]


class Hex {
  constructor({
    seen,
    shade=0,
    blocking='',
    opacity=1,
    passable=true
  }){
    this.seen=seen
    this.shade=shade
    this.blocking=blocking
    this.opacity=opacity
    this.passable=passable
  }
}
const initWorld=()=>{
  for(let i=0;i<30;i++){
    creatureGroups[i]=[]
    fillWorld(i)
    los[i]=daytimeLos
  }
  buildTown()
  buildCastle()
  buildCity()
  refreshConstructs()
  inhabit   &&spawnCreatures()
}

const resetWorld=(cb)=>{
  constructs=[]
  constructId=0
  events=[]
  continueDrawing=false
  initWorld()
  cb&&cb()
}
const fillWorld=(z)=>{
  world[z]=[]
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
const airAbove=(x,y,z)=>{
  if(!world[z+1]||!world[z+1].length)return
  if(!world[z+1][x]){
    return
  }
  if(!world[z+1][x][y])return
  if  (world[z+1][x][y].terrain==='air')
  return true

}
const randomHex=({left,right,top,bottom,z})=>{
  let hex
  while(!hex||!exists(hex)||!isEmpty(hex)){
    hex={}
    hex.z=z
    hex.x=left+floor(random()*(right-left+1))
    hex.y=top+floor(random()*(bottom-top+1))
  }
  return hex
}
const position=(c,x,y,z=currentWorld)=> {
  const suitablePosition=(coords)=>{
    if(isEmpty(coords)){
      longCount++
      let good=longMove([{x,y,z}],coords,(a,b)=>moveThrough(a,b,c.faction))
      if(good!=='timeout')return good
    }
  }
  c.z=z
  if(isEmpty({x,y,z})){
    c.x=x
    c.y=y
  }else{
    let i=1, done=false
    while(!done){
      for(let j=-i;j<=i&&!done;j++){
        if(suitablePosition({x:x-2*i,y:y+j,z})){
          c.x=x-2*i;c.y=y+j;done=true
        }else if(suitablePosition({x:x+2*i,y:y+j,z})){
          c.x=x+2*i;c.y=y+j;done=true
        }
      }
      if(!done){
        for(let j=i-1;j>=0&&!done;j--){
          if(suitablePosition({x:x-2*j,y:y-2*i+j,z})){
            c.x=x-2*j;c.y=y-2*i+j;done=true
          }else if(suitablePosition({x:x-2*j,y:y+2*i-j,z})){
              c.x=x-2*j;c.y=y+2*i-j;done=true
            }else if(suitablePosition({x:x+2*j, y:y-2*i+j,z})){
              c.x=x+2*j;c.y=y-2*i+j;done=true
            }else if(suitablePosition({x:x+2*j,y:y+2*i-j,z})){
              c.x=x+2*j;c.y=y+2*i-j;done=true
          }
        }
      }
      i++
    }
  }
  c.dest={}
  c.dest.x=c.x
  c.dest.y=c.y
  c.dest.z=c.z
}
const isEmpty = ({x, y,z=currentWorld}) => {
  const normal=normalise({x,y})
  if(creatures.find(c => (c.z===z&&c.status.status==='active'&&((c.dest.x===normal.x&&c.dest.y===normal.y)||(c.x===normal.x&&c.y===normal.y)))))
    return false
  return isPassable({x,y,z})
}
