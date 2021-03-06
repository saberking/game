
const aiTurn=()=>{
  let c=stillToMove[0]
  if(c.controlled)throw new Error()
  if(c.moving){
    setTimeout(()=>aiTurn(c),250)
    return
  }
  // if(c.status.currentAp<2){
  //   setTimeout(()=>finished(c),400)
  //   return
  // }
  if(checkConditions(c)){
    return
  }
  const closest = controlled.filter(co=>
      co.status.status==='active'&&!co.effects.find(e=>e.score==='invisibility')
    ).sort((a,b)=>distance(a,c)-distance(b,c))
  let target=closest.find(cl=>canSee(c,cl))||closest[0]
  if(!target){
    console.log('no target')
    finished(c)
    return
  }
  if(aiCastSpell(c)){
    return
  }
  if(canSee(c,target)&&AIAttack(c, target)){
    return
  }
  console.log('cant attack')
  if(c.weapon.ranged&&distance(c,target)===1){
    switchWeapons(c)
    return
  }
  console.log('out of range')
  if(singleMoveToward(c, target)){
    return
  }
  finished(c)
}

const aiCastSpell=(a)=>{
  let done=false
  if(a.status.spells.length&&a.status.mag>0){
    for(let i = 0;i<a.status.spells.length&&!done;i++){
      const spell=spells.find(s=>s.name===a.status.spells[i])
      done=castSpell(spell,a)
    }
  }
  return done
}

const AIAttack = (a, b) => {
  const dist=distance(a,b)
  let succ
  if(dist===1 && a.weapon.melee&&!blockedByWall(a,b)){
    meleeAttackAction(a,b)
    succ= true
  }else if(dist>1 &&a.weapon.ranged&&a.weapon.range*7>=dist*dist&&
      (a.weapon.subtype==='throwing'||
            (a.shield&&a.weapon.ammo.find(am=>am===a.shield.subtype))
      )) {
    rangedAttackAction(a, b)
    succ= true
  }
  return succ
}

const switchWeapons=c=>{
  if(c.weapon.ranged){
    let mel=c.items.find(i=>i.melee&&typeof(c.skills[i.subtype])==='number')
    if(!mel)mel=c.unarmed
    c.items.push(c.weapon)
    if(c.shield){
      c.items.push(c.shield)
      c.shield=null
    }
    c.weapon=mel
    let index=c.items.findIndex(i=>i.id===mel.id)
    if(index!==-1) c.items.splice(index,1)
    endCombatAction(c)
    return true
  }else{
    // let ran=c.items.findIndex(i=>i.ranged)
    // if(ran!==-1){
    //   c.items.push(c.weapon)
    //   c.weapon=c.items[ran]
    //   c.items.splice(ran,1)
    //   return true
    // }
  }
}
