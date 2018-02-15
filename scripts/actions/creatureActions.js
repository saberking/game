var selectCharacter=c=>{
  c.catchupRoute=null
  refuseInput=!c.controlled
  selected=c
  showHealth()
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
actions.finish=id=>finished(creatures.find(c=>c.id===id))
const makeHostile=b=>{
  // if(players===2&&b.faction>=10&&!b.hostileRange)b.faction=currentFaction===1?2:1
  if(b.faction!==1&&!b.hostileRange){
    b.hostileRange=daytimeLos
    creatures.filter(v=>v.faction===b.faction&&v.z===b.z).forEach(v=>v.hostileRange=daytimeLos)
  }
}
actions.fight=(id)=>makeHostile(creatures.find(c=>c.id===id))
const attack=({x,y})=>{
  let c=creatureAt({x,y})
  if(!c||!c.hostileRange||c.effects.find(e=>e.score==='invisibility'))return
  if(!selected||!stillToMove||!stillToMove.length||!stillToMove[0].controlled)return
  if(combat){
    const range = distance(c,selected)
    if(!c.controlled){
      if (range === 1 && selected.weapon.melee) {
        meleeAttackAction(selected, c)
        return true
      }
      if(!selected.weapon)console.log(selected)
      const sufficientAmmo=selected.weapon.subtype==='throwing'||
        selected.weapon.ammo.find(a=>selected.shield&&a===selected.shield.subtype)
      if (selected.weapon.ranged && range > 1&&sufficientAmmo) {
        rangedAttackAction(selected, c)
          return true
      }
    }
  }
}
const carry=(id)=>{
  creatures.find(c=>c.id===id).carried=true
}
actions.carry=carry
actions.stats=(id)=>openStatsMenu(creatures.find(c=>c.id===id))
actions.talk=id=>talk(creatures.find(c=>c.id===id))
actions.shop=id=>shop(creatures.find(c=>c.id===id))
