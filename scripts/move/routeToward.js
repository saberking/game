let rtcount=0
let rttime=0
const routeToward=(c,target=selected,dist=2)=>{
  let start=Date.now()
  rtcount++
  let hexes=adjacentHexes(target,dist).filter(h=>combatMovePossible(target,h,c.faction)&&isEmpty(h)).sort((a,b)=>distance(a,target)-distance(b,target))
  if(!hexes.length){
      console.log('bblockes in')
      return
    }
  rttime+=Date.now()-start
    let poss=[]
    let current
    hexes.forEach((h,i)=>{
      if(!poss.length||distance(h,target)===current){
        current=distance(h,target)
          if(distance(h,target)<distance(c,target)){
            start=Date.now()
            // if(true){
            if(connected(target,h)){
              rttime+=Date.now()-start
              longCount++
              let route=longMove([c],h,(a,b)=>moveThrough(a,b,c.faction))
              if(route&&route!=='timeout')poss.push(route)
              start=Date.now()
            }else{
              rttime+=Date.now()-start
              start=Date.now()
            }
          }

      }


    })
    let route=poss.sort((a,b)=>a.length-b.length)[0]
  rttime+=Date.now()-start
  return route
}
