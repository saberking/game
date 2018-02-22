
let deathTriggers={}
let deadGoblinCount=0
deathTriggers.goblin=()=>{
  deadGoblinCount++
  if(deadGoblinCount>=4) {
      addMessage('You have defeated the goblins!')
      info('You search the goblins but fail to find anything giving'+
        ' a clue as to how you got here. This does not seem the safest place so you think you should push on.')
  }
}
deathTriggers.dummy=(d)=>{
  let t=creatures.find(c=>c.name==='tim')
  if(t){
    t.chat.state=2
    moveCreatureTo(creatures.find(c=>c.name==='tim'),{x:42,y:18})
  }
}
// deathTriggers.mayor=()=>talkEvent.primeCoach()
// deathTriggers.evilWizardKing=()=>{
//   if(!events.find(e=>e==='evilWizardKing')){
//     events.push('evilWizardKing')
//     savedDestinations.push(9)
//     info('City unlocked!')
//   }
// }

const talkEvent={
  dummy:()=>{
      spawnCreature(dummy,{x:34,y:24,z:5})
  },
  primeCoach:()=>{
    if(!events.find(e=>e==='primeCoach')){
      events.push('primeCoach')
      addCoach(19,38,5)
      refreshConstructs()
    }
  },
  chess:()=>{
    startGame()
  }
}
