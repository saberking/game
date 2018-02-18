
const showCanvas=()=>{
  can2.style.display='inline'
  document.getElementById('can').style.display='inline'

}
const square=()=>{
  ctx.globalAlpha=1
  ctx.fillStyle='#888898'
  let message=document.getElementById('message2')

  let x=round(screenwidth/2+30)
  let y=round(screenheight-145-30+(156-50)*message.scrollTop/(message.scrollHeight-156))

  ctx.fillRect(x,y,10,50)
}
const hideCanvas=()=>{
  console.log('hide')
  can2.style.display='none'
  document.getElementById('can').style.display='none'

}
let rectTime=0
var rect = ({x, y,size=1}) =>{
  let start=Date.now()
  const left = floor((width * x  )*zoomLevel - screenPos.x)
  const rWidth=floor((width *( x +size) )*zoomLevel - screenPos.x)-left
  const top=floor(height*y*zoomLevel -screenPos.y)
  const rHeight=floor(height*(y+size)*zoomLevel -screenPos.y)-top
  rectTime+=Date.now()-start
  return{top,rHeight,left,rWidth}
}
const colorRect=({x,y, color, size}) =>{
  const {left,top,rWidth,rHeight}=rect({x,y,size})
  ctx.fillStyle=color
  ctx.fillRect(left,top,rWidth,rHeight)
}
const drawQuarter=(pic,xOffset,yOffset,x,y,ct=ctx)=>{
  ct.globalAlpha=1
  let {left,top,rWidth,rHeight}=rect({x,y})
  ct.drawImage(pic, xOffset,yOffset,width,height,left,top,rWidth,rHeight)
}
let clearTime=0,hextime=0,checkTime=0,worldTime=0,highTime=0,ccTime=0,uTime=0,vTime=0,aTime=0

const updateCanvas=(loopStartTime)=>{
  let start=Date.now()
  ctx.clearRect(0, 0, 2000, 1100)
  clearTime+=Date.now()-start
  start=Date.now()
  showWorld2()
  worldTime+=Date.now()-start


  start=Date.now()
  let hi=getHighlight()
  hi.forEach(h=>showHighlight(h))
  highTime+=Date.now()-start

  /////////////////////////////

  start=Date.now()
  showConstructsAndCreatures(omniscient?creatures:visibleCreatures)
  ccTime+=Date.now()-start
  start=Date.now()

  showView()
  vTime+=Date.now()-start

  start=Date.now()

  if(!omniscient)hideUnseen()
  uTime+=Date.now()-start
  start=Date.now()
  showAnimations()
  aTime+=Date.now()-start
  square()
  // ctx3.drawImage(can2,0,0)
  // ctx3.drawImage(can,0,0)

  ////////////////////////////////
  setTimeout(()=>loop2(loopStartTime),0)
}
