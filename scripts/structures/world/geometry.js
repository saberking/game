const exists = ({x,y,z=currentWorld}) =>
  (x/2+y)%2&&!(x%2) && x < maxwidth[z] &&y<maxheight[z] &&x>=0&&y>=0

const distance = (a,b) => {
  const xdistance = abs(b.x - a.x)/2
  const ydistance = abs(b.y - a.y)
  if (ydistance > xdistance) {
    return xdistance+ceil((ydistance-xdistance) / 2)
  }
  return xdistance
}

var coordinates = ({clientX, clientY}) => {
  const x = Math.floor((clientX + window.scrollX + screenPos.x) / (width*zoomLevel))
  const y = Math.floor((clientY + window.scrollY +screenPos.y) / (height*zoomLevel))
  return {x, y,z:currentWorld}
}

const normalise=({x,y,z=currentWorld})=>{
  if(x%1||y%1||z%1){
    console.log(x,y,z)
    throw new Error()
  }
  let nx=x-(x%2)
  if(x<0)nx=-2
  if((nx/2+y)%2)return {x:nx,y,z}
  return {x:nx,y:y-1,z}
}

const adjacentHexes=({x,y,z=currentWorld},dist=1)=>{
  let adj=[]
  for(var i = max(0, x - 2*dist);i<=min(x+2*dist, maxwidth[z]);i+=2){
    for (var j = max(0,y-2*dist);j<=min(maxheight[z],y+2*dist);j++){
      if(distance({x:i,y:j},{x,y})<=dist&&exists({x:i,y:j,z})){
        adj.push({x:i,y:j,z})
      }
    }
  }
  return adj.sort((a,b)=>distance({x,y},a)-distance({x,y},b))
}
