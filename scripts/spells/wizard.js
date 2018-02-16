const magicMissile = new Spell({
  type:'sorcery',
  effect: [{score: str, amount: -3, type: norm}],
  name: 'magicMissile',
  targetType: 'enemy',
  rangePen: 2,
  jobs:['wizard'],
  damageType:'physical'
})

const terror = new Spell({
  type:'illusion',
  effect: [{score: afraid, amount: 4, type: temp}],
  name: 'terror',
  targetType: 'enemy',
  rangePen: 2,
  jobs:['wizard','psionic'],
  damageType:'magic'
})
const invisibility=new Spell({
  type:'illusion',
  name:'invisibility',
  jobs:['thief'],
  targetType:'self',
  targets:'self',
  ap:3,
  event:caster=>{
    const spell=spells.find(s=>s.name==='invisibility')
    spellHighlight(spell,caster,caster)
    addMessage(caster.display+' casts invisibility!')
    const attackStrength=spellAttackStrength(caster,spell)
    const points=round(attackStrength*2/20)
    enactEffect({score:'invisibility',amount:points,type:temp})(caster)
    return true
  }
})



const steelToeCap=new Spell({
  type:'illusion',
  name:'steelToeCap',
  jobs:['fighter'],
  targetType:'self',
  event:(caster)=>{
    const spell=spells.find(s=>s.name==='steelToeCap')
    spellHighlight(spell,caster,caster)
    addMessage(caster.display+' puts on his steel toe cap boots!')
    const attackStrength=spellAttackStrength(caster,spell)
    const power=round(attackStrength*7/20)
    caster.nextAttack={
      bonus:power,type:'melee',event:(target)=>{
        let vec={}
        vec.x=target.x-caster.x
        vec.y=target.y-caster.y
        let done=false, i=1
        let endDestination={x:target.x,y:target.y,z:target.z}
        while(i<power){
          if(adjacentMovePossible(endDestination,{x:endDestination.x+vec.x,y:endDestination.y+vec.y,z:target.z})){
            endDestination.x+=vec.x
            endDestination.y+=vec.y
          }
          i++
        }
        moveCreatureTo(target,endDestination)
      }
    }
    return true
  }
})



const fireball=new Spell({
  type:'sorcery',
  targetType:'enemy',
  targets:'area',
  name:'fireball',
  jobs:['wizard'],
  rangePen:3,
  damageType:'physical',
  event:(caster,target)=>{
    const spell=spells.find(s=>s.name==='fireball')
    spellHighlight(spell,caster,target)
    addMessage(caster.display+' casts fireball!')
    const attackStrength=spellAttackStrength(caster,spell)
    console.log(attackStrength)
    const mainHit = creatureAt(target)
    if(mainHit){
      const defenceStrength=spellDefenceStrength(caster,mainHit,spell)
      console.log(defenceStrength)
      addMessage(resolveEffects(attackStrength-defenceStrength,[{score:str,amount:-2,type:norm}],mainHit))
      mainHit.checkStatus()
    }
    adjacentHexes(target).slice(1).forEach(h=>{
      const hit = creatureAt(h)
      if(hit){
        const defenceStrength=spellDefenceStrength(caster,hit,spell)+6
        addMessage(resolveEffects(attackStrength-defenceStrength,[{score:str,amount:-2,type:norm}],hit))
        hit.checkStatus()
      }
    })
    return true
  }
})

const blockage = new Spell({
  type:'sorcery',
  targetType:'enemy',
  targets:'area',
  name:'blockage',
  jobs:['wizard'],
  damageType:'magic',
  effect:[{score:str,amount:-1,type:'norm'},{score:int,amount:-2,type:norm},
      {score:mag,amount:-2,type:norm},{score:luc,amount:-6,type:norm}],
  rangePen:3,
})
