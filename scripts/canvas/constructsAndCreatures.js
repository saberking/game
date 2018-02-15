const showFlatConstructs=()=>{
  let start = flatConstructs.findIndex(c=>c.zone.bottom>=screenTop())
  if(start===-1)return
  let end=flatConstructs.findIndex(c=>c.zone.top>screenBottom())
  if(end===-1)end=flatConstructs.length
  for(let i=start;i<end;i++){
    let zn=flatConstructs[i].zone
    let w=zn.z
    if(w===currentWorld)showFlatConstruct(flatConstructs[i])
    // else{
    //   while(world[w+1].length&&world[w+1][zn.left][zn.top].terrain==='air'){
    //     w++
    //     if(w===currentWorld)showFlatConstruct(flatConstructs[i])
    //   }
    // }
  }
}
const showFlatConstruct=(c)=>{
  let w=(c.zone.right-c.zone.left+1)*width*zoomLevel
  let h=(c.zone.bottom-c.zone.top+1)*height*zoomLevel
  ctx2.drawImage(c.image,
    round(c.zone.left*width*zoomLevel-screenPos.x),round(c.zone.top*height*zoomLevel-screenPos.y),w,h
  )
}
let constructTime=0,creattime=0,bucktime=0
const showCreature=(c)=>{

  if(omniscient&&!onScreen(c))return
  if(c.carried||c.effects.find(ef=>ef.score==='invisibility'))return
  const adjust={x:(c.drawWidth-2*width)/2,y:c.drawHeight-1.5*height}
  let x,y,offsetX
  ctx.shadowColor='black'
  ctx.shadowBlur=1
  if (c.moving) {
    const fraction = min(((Date.now() - c.moveStartTime)  / c.movingTime),0.99)
    const stage = floor(fraction* c.stages)
    offsetX=c.picWidth * stage
    x=((c.x *(fraction)+c.movingFrom.x*(1-fraction)) * width - adjust.x)*zoomLevel -screenPos.x
    y=((c.y *(fraction)+c.movingFrom.y*(1-fraction)+currentWorld-c.z) * height - adjust.y)*zoomLevel -screenPos.y
  }
  else {
    offsetX=0
    x=(c.x * width)*zoomLevel  -screenPos.x
    y=((c.y+currentWorld-c.z) * height - adjust.y)*zoomLevel -screenPos.y
  }
  ctx.drawImage(c.pic.sprite, offsetX,
    0,c.picWidth, c.picHeight,
    x,
    y,
    c.drawWidth*zoomLevel, c.drawHeight*zoomLevel
  )
  if(c.weapon.subtype!=='unarmed')
    ctx.drawImage(itemPics[c.weapon.picName],0,
      0,64, 64,
      x,
      y+20,
      32*zoomLevel, 32*zoomLevel
    )
  if(c.status.status==='unconscious'){
    ctx.globalAlpha=0.2
    colorRect({x:c.x,y:c.y,color:'blue',size:2})
    ctx.globalAlpha=1
  }else if(combat&&selected&&c.id===selected.id&&!apForAttack(c)){
    ctx.globalAlpha=0.05
    colorRect({x:c.x,y:c.y,color:'cyan',size:2})
    ctx.globalAlpha=1
  }else if(selectingTarget&&selected&&c.id===selected.id){
    ctx.globalAlpha=0.2
    colorRect({x:c.x,y:c.y,color:'yellow',size:2})
    ctx.globalAlpha=1
  }
  ctx.shadowBlur=0
}
const showConstructsAndCreatures=(visibleCreatures)=>{
  let creatureBucket=[]
  let start=Date.now()
  visibleCreatures.forEach(c=>{
    if(onScreen(c)){
      if(!creatureBucket[c.y])creatureBucket[c.y]=[]
      creatureBucket[c.y].push(c)
    }
  })
  bucktime+=Date.now()-start
  for(let y=max(minheight[currentWorld],screenTop()-maxConstructHeight);y<=screenBottom()+1;y++){
    start=Date.now()
    if(bucket[y])bucket[y].forEach(c=>{
      let w=c.zone.z
      let z=c.zone.z===currentWorld
      if(!z){

        while(airAbove(c.zone.left,c.zone.top+w-c.zone.z+1,w)||
          airAbove(c.zone.left,c.zone.bottom+w-c.zone.z+1,w)||
          airAbove(c.zone.right,c.zone.top+w-c.zone.z+1,w)||
          airAbove(c.zone.right,c.zone.bottom+w-c.zone.z+1,w)){

          w++
          z=z||currentWorld===w
        }
      }
      if(z&&c.zone.bottom>=screenTop()&&c.zone.left<=screenRight()&&c.zone.right>=screenLeft()){
        showConstruct(c)
      }
    })
    constructTime+=Date.now()-start
    start=Date.now()
    creatureBucket[y-1]&&creatureBucket[y-1].forEach(c=>showCreature(c))
    creattime+=Date.now()-start
  }
}
const showConstruct=c=>{
  // if(c.zone.z!==currentWorld)console.log('foo')
  if(!c.height)console.log(c)
  const excFunc=(x,y)=>currentView[x][y]||(!firstPerson&&world[currentWorld][x][y].seen)
  let {top,bottom,left,right}=c.zone
  for(let x=left;x<=right;x++){
    for(let y=top-c.height;y<=bottom;y++){
      let exc=false
      exc=getExclusions(x,y,excFunc)
        if(!c.height||currentView[x][y]||(world[c.zone.z][x][y].seen&&!firstPerson)||
          exc||omniscient){
            if(c.name==='well2')console.log('foo')

          drawQuarter(c.image,(x-left)*width,(y-top+c.height)*height,x,y+currentWorld-c.zone.z,c.height?ctx:ctx2)
        }
    }
  }
}
