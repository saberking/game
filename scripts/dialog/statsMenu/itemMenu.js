const openItemMenu=(e,item,target)=>{
  e.preventDefault()
  e.stopPropagation()
  closeMenu()
  const menu = popup('menu', e.clientX,e.clientY)
  if(item.subtype!=='unarmed'){
    creatures.forEach(c=>{
      if(c.id!==target.id&&c.z===currentWorld&&distance(c,target)<=2){
        const give =addButtonToMenu('give to '+c.display)
        give.onclick=()=>{
          addToInventory(c,item)
          // if(onGive[c.name]&&onGive[c.name][item.name])onGive[c.name][item.name]()
          target.items.splice(target.items.findIndex(i=>i.id===item.id),1);
          openStatsMenu(target)
        }
      }
    })
    const drop=addButtonToMenu('drop')
    drop.onclick=()=>{
      target.items.splice(target.items.findIndex(i=>i.id===item.id),1);
      openStatsMenu(target)
    }
    if(canUnequip(target,item)){
      const unequipButton=addButtonToMenu('unequip')
      unequipButton.onclick=(e)=>{
        unequip(e,target,item.type)
      }
    }
    if(item.type==='consumable'){
      const consumeButton=addButtonToMenu('consume')
      consumeButton.onclick=(e)=>consume(e,item,target)
    }
    if(item.type==='chemical'||item.type==='pathogen'){
      let needle
      let needleIndex=target.items.findIndex(i=>i.name==='syringe')
      if(needleIndex!==-1){
        const insert=addButtonToMenu('insert')
        insert.onclick=()=>{
          let needle=target.items[needleIndex]
          needle.quantity--
          if(needle.quantity==0)target.items.splice(needleIndex,1)
          const filled=new Item(syringe)
          filled.name=item.name+' syringe'
          filled.ranged={effect:item.poisonEffects}
          addToInventory(target,filled)
          closeMenu()
          openStatsMenu(target)
        }
      }
    }
    // if(item.type==='spellbook'){
    //   if(spells.find(s=>s.name===item.spells[0]).jobs.find(c=>c===target.job)){
    //     if(!target.spells.find(s=>s===item.spells[0])){
    //       const read=addButtonToMenu('read')
    //       read.onclick=()=>{
    //         closeMenu()
    //         target.spells.push(item.spells[0])
    //         target.items.splice(target.items.findIndex(i=>i.id===item.id),1)
    //         openStatsMenu(target)
    //       }
    //     }
    //   }
    // }
    if(target.controlled&&canEquip(target,item)){
          const equipButton=addButtonToMenu('equip')
          equipButton.onclick=e=>equip(e,target,item)
        }

  }

}
