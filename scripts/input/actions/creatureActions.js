var selectCharacter=c=>{
  if(combat){
    if(!stillToMove||!stillToMove[0])return
    if(c.id!==stillToMove[0].id)return
    if(!c.controlled)aiTurn(c)
  }
  if(!selected||c.id!==selected.id){
    selected=c
    if(dialogType){
      if(dialogType.type==='shop') shop(dialogType.participant)
      if(dialogType.type==='stats') openStatsMenu(c)
    }


  }
  c.catchupRoute=null
  refuseInput=!c.controlled
  selected.attract=false
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
    if(combat&&selected.status.magic>0)availableActions=availableActions.concat(selected.spells.filter(s=>s.targets==='single').map(s=>s.name))
    if(canAttack(c.id))availableActions.push('attack')
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
  if(combat){
    return false
  }
  var character = controlled.find(c=>c.x===coords.x&&c.y===coords.y&&c.z===currentWorld&&c.status.status==='active')
  if (character){

    if(selected&&selected.id===character.id)selected.attract=true
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
const canAttack=(id)=>{
  let c=creatures.find(c=>c.id===id)
  if(!c||!c.hostileRange)return
  if(!selected||!stillToMove||!stillToMove.length||!stillToMove[0].controlled)return
  if(combat){
    const range = distance(c,selected)
    if(!c.controlled){
      if (range === 1 && selected.weapon.melee) {
        return ()=>meleeAttackAction(selected, c)
      }
      const sufficientAmmo=selected.weapon.subtype==='throwing'||
        selected.weapon.ammo.find(a=>selected.shield&&a===selected.shield.subtype)
      if (selected.weapon.ranged && range > 1&&sufficientAmmo) {
        return ()=>rangedAttackAction(selected, c)
      }
    }
  }
}
actions.attack=id=>canAttack(id)&&canAttack(id)()
const attack=coords=>{
  let c=creatureAt(normalise(coords))
  if(c){
    return actions.attack(c.id)
  }
}
const carry=(id)=>{
  creatures.find(c=>c.id===id).carried=true
}
actions.carry=carry
actions.stats=(id)=>openStatsMenu(creatures.find(c=>c.id===id))
actions.talk=id=>talk(creatures.find(c=>c.id===id))
actions.shop=id=>shop(creatures.find(c=>c.id===id))
