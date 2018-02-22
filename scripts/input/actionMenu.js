let actions=[]
actions.finish=id=>{
  let c=creatures.find(c=>c.id===id)
  skip(c)
}
actions.fight=(id)=>makeHostile(creatures.find(c=>c.id===id))
actions.attack=id=>canAttack(id)&&canAttack(id)()

actions.carry=id=>carry(id)
actions.stats=(id)=>openStatsMenu(creatures.find(c=>c.id===id))
actions.talk=id=>talk(creatures.find(c=>c.id===id))
actions.shop=id=>shop(creatures.find(c=>c.id===id))
const initActions=()=>spells.forEach(s=>actions[s.name]=()=>castSpell(s))
initEvents.push(initActions)
const creatureAt=({x,y})=>{
  let normal=normalise({x,y})
  return creatures.find(c=>c.x===normal.x&&c.y===normal.y&&c.z===currentWorld&&!c.carried)
}

const inside=(c,z)=>{
  return c.z===z.z&&c.x>=z.left&&c.x<=z.right&&c.y>=z.top&&c.y<=z.bottom
}

const getAvailableCreatureActions = (c) => {
  if(!selected)return []
  let availableActions = []
  availableActions.push('stats')
  if(isCreatureVisible(c)){
    if(c.faction!==selected.faction&&!combat){
      if(!c.hostileRange){
        c.chat&&availableActions.push('talk')
        if(c.trader)availableActions.push('shop')
      }
      availableActions.push('fight')
    }
    if(combat&&selected.status.magic>0)availableActions=availableActions.concat(selected.status.spells.filter(s=>s.targets==='single').map(s=>s.name))
    if(canAttack(c.id))availableActions.push('attack')
    if(selected&&c.faction===selected.faction&&c.status.status!=='active')availableActions.push('carry')

  }
  if(selected&&selected.id===c.id){
    availableActions=availableActions.concat(getAvailableSpells())
    if(combat){
      availableActions=availableActions.concat(['wait'])
    }
  }
  return availableActions
}

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
        if(!route)possibleActions=possibleActions.filter(a=>a.action==='stats'||a.action==='fight'||a.action==='attack')
    }
    let defaultEvent=(a,route)=>{
      if(typeof(actions[a.action])!=='function')throw new Error()
      if(!route||a.action==='fight'||a.action==='stats'||a.action==='attack')
        return ()=>actions[a.action](a.id)
      return ()=>startLongMove(route,selected,()=>{actions[a.action](a.id)})
    }
    // if(leftClick){
    //   let talkAction=possibleActions.find(a=>a.action==='talk')
    //   if(talkAction){
    //     defaultEvent(talkAction,route)()
    //     return true
    //   }
    //   let shopAction=possibleActions.find(p=>p.action==='shop')
    //   if(shopAction){
    //     defaultEvent(shopAction,route)()
    //     console.log('shop',shopAction)
    //     return true
    //   }
    //   let searchAction=possibleActions.find(p=>p.action==='search')
    //   if(searchAction){
    //     defaultEvent(searchAction,route)()
    //     return true
    //   }
    // }

    if(!possibleActions.length)return
    // route&&isEmpty(normalise({x,y}))&&possibleActions.push({action:'move',id:{x,y}})
    const menu = popup('menu', zoomLevel*width*x-screenPos.x,zoomLevel*height*(y)-screenPos.y)
    possibleActions.forEach(a => {
      const row = document.createElement('button')
      row.innerHTML=a.action
      row.id=a.action
      menu.appendChild(row)
      row.onclick=()=>{closeMenu();defaultEvent(a,route)}
    })
    return true
  }
}
