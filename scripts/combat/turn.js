let refuseInput=false

const startTurn=()=>{
  increaseDate(1)

  creatures=creatures.filter(c=>c.controlled||c.status.status==='active')
  let filtered=creatures.filter(c=>c.status.status==='active'&&c.z===currentWorld&&c.status.stamina>0)
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
  creatures.forEach(c=>c.engaged=false)
  stillToMove=[]
  fighting.forEach(h=>{
    if(h.initiative==='none'){
      h.initiative=max(1,round(random()*20/max(1,h.status.rea+2)))
      if(!h.controlled)addMessage('You spot a '+h.display+'!')
    }else{
      h.initiative--
      if(h.initiative<0) h.initiative=0
    }
    h.engaged=true
    if(!h.initiative)stillToMove.push(h)
    // h.status.currentAp=max(h.status.maxAp,min(
    //     h.status.maxAp+h.status.currentAp,h.status.maxAp+5))
  })
  // stillToMove.sort((a,b)=>b.initiative-a.initiative)
  nextCharacter()
}
const nextCharacter=()=>{
  stillToMove=stillToMove.filter(s=>s.status.status==='active'&&s.status.stamina>0)
  if(!stillToMove.length)startTurn()
  else{
    if(!checkConditions(stillToMove[0])){
      selectCharacter(stillToMove[0])
    }
  }
}
const endTurn=()=>setTimeout(startTurn,300)


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
  else nextCharacter()
}
