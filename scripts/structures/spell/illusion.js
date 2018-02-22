const terror = new Spell({
  type:'illusion',
  effect: [{score: afraid, amount: 4, type: temp}],
  name: 'terror',
  targetType: 'enemy',
  jobs:['wizard','psionic'],
  damageType:'magic',
  level:3
})
// const invisibility=new Spell({
//   type:'illusion',
//   name:'invisibility',
//   jobs:['thief'],
//   targets:'self',
//   targetType:'friend',
//   ap:3,
//   event:caster=>{
//     const spell=spells.find(s=>s.name==='invisibility')
//     spellHighlight(spell,caster,caster)
//     addMessage(caster.display+' casts invisibility!')
//     const attackStrength=spellAttackStrength(caster,spell)
//     const points=round(attackStrength*2/20)
//     enactEffect({score:'invisibility',amount:points,type:temp})(caster)
//     return true
//   },
//   level:3
// })
// const steelToeCap=new Spell({
//   type:'chemistry',
//   name:'steelToeCap',
//   jobs:['fighter'],
//   targetType:'self',
//   event:(caster)=>{
//     const spell=spells.find(s=>s.name==='steelToeCap')
//     spellHighlight(spell,caster,caster)
//     addMessage(caster.display+' puts on his steel toe cap boots!')
//     const attackStrength=spellAttackStrength(caster,spell)
//     const power=round(attackStrength*7/20)
//     caster.nextAttack={
//       bonus:power,type:'melee',event:(target)=>{
//         let vec={}
//         vec.x=target.x-caster.x
//         vec.y=target.y-caster.y
//         let done=false, i=1
//         let endDestination={x:target.x,y:target.y,z:target.z}
//         while(i<power){
//           if(adjacentMovePossible(endDestination,{x:endDestination.x+vec.x,y:endDestination.y+vec.y,z:target.z})){
//             endDestination.x+=vec.x
//             endDestination.y+=vec.y
//           }
//           i++
//         }
//         moveCreatureTo(target,endDestination)
//       }
//     }
//     return true
//   }
// })
