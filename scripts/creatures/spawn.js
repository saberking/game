const spawnCreature=(c,params)=>{
  if(!inhabit)return
  let cr= new Creature(Object.assign({},c,params,{items:(params.items||[]).concat(c.items||[]).map(i=>new Item(i))}))
  return cr
}
const spawnCreatureGroup=(c,params,count,route,group)=>{
  if(!inhabit){
    console.log('no critters')
    return
  }
  let crs=[]
  creatures=creatures.filter(cr=>cr.group!==group||cr.z!==params.z)
  let same=creatures.filter(cr=>cr.name===c.name)
  if(same.length){
    console.log(group,params,same)
    throw new Error()
  }
  let leader=spawnCreature(c,Object.assign({},params,{route,group}))
  crs.push(leader)
  let adjacent=adjacentHexes(leader,2)
  for(let i =1;i<count;i++){
    let hex=adjacent.find(isEmpty)
    if(hex)
    crs.push(spawnCreature(c,Object.assign({},params,{x:hex.x,y:hex.y,route,group})))
    else {
      console.log('creature prblem', c, leader)
    }
  }
  return crs
}
const addCreatureGroup=(c,params,count,route=null,equipment={})=>{
  if(!creatureGroups[params.z])creatureGroups[params.z]=[]
  let group=creatureGroups[params.z].length
  creatureGroups[params.z].push(()=>{
    console.log('creaturegroup')
    if(creatures.find(cr=>cr.group===group&&visibleCreatures&&visibleCreatures.find(v=>v.id===cr.id)))return
    let creatureGroup=spawnCreatureGroup(c,params,count,route,group)
    slots.forEach(sl=>{
      if(equipment[sl]){
        equipment[sl].forEach((e,i)=>{
          if(e&&creatureGroup[i]){
            creatureGroup[i][sl]= new Item(e)
          }
        })
      }
    })
    }
  )
}
const spawnCreatures=()=>{
  console.log(creatureGroups)
  // creatures=creatures.filter(c=>typeof(c.group)!=='number')
  creatureGroups.forEach(worldgroup=>{
    if(worldgroup){
      worldgroup.forEach(g=>g())
    }
  })
}
