
const restartLoop=()=>{
  if(finishedLoop){
    continueDrawing=true
    loop()
  }
}
let dateTime=0,hostileTime=0,vcTime=0
var loop2=(loopStartTime)=>{
  let start=Date.now()
  if(!combat&&Date.now()-battleEndTime>500&&!dialogOpen){
    let newDate = startDate+floor(Date.now()/1000)
    increaseDate(newDate-date)
    dateTime+=Date.now()-start
    start=Date.now()
    hostileCreatures=checkHostility()
    hostileTime+=Date.now()-start
    if(hostileCreatures.length){
      startBattle()
    }
  }

  let dist=round(scrollSpeed*sqrt(zoomLevel))
  if(scrollUp)moveScreen(0,-dist)
  if(scrollLeft)moveScreen(-dist,0)
  if(scrollDown)moveScreen(0,dist)
  if(scrollRight)moveScreen(dist,0)

  let nextLoopTime=max(10,1000/framerate+loopStartTime-Date.now())
  if(nextLoopTime===10&&fpsWarn)console.log('slow!!!!!!!!!!')
  continueDrawing&&setTimeout(loop,nextLoopTime)
  if(!continueDrawing){
    console.log('endloop')
    finishedLoop=true
  }
}
let lastCheck=0

var loop = () => {
  finishedLoop=false
  let loopStartTime=Date.now()
  let start=Date.now()
  if(!dialogOpen){
    if(Date.now()-lastCheck>checkInterval){
      checkView()
      checkTime+=Date.now()-start
    }
    start=Date.now()
    getVisibleCreatures()
    vcTime+=Date.now()-start
    if(!combat&&selected&&selected.attract){
      catchup()
    }
    setTimeout(()=>updateCanvas(loopStartTime),0)
  }else setTimeout(()=>loop2(loopStartTime),0)
}
