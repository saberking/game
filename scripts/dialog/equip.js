const canEquip=(target,item)=>{
  // if(!item.jobs.find(j=>j===target.job))return
  const slot=slots.find(s=>s===item.type)
  if(slot&&(!target[slot]||target[slot].id!==item.id)){
    if(!combat||(target.id===stillToMove[0].id)){
      if(item.type!=='weapon'||typeof(target.skills[item.subtype])=='number') {
        if(item.type!=='shield'||item.subtype==='shield'||target.weapon.ammo.find(a=>a===item.subtype)){
          return true
        }

      }
    }

  }
}
const canUnequip=(target,item)=>{
  const slot=slots.find(s=>s===item.type)
  if(slot&&target[slot]&&target[slot].id===item.id&&item.subtype!=='unarmed'){
    if(!combat||(target.id===stillToMove[0].id)){
      return true
    }
  }
}
const equipAp=(target,slot)=>{
  let ap=2
  if (target[slot]&&target[slot].subtype!=='unarmed')ap++
  if(slot==='weapon'&&target.shield&&target.shield.subtype!=='shield'){
    ap++
  }
  return ap
}
const unequipAp=(target,slot)=>{
  let ap=1
  if(slot==='weapon'&&target.shield&&target.shield.subtype!=='shield')ap++
  return ap
}
const equip=(e,c,item)=>{
  let ap=2
  e.preventDefault()
  e.stopPropagation()
  closeMenu()
  closeDialog2()
  if(item.type==='weapon'&&c.weapon.ranged)unequip(e,c,'shield')
  if(c[item.type]&&c[item.type].subtype!=='unarmed') {
    c.items.push(c[item.type])
    ap++
  }
  c[item.type]=item
  c.items.splice(c.items.findIndex(i=>i.id===item.id),1)

  c.checkStatus()
  openStatsMenu(c)
  if(combat){
    // c.initiative+=apCost(c,ap)
    endCombatAction(c)
  }

  return true
}
const unequip=(e,target,slot)=>{
  e.preventDefault()
  e.stopPropagation()
  closeMenu()
  closeDialog2()
  if(target[slot]&&target[slot].subtype!=='unarmed'){
    target.items.push(target[slot])
    if(slot==='weapon'){
      if(target[slot].ranged){
        unequip(e,target,'shield')
      }
      target[slot]=target.unarmed
    }else{
      target[slot]=null
    }
    if(combat){
      target.status.initiative++
      endCombatAction(target)
    }
    target.checkStatus()
    openStatsMenu(target)
  }

}
