const increaseDate=(amount=1)=>{
  for(let i=0;i<amount;i++){
    incrementDate()
  }
}
const incrementDate=()=>{
  date++
  timedEvents.trigger()
}
class TimedEvents{
  constructor(){
    this.events=[]
  }
  add({interval,event,name}) {
    this.events.push({interval,event})
  }
  remove(name){
    this.events=this.events.filter(a=>a.name!==name)
  }
  trigger(){
    this.events.map(e=>!(date%e.interval)&&e.event())
  }
}
const timedEvents=new TimedEvents
perform&&timedEvents.add({interval:5,event:()=>{
  console.log({dateTime,uTime,catchuptime,hextime,ccTime,vTime,handleTime})
  longTime=0
  longCount=0
  hextime=0
  catchuptime=0
  moveThroughTime=0
  clearTime=0
  checkTime=0
  worldTime=0
  highTime=0
  ccTime=0
  hostileTime=0
  dateTime=0
  vcTime=0
  uTime=0
  vTime=0
  aTime=0
  findhTime=0
  excTime=0
  cltime=0
  rectTime=0
  constructTime=0
  bucktime=0
  creattime=0
  handleTime=0
}})
timedEvents.add({interval:300,event:spawnCreatures})
timedEvents.add({interval:5,event:()=>creatures.forEach(c=>c.z===currentWorld&&reduceEffects(c))})
const reduceEffects=(c)=>{
  let indices=[]
  c.effects.forEach((e,i)=>{
    if(e.score==='fire'){
      enactEffect({amount:-1,score:str,type:norm})(c)
      addMessage(c.display+' got 1 fire damage from being on fire!')
    }
    if(e.type===temp){
      if(e.amount>0)e.amount--
      else e.amount++
      if (e.amount==0) {
        indices.push(i)
      }
    }
  })
  indices.reverse().forEach(i=>{
    c.effects.splice(i,1)
  })
  c.status.stamina++
  c.status.stamina=min(c.status.stamina,c.status.maxStamina)
  if(!c.immunities.find(i=>i==='radiation'))enactRadiation(c)
  c.checkStatus()
}
const enactRadiation=c=>{
  creatures.filter(cr=>c.z===cr.z&&distance(cr,c)<=4&&cr.id!==c.id).forEach(cr=>{
    if(cr.special.radiation){
      const mess=resolveEffects(d20()-distance(c,cr)*2+cr.special.radiation,[{score:str,amount:-2,type:norm}],c)
      addMessage(c.display+' is affected by radiation - '+mess)
      c.checkStatus()
    }
  })
}
