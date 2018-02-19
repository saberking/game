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

const layout=()=>{
  // closeDialog()
  screenwidth=window.innerWidth
  screenheight=window.innerHeight
  // document.getElementById('border').style.width = screenwidth
  document.getElementById('can').width = screenwidth
  document.getElementById('can').style.width = screenwidth
  document.getElementById('can').height = screenheight
  document.getElementById('can').style.height = screenheight
  // document.getElementById('drawCanvas').width = screenwidth
  // document.getElementById('drawCanvas').style.width = screenwidth
  // document.getElementById('drawCanvas').height = screenheight
  // document.getElementById('drawCanvas').style.height = screenheight
  // document.getElementById('canvas2').width = screenwidth
  // document.getElementById('canvas2').style.width = screenwidth
  // document.getElementById('canvas2').height = screenheight
  // document.getElementById('canvas2').style.height = screenheight
  document.getElementById('dialog').style.height = screenheight
  document.getElementById('dialog').style.width =screenwidth
  document.getElementById('dialog').style.top = 0
  document.getElementById('dialog').style.left =0
  for(let i=0;i<noOfCharacters;i++){
    let e=document.getElementById('dialog_'+i)
    if(e)  {
      e.style.height = screenheight- 90
      e.style.width =screenwidth - 200
      e.style.left=(i+1)*screenwidth+75
    }
  }
  document.getElementById('message2').style.width=screenwidth*0.5
  document.getElementById('dialog2').style.width=screenwidth*0.5 - 50
  document.getElementById('dialog2').style.left=screenwidth*0.25
  document.getElementById('dialog2').style.top=screenheight*0.1
  document.getElementById('dialog2').style.height=screenheight*0.8-50
  // document.getElementById('ins').style.height=screenheight
  // document.getElementById('ins').style.width=screenwidth
  lastZoomLevel=0
}
