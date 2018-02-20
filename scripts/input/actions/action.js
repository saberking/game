let actions=[]

const initActions=()=>spells.forEach(s=>actions[s.name]=()=>castSpell(s))
initEvents.push(initActions)

const actionRoute=({x,y})=>{
  if(!selected||combat)return
  if(selected.moving)return
  let targetY=world[currentWorld][x][y].blocking.includes('t')?y:y+1
  let route=routeToward(selected,normalise({x,y:targetY,z:currentWorld}),1)
  if(combat &&!stillToMove[0].controlled)return
  return route
}
const openActionMenu=({x,y},leftClick=true)=>{
  if(!world[currentWorld][x][y].seen||!selected||selected.moving)return
  let possibleActions=[]
  constructs.forEach(c=>{
    if(inside({x,y,z:currentWorld},c.zone)||(inside({x,y:y+1,z:currentWorld},c.zone)&&c.height)){
      possibleActions=possibleActions.concat(c.actions.map(a=>({action:a,id:c.id})))
    }
  })
  let c=creatureAt(normalise({x,y}))
  if(c&&isCreatureVisible(c))possibleActions=possibleActions.concat(getAvailableCreatureActions(c).map(a=>({action:a,id:c.id})))
  if(possibleActions.length){

    let route
    if(distance(selected,normalise({x,y}))>1||blockedByWall(selected,normalise({x,y}))){
        route=actionRoute(normalise({x,y}))
        if(!route)possibleActions=possibleActions.filter(a=>a.action==='stats'||a.action==='fight')
    }
    let defaultEvent=(a,route)=>{
                if(!route||a.action==='fight'||a.action==='stats')
                return ()=>actions[a.action](a.id)
                return ()=>startLongMove(route,selected,()=>{actions[a.action](a.id)})
    }
    if(leftClick){
      let talkAction=possibleActions.find(a=>a.action==='talk')
      if(talkAction){
        defaultEvent(talkAction,route)()
        return true
      }
      let shopAction=possibleActions.find(p=>p.action==='shop')
      if(shopAction){
        defaultEvent(shopAction,route)()
        console.log('shop',shopAction)
        return true
      }
      let searchAction=possibleActions.find(p=>p.action==='search')
      if(searchAction){
        defaultEvent(searchAction,route)()
        return true
      }
    }

    if(!possibleActions.length)return
    route&&isEmpty(normalise({x,y}))&&possibleActions.push({action:'move',id:{x,y}})
    openMenu(
      possibleActions.map(
        a=>{
          let event=defaultEvent(a,route)
          return {text:a.action,event}
        }
      ),
    {x,y})
    return true
  }
}
