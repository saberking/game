
const hideUnseen=()=>{
  let color='#333333'
  // color='#302211'
  for(let x=max(screenLeft(),minwidth[currentWorld]);x<=min(screenRight(),maxwidth[currentWorld]);x++){
    for(let y=max(screenTop(),minheight[currentWorld]);y<=min(screenBottom(),maxheight[currentWorld]-1);y++){
      if(!world[currentWorld][x][y].seen){
        let exc=getExclusions(x,y,(x,y)=>world[currentWorld][x][y].seen)
        if(!exc)  colorRect({x,y,color,size:1})
      }
    }
  }
}

let lastScreenPos={}
let lastZoomLevel=0
const stone=new Image()
stone.src='assets/background/largeConcrete.jpg'
const showGround=()=>{
  // if((lastZoomLevel===zoomLevel&&lastScreenPos.x===screenPos.x&&lastScreenPos.y===screenPos.y))return
  lastScreenPos.x=screenPos.x
  lastScreenPos.y=screenPos.y
  lastZoomLevel=zoomLevel
  const dim={x:5136,y:3424}
  const scale={x:dim.x/(width*200*zoomLevel),y:dim.y/(height*200*zoomLevel)}
  pretty&&ctx2.drawImage(stone,screenPos.x*scale.x,screenPos.y*scale.y,screenwidth*scale.x,screenheight*scale.y,0,0,screenwidth,screenheight)

  ctx2.fillStyle='#733e2a'
  ctx2.globalAlpha=0.5
  ctx2.fillRect(0,0,screenwidth,screenheight)
  ctx2.globalAlpha=1
}
let groundTime=0,flatTime=0
const showWorld2=()=>{
  let start=Date.now()
  showGround()
  groundTime+=Date.now()-start
  start=Date.now()
  showFlatConstructs()
  flatTime+=Date.now()-start
  start=Date.now()
  hex&&combat&&horizontalLines()
  hexTime+=Date.now()-start
}

// const showWorld=()=>{
//   let index=players===1?1:currentFaction
//   let top=screenTop()-1,bottom=screenBottom(),left=screenLeft(),right=screenRight()
//   // let excFunc=(x,y)=>currentView[x][y]
//   for(let x=left;x<=right;x++){
//     for(let y=top;y<=bottom;y++){
//       if(exists(normalise({x,y}))){
//         let levels=[currentWorld]
//         let w=currentWorld
//         while(world[w][x][y-currentWorld+w]&&world[w][x][y-currentWorld+w].terrain==='air'){
//           levels.push(--w)
//         }
//         levels.reverse()
//         levels.forEach((l,i)=>{
//           let h=world[l][x][y-levels.length+i+1]
//           // let exc=getExclusions(x,y,excFunc,1)
//           let exc=world[currentWorld][x][y].blocking.includes('b')&&world[currentWorld][x][y].blocking.includes('r')&&currentView[x][y+1]
//           if(h){
//             if(exc||(currentView[x]&&currentView[x][y])||
//                 (h.seen&&!firstPerson)||omniscient){
//               drawQuarter(terrain({x,y,z:l}).pic,0,0,x,y)
//             }
//           }
//
//         })
//
//       }
//     }
//   }
// }
//



// const shadow=()=>{
//   ctx.fillStyle=shade[currentWorld].color||'#111111'
//   ctx.globalAlpha=shade[currentWorld].amount
//   ctx.fillRect(0,0,screenwidth,screenheight)
// }
