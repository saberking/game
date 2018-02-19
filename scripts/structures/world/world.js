const minwidth=[]
const minheight=[]
const maxwidth = []
const maxheight=[]
const shade=[]
let worldNames=[]

let creatureGroups=[]
for(let i=0;i<30;i++){
  world[i]=[]
  los[i]=daytimeLos
  shade[i]={amount:0.2}
}

class Hex {
  constructor({
    seen,
    shade=0,
    blocking='',
    opacity=1,
    passable=true
  }){
    this.seen=seen
    this.shade=shade
    this.blocking=blocking
    this.opacity=opacity
    this.passable=passable
  }
}

const initWorld=()=>{
  for(let i=0;i<30;i++){
    creatureGroups[i]=[]
    fillWorld(i)
  }
  buildTown()
  buildCastle()
  buildCity()
  refreshConstructs()
  inhabit   &&spawnCreatures()
}

const resetWorld=(cb)=>{
  constructs=[]
  constructId=0
  events=[]
  continueDrawing=false
  setTimeout(()=>{
    initWorld()
    cb&&cb()
  },400)
}
