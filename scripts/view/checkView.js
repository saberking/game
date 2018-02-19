let currentView=[]

const getVisibleCreatures=()=>{
  visibleCreatures=[]
  creatures.forEach(c=>{
    if(isCreatureVisible(c)){
      visibleCreatures.push(c)
    }
  })
}
let  lastPositions=[]

const samePositions=()=>lastPositions.length===controlled.length&&
    !lastPositions.find((l,i)=>!controlled[i]||l.x!==controlled[i].x||l.y!==controlled[i].y||(l.unconscious!==(controlled[i].status.status==='unconscious')))
const updatePositions=()=>controlled.forEach((c,i)=>lastPositions[i]={x:c.x,y:c.y,unconscious:c.status.status==='unconscious'})
const checkView=(force=false)=>{
  if(!force&&samePositions()){
    return
  }
  updatePositions()
  //console.log('updated')
  let filtered=controlled.filter(c => c.status.status==='active'&&c.z===currentWorld)
  let top=minheight[currentWorld]
  let bottom=maxheight[currentWorld]
  let left=minwidth[currentWorld]
  let right=maxwidth[currentWorld]
//console.log(filtered,controlled,currentWorld)
  for(let x=left;x<=right;x++){
    currentView[x]=[]
    for(let y=top;y<=bottom;y++){
      currentView[x][y]=hexVisibility(x,y,filtered)
      if(currentView[x][y]){
        world[currentWorld][x][y].seen=true
        for(let i=currentWorld;world[i][x][y-currentWorld+i].terrain==='air';i--){
          world[i-1][x][y-currentWorld+i-1].seen=true
        }
      }
    }
  }
  lastCheck=Date.now()
}
const resetView=()=>{
  for(let i =minwidth[currentWorld];i<=maxwidth[currentWorld];i++){
    currentView[i]=[]
  }
  lastCheck=0
}
