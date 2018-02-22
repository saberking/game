const acidSplash = new Spell({
  type:'chemistry',
  effect: [{score: str, amount: -3, type: norm}],
  name: 'acidSplash',
  targetType: 'enemy',
  jobs:['wizard'],
  damageType:'physical',
})

const fireball=new Spell({
  type:'chemistry',
  targetType:'enemy',
  targets:'area',
  name:'fireball',
  jobs:['wizard'],
  damageType:'physical',
  effect:[{score:str,amount:-3,type:norm},{score:'fire',amount:4,type:temp}],
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
  },
  level:10
})

const blockage = new Spell({
  type:'chemistry',
  targetType:'enemy',
  targets:'area',
  name:'blockage',
  jobs:['wizard'],
  damageType:'magic',
  effect:[{score:str,amount:-2,type:'norm'}],
  level:15
})
