const checkConditions = c=>{
  let s=false
  c.effects.forEach(e=>{
    if(e.score ===afraid){
      s=true
      // if(c.status.currentAp>1){
        const closest = creatures.filter(cr=>
          cr.status.status==='active'&&cr.faction!==c.faction&&canSee(c,cr))
          .sort((a,b)=>distance(a,c)-distance(b,c))
        if(closest[0]) {
          addMessage(c.display+' runs away!')
          singleMoveAway(c, closest[0])
        }else{
          addMessage(c.display+' cowers in fear!')
        }
      // }else {
      //   console.log('no ap to run away')
      // }
    }
  })
  return s
}
