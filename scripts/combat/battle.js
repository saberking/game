let battleEndTime=0
var startBattle = () => {
  addMessage('Battle starts!')
  refuseInput=true
  combat=true
  date=startDate+floor(Date.now()/1000)
  creatures.forEach(c=>c.status.currentAp=0)
  currentTurn=0
  startTurn()
}

var endBattle=()=>{
  addMessage('----------Combat ends-----------')
  battleEndTime=Date.now()
  startDate=date-1*floor(Date.now()/1000)
  combat=false
  refuseInput=false
  creatures.forEach(c=>{
    c.nextTurn=null
    let indices=[]
    c.engaged=false
    c.initiative=0
    c.checkStatus()
  })
  selectCharacter(controlled.find(c=>c.status.status==='active'))
}
const apForAttack=(c)=>{
  let ap=c.status.currentAp
  if(c.thisTurn&&c.weapon[c.thisTurn.action])ap+=c.thisTurn.ap
  return ap>=c.weapon.ap
}
const checkHostility=()=>{
  if(!visibleCreatures||!visibleCreatures.length)getVisibleCreatures()
  let v=visibleCreatures
  let spotted=[]
  v.forEach(c=>{
    if(c.hostileRange&&c.z===currentWorld){
      let h=false
      creatures.filter(c2=>c2.controlled&&c2.status.status==='active').forEach(c2=>{
        if(!h&&distance(c,c2)<=c.hostileRange&&canSee(c2,c)){
          spotted.push(c)
          h=true
        }
      })
    }

  })
  return spotted
}
