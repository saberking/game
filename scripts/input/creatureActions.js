

const skip=c=>{
  addMessage(c.display+' waits...')
  finished(c)
}

const makeHostile=b=>{
  // if(players===2&&b.faction>=10&&!b.hostileRange)b.faction=currentFaction===1?2:1
  if(b.faction!==1&&!b.hostileRange){
    b.hostileRange=daytimeLos
    creatures.filter(v=>v.faction===b.faction&&v.z===b.z).forEach(v=>v.hostileRange=daytimeLos)
  }
}
const canAttack=(id)=>{
  let c=creatures.find(c=>c.id===id)
  if(!c||!c.hostileRange)return
  if(!selected||!stillToMove||!stillToMove.length||!stillToMove[0].controlled)return
  if(combat){
    const range = distance(c,selected)
    if(!c.controlled){
      if (range === 1 && selected.weapon.melee) {
        return ()=>meleeAttackAction(selected, c)
      }
      const sufficientAmmo=selected.weapon.subtype==='throwing'||
        selected.weapon.ammo.find(a=>selected.shield&&a===selected.shield.subtype)
      if (selected.weapon.ranged && range > 1&&sufficientAmmo) {
        return ()=>rangedAttackAction(selected, c)
      }
    }
  }
}
const attack=coords=>{
  let c=creatureAt(normalise(coords))
  if(c){
    return actions.attack(c.id)
  }
}
const carry=(id)=>{
  creatures.find(c=>c.id===id).carried=true
  if(combat)endCombatAction(selected)
}
