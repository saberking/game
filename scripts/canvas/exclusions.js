
const findWallH=({x,y,z=currentWorld})=>{
  if(!exists(normalise({x,y,z})))return
  if(!world[z][x][y]){
    return
  }
  return world[z][x][y].blocking.includes('t')
}

let findhTime=0
let findcTime=0
const getExclusions=(x,y,func=(x,y)=>currentView[x][y],dist=1)=>{
  let exc=[]
  let start=Date.now()
  let w=findWallH({x,y:y+1})
  let w2
  if(dist==2)w2=findWallH({x,y:y+2})
  findhTime+=Date.now()-start

    exc=(w&&func(x,y+1))||(w2&&func(x,y+2))
  return exc

}
