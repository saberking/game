const sceneLength=5000
const cutscene=(cb)=>{
  imageInfo.forEach(i=>{
    let im=merge(i,{image:new Image()})
    im.image.src='assets/animation/'+i.name+'.png'
    images.push(im)
  })
  document.getElementById('health').display='none'
  document.getElementById('dialog').innerHTML=''
  document.getElementById('dialog2').innerHTML=''
  continueDrawing=false
  ctx.clearRect(0,0,screenwidth,screenheight)
  let sceneStartTime=Date.now()
  showCanvas()
  drawFrame(sceneStartTime,sceneLength,cb)
}
const drawFrame=(start,length,cb)=>{
  let end=start+length
  if(Date.now()>end){
    cb?cb():closeDialog()
    return
  }
  images.forEach(i=>{
    drawScene(i,(Date.now()-start)/length)
  })
  window.requestAnimationFrame(()=>drawFrame(start,length,cb))
}
const drawScene=(i,t)=>{
  ctx.clearRect(0,0,screenwidth,screenheight)
  ctx.drawImage(i.image,i.x(t),i.y(t))
}
const images=[]
const imageInfo=[
  {
    x:(time)=>100,
    y:(time)=>400*time,
    name:'ufo'
  }
]
