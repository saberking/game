let horizontalLines=()=>{
  let yAdjust=screenPos.y%(2*height*zoomLevel)
  let xAdjust=screenPos.x%(4*width*zoomLevel)+2*width*zoomLevel
  ctx2.globalAlpha=0.2
  ctx2.lineWidth=2
  for(let i = 0;height*zoomLevel*(i-2)<screenheight;i+=2){
    ctx2.beginPath();
    ctx2.moveTo(-1*(width*zoomLevel/6+xAdjust),height*zoomLevel-yAdjust);
    for(let j=0;width*zoomLevel*2*(j-1)<screenwidth;j++){
      ctx2.lineTo(4*width*zoomLevel*j+2*width*zoomLevel/6-xAdjust,-1*yAdjust+i*height*zoomLevel)
      ctx2.lineTo(4*width*zoomLevel*j+2*width*zoomLevel*5/6-xAdjust,-1*yAdjust+i*height*zoomLevel)
      ctx2.lineTo(4*width*zoomLevel*j+2*width*zoomLevel*7/6-xAdjust,height*zoomLevel-yAdjust+i*height*zoomLevel)
      ctx2.lineTo(4*width*zoomLevel*j+2*width*zoomLevel*11/6-xAdjust,height*zoomLevel-yAdjust+i*height*zoomLevel)
    }
    ctx2.stroke();
  }
  ctx2.globalAlpha=1
}
