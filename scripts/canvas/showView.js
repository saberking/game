
let excTime=0
const showView=()=>{
  let left=screenLeft(),right=screenRight(),top=screenTop(),bottom=screenBottom()
  // console.log(left,right,top,bottom)
  for(let x=left;x<=right;x++){
    for(let y=top-1;y<=bottom;y++){
      if(exists(normalise({x,y}))&&(world[currentWorld][x][y].seen||(world[currentWorld][x][y+1]&&world[currentWorld][x][y+1].seen))){
        let start=Date.now()
        let exc=getExclusions(x,y,(x,y)=>currentView[x][y],1)
        excTime+=Date.now()-start
        start=Date.now()
        ctx.globalAlpha=0
        if(!exc&&(!currentView[x]||!currentView[x][y])){
          ctx.globalAlpha=min(ctx.globalAlpha+outOfView,1)
        }
        if(world[currentWorld][x][y].shade){
          ctx.globalAlpha=min(1-(1-world[currentWorld][x][y].shade)*(1-ctx.globalAlpha),1)
        }
        if(world[currentWorld][x][y].terrain==='air')ctx.globalAlpha=min(1,ctx.globalAlpha+0.2)
        ctx.globalAlpha&&colorRect({x, y, color: 'black', size: 1})
      }
    }

  }
  ctx.globalAlpha=1
}
