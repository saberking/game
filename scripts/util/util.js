const d20 = (c) => {
  let bonus=c&&c.status.luc?c.status.luc/5:0
  return ceil(Math.random() *20*(1+bonus))
}
const displayName=n=>{
  let indices=[]
  for(let i=1;i<n.length;i++){
    if(n[i].toLowerCase()!==n[i])indices.push(i)
  }
  indices.push(n.length)
  let start=0
  let n2=''
  indices.forEach(i=>{
    n2+=n.substring(start,i)+' '
    start=i
  })
  return n2
}

const isEmpty = ({x, y,z=currentWorld}) => {
  const normal=normalise({x,y})
  if(creatures.find(c => (c.z===z&&!c.carried&&((c.dest.x===normal.x&&c.dest.y===normal.y)||(c.x===normal.x&&c.y===normal.y)))))
    return false
  return isPassable({x,y,z})
}


const creatureAt=({x,y})=>{
  let normal=normalise({x,y})
  return creatures.find(c=>c.x===normal.x&&c.y===normal.y&&c.z===currentWorld&&!c.carried)
}

const inside=(c,z)=>{
  return c.z===z.z&&c.x>=z.left&&c.x<=z.right&&c.y>=z.top&&c.y<=z.bottom
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
const reduceAmmo=c=>{
  c.shield.quantity--
  if(c.shield.quantity===0)c.shield=null
}
const onScreen=c=>{
  let z=(c.z===currentWorld)
  let w=c.z
  if(!z){
    while(world[w+1].length&&exists({x:c.x,y:c.y,z:w+1})&&world[w+1][c.x][c.y].terrain==='air'){
      w++
      z=z||(w===currentWorld)
    }
  }
  let x=(c.x>=floor(screenPos.x/(width*zoomLevel))||c.movingFrom.x>=floor(screenPos.x/(width*zoomLevel)))&&
    (c.x<ceil(screenPos.x/(width*zoomLevel))+screenwidth/(width*zoomLevel)+1||c.movingFrom.x<(screenPos.x+screenwidth)/(width*zoomLevel)+1)
  let y=(c.y>=floor(screenPos.y/(height*zoomLevel))||c.movingFrom.y>=floor(screenPos.y/(height*zoomLevel)))&&
    (c.y<(screenPos.y+screenheight)/(height*zoomLevel)+1||c.movingFrom.y<(screenPos.y+screenheight)/(height*zoomLevel)+1)
  return x&&y&&z
}
const screenLeft=()=>floor(screenPos.x/(width*zoomLevel))
const screenRight=()=>ceil((screenPos.x+screenwidth)/(width*zoomLevel))
const screenTop=()=>floor(screenPos.y/(height*zoomLevel))
const screenBottom=()=>ceil((screenPos.y+screenheight)/(height*zoomLevel))

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
