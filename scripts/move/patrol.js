let linearRoute=(oneway,z)=>{
  let rtn=oneway.slice().reverse().slice(1)
  return {route:oneway.concat(rtn).map(a=>Object.assign({},a,{z})),leg:0}
}
const patrol=()=>{
  creatures.filter(c=>(c.z===currentWorld||c.z===currentWorld-1)&&!c.engaged).forEach(c=>{
    if(c.route){

      if(c.x===c.route.route[c.route.leg].x&&c.y===c.route.route[c.route.leg].y){
        c.route.leg++
        if(c.route.leg>=c.route.route.length)c.route.leg=0
      } else if(!c.moving){
        let hex=c.route.route[c.route.leg]
        catchupMove(c,hex)
      }
    // }else if(c.leader){
    //   const leader=creatures.find(cr=>cr.id===c.leader)
    //   if(leader&&!c.moving){
    //     if(!singleMoveToward(c,leader))singleMoveAway(c,leader)
    //   }
    }
  })
}
timedEvents.add({interval:1,event:patrol})
