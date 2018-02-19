const spells = []
const magicSchools=['sorcery','illusion','healing','divinity']

class Spell {
  constructor({
    type,
    effect,
    targetType='enemy',
    targets='single',
    name,
    rangePen=0,
    cost = 1,
    level = 1,
    jobs,
    ap=4,
    damageType='magic',
    penetration=4,
    event,
    castCondition=target=>true
  }) {
    this.damageType=damageType
    this.penetration=penetration
    this.type=type
    this.effect=effect
    this.targetType=targetType
    this.targets=targets
    this.id=spells.length
    this.name=name
    this.rangePen=rangePen
    this.cost=cost
    this.level = level
    this.jobs=jobs
    this.ap=ap
    this.castCondition=castCondition
    this.event=event
    if(!this.event)this.event=(caster,target)=>defaultSpellEvent(this,caster,target)
    spells.push(this)
  }
}
const useResources=(caster,s)=>{
  enactEffect({amount:-1,score:mag,type:norm})(caster)
  caster.practice[s.type]++
  if(combat){

    caster.initiative+=apCost(caster,s.ap)
    endCombatAction(caster)
  }
  caster.checkStatus()
  selectingTarget=false
}


const castSpell=(sp,caster=selected)=>{
  let s=typeof(sp)==='string'?spells.find(spel=>spel.name===sp):sp
  // if(combat&&caster.thisTurn&&caster.thisTurn.action===s.name){
  //   caster.status.currentAp+=caster.thisTurn.ap
  //   caster.thisTurn=null
  // }
  // if(combat&&caster.status.currentAp<s.ap){
  //   console.log('lowap')
  //   // caster.nextTurn={action:s.name,ap:caster.status.currentAp}
  //   // caster.controlled&&finished(caster)
  //   return
  // }
  if(s.targetType==='none'||s.targetType==='self'){
    if(s.event(caster,caster)){
      useResources(caster,s)
      return true
    }
  } else if(caster.controlled){
    addMessage('Please select a target')
    selectingTarget=s
    onTargetSelect=(target)=>{if(s.event(caster,target))useResources(caster,s)
    else addMessage('invalid target!!!!!!')}
    showHealth()
  }else{
      let targets=[]

      if(s.targetType==='enemy')
        targets=creatures.filter(c=>c.z===currentWorld&&c.faction==1&&c.status.status==='active'&&canSee(caster,c))
      else if(s.targetType==='friend')
        targets=creatures.filter(c=>c.z===currentWorld&&c.faction===10&&canSee(caster,c))
      let closest=targets.sort((a,b)=>distance(a,caster)-distance(b,caster))[0]
      if(closest&&s.event(caster,closest)){
        useResources(caster,s)
        return true
      }
  }
}
const spellHighlight=(s,a,b)=>{
  closeMenu()
  highlightHex('yellow', b)
  highlightHex('yellow', a)
}

const defaultSpellEvent = (s,a,b)=>{
  if(!s.castCondition(b))return
  const attackStrength = spellAttackStrength(a,s)
  spellHighlight(s,a,b)
  if(s.targets==='single'){
    if(a.controlled&&!b.controlled)makeHostile(b)
    addMessage(a.display + ' casts '+s.name+' at '+b.display +' - ')
    let defenceStrength = spellDefenceStrength(a,b,s)
    if(typeof(attackStrength)!=='number'||typeof(defenceStrength)!=='number'){
      console.log(attackStrength,defenceStrength)
      throw new Error()
    }
    const hitStrength =attackStrength  -defenceStrength
    let message='   - '

    if (hitStrength > 0) {
      message+=resolveEffects(hitStrength, s.effect, b)
    }
    else message+=('no effect!')
    addMessage(message)
    b.checkStatus()
    return true
  }else if(s.targets==='area'){
    addMessage(a.display+' casts '+s.name+'!')
    const mainHit = creatureAt(b)
    if(mainHit){
      const defenceStrength=spellDefenceStrength(a,mainHit,s)
      addMessage(resolveEffects(attackStrength-defenceStrength,s.effect,mainHit))
      mainHit.checkStatus()
    }
    adjacentHexes(b).forEach(h=>{
      const hit = creatureAt(h)
      if(hit){
        const defenceStrength=spellDefenceStrength(a,hit,s)+6
        addMessage(resolveEffects((attackStrength-defenceStrength)/2,s.effect,hit))
        hit.checkStatus()
      }
    })
    return true
  }

}
const getAvailableSpells=(c=selected)=>c.status.spells.filter(s=>{
  let spell=spells.find(sp=>sp.name===s)
  if(c.status.mag>0){
    if(combat){
      return true
    }else{
      return spell.targetType!=='enemy'
    }
  }
})
const spellAttackStrength=(a,s)=>
  a.status.mag + a.level + a.status[s.type] +d20(a)//+ a.status.san/2
const spellDefenceStrength=(a,b,s)=>{
  let defenceStrength = distance(a,b)*s.rangePen
  if(typeof(defenceStrength)!=='number')  console.log(a,b,s)
  if(s.targetType === 'enemy'){
    if(s.damageType==='magic')defenceStrength += b.status.mag*4/s.penetration
    else defenceStrength+=b.armor[s.damageType]/s.penetration
    if(b.status[s.type])defenceStrength+=round(b.status[s.type]/2)
    defenceStrength+=b.status.divinity/3
  }
  return defenceStrength
}
