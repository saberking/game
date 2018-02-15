let animations=[]
let animationId=0
const showAnimations=()=>{
  animations.map(a=>showAnimation(a))
}
const showAnimation=(a)=>{
  if(Date.now()>a.startTime+a.time){
    animations.splice(animations.findIndex(an=>an.id===a.id))
  }else{
    const fraction=(Date.now()-a.startTime)/a.time
    const x=fraction*a.end.x+(1-fraction)*a.start.x
    const y=fraction*a.end.y+(1-fraction)*a.start.y
    const pos={x:(x * width + 10)*zoomLevel  -screenPos.x,y:(y * height - 33)*zoomLevel -screenPos.y}
    ctx.drawImage(a.pic, pos.x,pos.y,64*zoomLevel,64*zoomLevel)
  }
}
const startAnimation=(pic,start,end,time)=>{
  animations.push({pic,start,end,startTime:Date.now(),time,id:animationId++})
}
const explosion=new Image()
explosion.src='assets/items/explosion.png'
