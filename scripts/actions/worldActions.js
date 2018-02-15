actions.sleep=()=>{
  if(combat&&players===1){
    addMessage('You can\'t sleep while fighting')
    return
  }else if (players===1){
    let last=selected
    let healer=creatures.filter(c=>c.controlled&&c.status.status==='active'&&typeof(c.status.medicine)==='number').
      sort((a,b)=>b.status.medicine-a.status.medicine)[0]
    creatures.forEach(c=>{
      if(c.status.status==='active'||c.carried){
        stats.forEach((s)=>{
          const strength=healer?d20()+healer.status.medicine:10
          const points=round(strength/10)
          healStat(points,s,c)
        })
        if(c.controlled&&c.id!==selected.id){
          position(c,last.x,last.y)
        }
        c.checkStatus()
      }

    })
    addMessage('You get some rest')
    increaseDate(8*60)
    startDate=date-floor(Date.now()/1000)
  }else{
    addMessage(selected.display+' goes to sleep')
    selected.status.status='asleep'
    let cr=selected
    turnTrigger.add(()=>{
      let indices=[]
      cr.effects.forEach((e,i)=>{
        if(e.type!=='perm'){
          indices.push(i)
        }
      })
      for(let i = indices.length-1;i>=0;i--)
        cr.effects.splice(indices[i],1)
      cr.status.status='active'
      cr.checkStatus()
    },currentTurn+5)
    finished(selected)
  }
}

// actions.defile=({x,y})=>{
//   if(random()>0.85){
//     let item=randomItem()
//     selected.items.push(item)
//     addMessage('You found a '+item.name)
//   }else if(random()>0.6){
//     addMessage('A zombie jumps out!')
//     zombies.push(new Creature(Object.assign({},zombieParams,{x,y,z:currentWorld})))
//   }else addMessage('You find a rotting corpse')
//   let index=world[currentWorld][x][y].actions.findIndex(a=>a==='defile')
//   world[currentWorld][x][y].actions.splice(index,1)
//   if(combat)finished(selected)
// }
// actions.openCoffin=(c)=>{
//   new Creature(Object.assign({},vampire,{hat:new Item(clothCap),x:c.zone.left,y:c.zone.top,z:c.zone.z}))
// }
actions.pullLever=()=>{
  if(!creatures.find(c=>c.name==='dummy'&&c.z===5)){
    console.log('bar')
    spawnCreature(dummy,{x:34,y:24,z:5})
  }
}
actions.move=(coords)=>movePC(normalise(coords))
actions.search=(id)=>{
  let c=constructs.find(c=>c.id===id)
  let items=c.items
  if(!items.length)addMessage('You find nothing of interest')
  items.forEach(i=>{
    addToInventory(selected||controlled.find(co=>co.status.status==='active'),i)
    addMessage('You got '+i.name+'!')

  })
  c.items=[]
  if(combat)finished(selected)
  searched.push(c.id)
}

actions.travel=(id)=>{
  openTravelDialog()
}
const travelTo=dest=>{
  console.log(dest)
  closeDialog()
  currentWorld=dest.z
  resetView()
  creatures.forEach(c=>{
    if(c.controlled){
      c.z=currentWorld
      const {x,y,z}=dest
      position(c,x,y,z)
      centreScreen()
    }
  })
}
actions.climb=(id)=>{
  travelTo(constructs.find(c=>c.id===id).dest)
}
actions.closeDoor=(id)=>{
  let c=constructs.find(co=>co.id===id)
  // if(isEmpty(normalise({x:c.zone.left,y:c.zone.top,z:c.zone.z}))){
    addDoorClose(c.zone.left,c.zone.top,c.zone.z)
    refreshConstructs()
    checkView(true)
  // }

}
actions.openDoor=(id)=>{
  let c=constructs.find(co=>co.id===id)

  addDoorOpen(c.zone.left,c.zone.top,c.zone.z)
  refreshConstructs()
  checkView(true)
}
