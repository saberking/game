let screenwidth=window.width
let screenheight=window.height
const goFullscreen=()=>     {
  // document.body.webkitRequestFullscreen&&document.body.webkitRequestFullscreen()
  // document.body.mozRequestFullScreen&&document.body.mozRequestFullScreen()
}
const centreScreen=(c=selected)=>{
  if(c){
    screenPos={
      x:min(
          max(c.x*width*zoomLevel-screenwidth/2,0),
          maxwidth[currentWorld]*width*zoomLevel-screenwidth
        ),
      y:max(
          min(c.y*height*zoomLevel-screenheight/2,
            maxheight[currentWorld]*height*zoomLevel-screenheight
          ),
          minheight[currentWorld]*height*zoomLevel
        )}
  }

}
const moveScreen=(x,y)=>{
  let xDistance=min(maxwidth[currentWorld]*width*zoomLevel-screenwidth,
    max(minwidth[currentWorld]*width*zoomLevel,screenPos.x+x))-screenPos.x
    let yDistance=min((maxheight[currentWorld]-1)*height*zoomLevel-screenheight,
      max(screenPos.y+y,minheight[currentWorld]*height*zoomLevel))-screenPos.y
  screenPos.y+=round(yDistance)
  screenPos.x+=round(xDistance)
  // document.getElementById('canvas2').style.left=-screenPos.x
  // document.getElementById('canvas2').style.top=-screenPos.y
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
