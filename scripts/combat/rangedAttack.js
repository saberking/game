const rangedAttackAction=(a,b)=>{
  // if(distance(a,b)<=1)return
  // if(a.thisTurn&&a.thisTurn.action==='ranged'){
  //   a.status.currentAp+=min(a.weapon.ap,a.thisTurn.ap)
  //   a.thisTurn={}
  // }
  // if(a.status.currentAp>=a.weapon.ap){
    rangedAttackEvent(a,b)
  // }else{
  //   if(a.controlled)finished(a)
  //   else ready(a)
  // }
  return true
}
const reduceAmmo=c=>{
  c.shield.quantity--
  if(c.shield.quantity===0)c.shield=null
}
const rangedSkillBonus=  (a)=>{
  let arr=[]
  for(let skill in rangedSkills){
    if(a.weapon.subtype!==skill)arr.push(a.status[skill])
  }
  return rss(arr)/3+a.status[a.weapon.subtype]
}
const rangedAttackBonus=a=>floor(rangedSkillBonus(a)+a.status.rea+a.status.str/2)
const rangedDefenceBonus=b=>b.status.rea
const rangedAttackEvent=(a,b) => {
  if(!b.controlled)makeHostile(b)
  closeMenu()
  highlightHex('green', b)
  highlightHex('green', a)
  a.nextAttack=null
  a.thisAttack=null
  let pic=a.weapon.subtype==='throwing'?itemPics[a.weapon.picName]:itemPics[a.shield.picName]
  startAnimation(pic,a,b,400)
  console.log(a,b)
  let message=a.display + ' attacks ' + b.display+' with '+ a.weapon.name
  if(a.weapon.subtype==='throwing'){
    message=(a.display+ ' throws '+a.weapon.name+' at '+b.display)
  }
  addMessage(message)
  message='    - '
  const attackStrength = rangedAttackBonus(a)+ d20(a)
  const defenceStrength = rangedDefenceBonus(b)+distance(a,b)*distance(a,b)/a.weapon.range+b.armor[a.weapon.damageType]/a.weapon.penetration
  const hitStrength = attackStrength - defenceStrength
  if(typeof(hitStrength)!=='number')throw new Error()
  console.log(attackStrength,defenceStrength)
  let weaponEffect= a.weapon.subtype==='throwing'?a.weapon.ranged.effect:a.shield.ranged.effect
  a.practice[a.weapon.subtype]++
  if(a.weapon.subtype==='throwing'){
    let index=a.items.findIndex(i=>typeof(a.status[i.subtype])==='number')
    if(index===-1)a.weapon=a.unarmed
    else{
      a.weapon=a.items[index]
      a.items.splice(index,1)
    }

  }else{
    reduceAmmo(a)
  }
  if (hitStrength > 0){
    message+=resolveEffects(hitStrength,weaponEffect, b)
  }
  else message+=('missed')
  addMessage(message)
  b.checkStatus()
  endCombatAction(a)
}
