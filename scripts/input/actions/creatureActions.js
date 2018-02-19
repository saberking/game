var selectCharacter=c=>{
  c.catchupRoute=null
  refuseInput=!c.controlled
  selected=c
  showHealth()
  if(!c.controlled)aiTurn(c)
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
    if(selected&&c.faction===selected.faction&&c.status.status!=='active')availableActions.push('carry')

  }
  if(selected&&selected.id===c.id){
    availableActions=availableActions.concat(getAvailableSpells())
    if(combat){
      availableActions=availableActions.concat(['finish'])
    }
  }
  return availableActions
}

var selectCharacterAt = function({coords}) {
  if(combat)return false
  var character = controlled.find(c=>c.x===coords.x&&c.y===coords.y&&c.z===currentWorld&&c.status.status==='active')
  if (character){
    if(selected&&selected.id===character.id&&!combat)selected.attract=true
    else {
      if(selected)selected.attract=false
      selectCharacter(character)
    }
    return true
  }
}
const skip=c=>{
  addMessage(c.display+' waits...')
  finished(c)
}
actions.finish=id=>{
  let c=creatures.find(c=>c.id===id)
  skip(c)
}

const makeHostile=b=>{
  // if(players===2&&b.faction>=10&&!b.hostileRange)b.faction=currentFaction===1?2:1
  if(b.faction!==1&&!b.hostileRange){
    b.hostileRange=daytimeLos
    creatures.filter(v=>v.faction===b.faction&&v.z===b.z).forEach(v=>v.hostileRange=daytimeLos)
  }
}
actions.fight=(id)=>makeHostile(creatures.find(c=>c.id===id))

const carry=(id)=>{
  creatures.find(c=>c.id===id).carried=true
}
actions.carry=carry
actions.stats=(id)=>openStatsMenu(creatures.find(c=>c.id===id))
actions.talk=id=>talk(creatures.find(c=>c.id===id))
actions.shop=id=>shop(creatures.find(c=>c.id===id))