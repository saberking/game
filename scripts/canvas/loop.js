
const restartLoop=()=>{
  if(finishedLoop){
    continueDrawing=true
    loop()
  }
}
let dateTime=0,hostileTime=0,vcTime=0
var loop2=(loopStartTime)=>{
  let nextLoopTime=max(10,1000/framerate+loopStartTime-Date.now())
  if(nextLoopTime===10&&fpsWarn)console.log('slow!!!!!!!!!!')
  continueDrawing&&setTimeout(loop,nextLoopTime)
  if(!continueDrawing){
    console.log('endloop')
    finishedLoop=true
  }
}
let lastCheck=0
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
  loop2(loopStartTime)
}

var loop = () => {
  finishedLoop=false
  let loopStartTime=Date.now()
  let start=Date.now()
    if(Date.now()-lastCheck>checkInterval){
      checkView()
      checkTime+=Date.now()-start
    }
    getVisibleCreatures()
    start=Date.now()
    if(!combat){
      if(checkHostility().length){
        startBattle()
      }else{
        catchup()
      }
    }

    let dist=round(scrollSpeed*sqrt(zoomLevel))
    if(scrollUp)moveScreen(0,-dist)
    if(scrollLeft)moveScreen(-dist,0)
    if(scrollDown)moveScreen(0,dist)
    if(scrollRight)moveScreen(dist,0)

    setTimeout(()=>updateCanvas(loopStartTime),0)
}
