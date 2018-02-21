let refuseInput=false

const startTurn=()=>{
  timedEvents.increment()
  addMessage('--------------Start of turn----------')

  creatures=creatures.filter(c=>c.controlled||c.status.status==='active')
  let filtered=creatures.filter(c=>c.status.status==='active'&&c.z===currentWorld)
  // filtered.forEach(f=>{
  //   f.thisTurn=f.nextTurn
  //   f.nextTurn={}
  //   f.thisAttack=f.nextAttack
  //   f.nextAttack=null
  // })
  const hostile=checkHostility(filtered)
  if(!hostile.length){
    endBattle()
    return
  }
  let fighting=hostile.concat(filtered.filter(c=>c.controlled))
  creatures.forEach(c=>{c.engaged=false;c.hasMoved=false})
  stillToMove=[]
  fighting.forEach(f=>f.initiative=f.status.rea*3+d20(f))
  fighting=fighting.sort((a,b)=>b.initiative-a.initiative)
  let fighting2=fighting.slice().reverse()
  stillToMove=fighting.concat(fighting2)
  stillToMove.forEach(h=>{

    h.engaged=true
    // h.status.currentAp=max(h.status.maxAp,min(
    //     h.status.maxAp+h.status.currentAp,h.status.maxAp+5))
  })
  // stillToMove.sort((a,b)=>b.initiative-a.initiative)
  setTimeout(nextCharacter,500)
}
const nextCharacter=()=>{
  stillToMove=stillToMove.filter(s=>s.status.status==='active'&&!s.hasMoved)
  if(!stillToMove.length)endTurn()
  else{
    if(!checkConditions(stillToMove[0])){
      if(stillToMove[0].controlled){
        selected=stillToMove[0]
        refuseInput=false
        showHealth()
      }else{
        selected=null
        aiTurn()
      }
    }
  }
}
const endTurn=startTurn


// const ready=(c)=>{
//   if(c.status.currentAp>1)c.nextTurn={action:c.weapon.melee?'melee':'ranged',ap:min(c.weapon.ap-1,c.status.currentAp-1)}
//   c.status.currentAp=max(0,min(1,c.status.currentAp))
// }
const finished = (creature) => {
  selected=null
  if(!combat||!stillToMove)return
  const index = stillToMove.findIndex(c=>c.id===creature.id)
  refuseInput=true
  if(index){
    console.error('alreadyfinsihed',creature.name)
    return
  }
  stillToMove.splice(index, 1)
  const hostile=checkHostility(creatures)
  if(!hostile.length)endBattle()
  else setTimeout(nextCharacter,500)
}
