
const singleHeal=(points,s,t,target)=>{
  let index=target.effects.findIndex(e => e.score === s && e.type === t&&e.amount<0)
  if(index!==-1){
    let effect=target.effects[index]
    if(effect.amount+points<0){
      effect.amount+=points
      return points
    }else{
      target.effects.splice(index,1)
      return -1*effect.amount
    }
  }
  return 0
}
const healStat=(points,score,target)=>{
  points-=singleHeal(points,score,norm,target)
  if(points)singleHeal(points,score,temp,target)
}
const enactEffect = ({amount, score, type}) => (target) => {
  if(type==='healing'){
    healStat(amount,score,target)
  }else{
    let index = target.effects.findIndex(e => e.score === score && e.type === type)
    let effect
    if(index>=0){
      effect=target.effects[index]
      effect.amount += amount
      if(effect.amount==0)target.effects.splice(index, 1)
    } else {
      target.effects.push({score, amount, type})
      effect=target.effects[target.effects.length-1]
    }
  }
}

const resolveEffects = (hitStrength, eff, target) => {
  let message=''
  if(hitStrength>0){
    let effects=eff.filter(e=>round(e.amount*hitStrength/20))
    effects.forEach((e,i) => {
      const amount=round(e.amount*hitStrength/20)
      if(amount) {
        if(e.score==='afraid')message+='afraid for '+amount+' turns!'
        else if(e.score==='fire')message+='on fire for '+amount+' turns!'
        else if(e.type==='healing'){
          message+='healed '+amount+' damage'
        }else if(amount<0){
          message+=-1*amount
          if(e.type!==norm)message+=' '+e.type
          if(e.score!=str)message+=' '+e.score
          message+=' damage'
        }else{
          message+='+'+amount
          if(e.type!==norm)message+=' '+e.type
          message+=' '+fullStats[e.score]
        }
        if(i!==effects.length-1)message+=', '
        enactEffect(Object.assign({},e,{amount}))(target)
      }
    })
  }
  if(message==='')message='no effect!'
  return message
}
