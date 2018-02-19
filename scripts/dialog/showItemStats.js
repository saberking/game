const showItemStats=(e,item,target)=>{
  e.preventDefault()
  e.stopPropagation()
  let html='<div>'+item.name+'</div>'+
  '<div>type: '+item.subtype+'</div>'+
  (item.jobs.length===4?'':'<div style="color:#111144">Classes: '+item.jobs.join(', ')+'</div>')+
  (item.quantity===1?'':'<div>quantity: '+item.quantity+'</div>')
  if(item.melee){
    html+='<div>melee</div>'
    item.melee.effect.forEach(effect=>{
      html+=displayEffect(effect)
    })
  }
  if(item.ranged){
    html+='<div>ranged</div>'
    if(item.ranged.effect){
      item.ranged.effect.forEach(effect=>{
        html+='<div>'+effect.score+' '+effect.amount+' '+effect.type+'</div>'
      })
    }
    if(item.type==='weapon')
    html+='<div>range penalty: '+item.rangePen+'</div>'
  }
  if(item.type==='weapon'){

    html+='<div>penetration: '+item.penetration+'</div>'
  }
  if(item.armor){
    html+='<div>armor: physical '+item.armor.physical+', light '+item.armor.light+'</div>'
  }
  document.getElementById('dialog2').innerHTML=html
  if(target&&target.controlled){
    const slot=slots.find(s=>s===item.type)
    let equipButton=document.createElement('div')
    equipButton.style.marginTop=5
    if(canEquip(target,item)){
      document.getElementById('dialog2').appendChild(equipButton)
      equipButton.appendChild(createButton2('Equip',e=>equip(e,target,item)))
    }
    if(canUnequip(target,item)){
      document.getElementById('dialog2').appendChild(equipButton)
      equipButton.appendChild(createButton2('Unequip',(e)=>unequip(e,target,slot)))
    }
    if(item.type==='consumable'&&item.jobs.find(j=>j===target.job)){
      document.getElementById('dialog2').appendChild(equipButton)
      equipButton.appendChild(createButton2('Consume',(e)=>consume(e,item,target)))
    }
  }
  const closeButton=document.createElement('div')

  closeButton.appendChild(createButton2('Close',closeDialog2))
  closeButton.style.marginTop=10
  document.getElementById('dialog2').appendChild(closeButton)
  setTimeout(openDialog2)
}
