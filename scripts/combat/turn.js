let refuseInput=false

const startTurn=()=>{
  addMessage('.')
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
  increaseDate(1)
  nextCharacter()
}
const nextCharacter=()=>{
  while(stillToMove.length&&stillToMove[0].status.status!=='active'){
    console.log('inactive')
    stillToMove.splice(0,1)
  }
  if(!stillToMove.length)startTurn()
  else{
    if(stillToMove[0].controlled){
      if(checkConditions(stillToMove[0])){
        setTimeout(()=>finished(stillToMove[0]),1000)
      }else{
        selectCharacter(stillToMove[0])
      }
    }else {
      setTimeout(()=>aiTurn(stillToMove[0]),600)
    }
  }
}
const endTurn=()=>setTimeout(()=>{
    if(players>1){
      hideCanvas()
    }else{
      setTimeout(startTurn,200)
    }
  },100)

const enactRadiation=c=>{
  creatures.filter(cr=>c.z===cr.z&&distance(cr,c)<=4&&cr.id!==c.id).forEach(cr=>{
    if(cr.special.radiation){
      const mess=resolveEffects(d20()-distance(c,cr)*2+cr.special.radiation,[{score:str,amount:-2,type:norm}],c)
      addMessage(c.display+' is affected by radiation - '+mess)
      c.checkStatus()
    }
  })
}
const ready=(c)=>{
  if(c.status.currentAp>1)c.nextTurn={action:c.weapon.melee?'melee':'ranged',ap:min(c.weapon.ap-1,c.status.currentAp-1)}
  c.status.currentAp=max(0,min(1,c.status.currentAp))
}
const finished = (creature) => {
  selected=null
  if(!combat||!stillToMove)return
  const index = stillToMove.findIndex(c=>c.id===creature.id)
  refuseInput=true
  if(index){
    console.log('alreadyfinsihed',creature.name)
    // throw new Error()
    return
  }
  // ready(creature)
  stillToMove.splice(index, 1)
  const hostile=checkHostility(creatures)
  if(!hostile.length)endBattle()
  else nextCharacter()
}
