

const meleeAttackAction=(a,b)=>{
  // if(a.thisTurn&&a.thisTurn.action==='melee'){
  //   a.status.currentAp+=min(a.thisTurn.ap,a.weapon.ap)
  //   a.thisTurn={}
  // }
  // if(a.status.currentAp>=a.weapon.ap){
    meleeAttackEvent(a,b)
  // }else{
  //   if(a.controlled)finished(a)
  //   else ready(a)
  // }
  return true
}
const meleeAttackBonus=a=>a.status.str+a.status.rea+floor(meleeSkillBonus(a))

const meleeSkillBonus=  (a)=>{
  let arr=[]
  for(let skill in meleeSkills){
    if(a.weapon.subtype!==skill)arr.push(a.status[skill])
  }
  return rss(arr)/3+a.status[a.weapon.subtype]
}
const meleeDefenceBonus=b=>floor(b.weapon.melee?meleeSkillBonus(b)/2:0)+b.status.rea
const meleeAttackEvent = (a, b) => {
  if(!b.controlled)makeHostile(b)
  closeMenu()
  highlightHex('red', b)
  highlightHex('red', a)
  startAnimation(itemPics[a.weapon.picName],a,b,300)
  addMessage(a.display + ' attacks ' + b.display+' with '+ a.weapon.name)
  let message='   - '
  let bonus=a.nextAttack||a.thisAttack
  if(bonus&&!bonus.type.includes('melee'))bonus=null
  let attackStrength = meleeAttackBonus(a)+d20(a)
  if(bonus){
    attackStrength+=bonus.bonus
    addMessage(a.display+ ' is wearing steel toe caps!')
  }
  let defenceStrength = meleeDefenceBonus(b)+b.armor[a.weapon.damageType]/a.weapon.penetration
  const hitStrength = attackStrength - defenceStrength
  if (hitStrength > 0) {
    message+=resolveEffects(hitStrength, a.weapon.melee.effect, b)
    if(bonus){
      bonus.event(b)
    }
  } else {
    message+=('missed')
  }
  a.nextAttack=null
  a.thisAttack=null
  a.practice[a.weapon.subtype]++
  addMessage(message)
  b.checkStatus()
  endCombatAction(a)
}
