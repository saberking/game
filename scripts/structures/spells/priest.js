const heal = new Spell({
  type:'theology',
  name: 'heal',
  rangePen: 4,
  jobs:['priest','fighter'],
  targetType:'friend',
  effect:[{score:str,amount:5,type:'healing'}],
  castCondition:target=>{
    let pos=target.effects.find(e=>e.score===str&&e.amount<0&&e.type!=='perm')
    return pos
  },
  level:10
})
// const superglue=new Spell({
//   type:'chemistry',
//   name:'superglue',
//   jobs:['priest'],
//   targets:'single',
//   targetType:'enemy',
//   effect:[{score:spd,amount:-3,type:temp}],
//   rangePen:2,
//   damageType:'magic',
//   level:10
// })
const airStrike=new Spell({
  type:'theology',
  name:'airStrike',
  jobs:['priest','wizard'],
  targets:'single',
  targetType:'enemy',
  effect:[{score:str,amount:-2,type:norm}],
  rangePen:1,
  ap:5,
  damageType:'physical',
  level:15
})
const prayer = new Spell({
  type:'theology',
  name:'prayer',
  jobs:['priest'],
  targets:'self',
  event:(caster)=>{
    let spell=spells.find(s=>s.name==='prayer')
    addMessage(caster.display+' prays!')
    spellHighlight(spell,caster,caster)
    let attackStrength=spellAttackStrength(caster,spell)
    let stat=randomStat()
    while(stat===mag)stat=randomStat()
    let points=round(attackStrength/4)
    enactEffect({score:stat,amount:points,type:temp})(caster)
    return true
  },
  level:0
})
