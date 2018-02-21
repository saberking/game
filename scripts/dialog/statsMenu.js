const openStatsMenu = (target)=>{
  const spinningHuman='<img src=assets/background/video_human2.gif style="position:absolute;right:0;top:0"/>'
  dialogType={type:'stats',participant:target}
  closeMenu()
  selectCharacter(target)
  closeDialog2()
  if(screenwidth<680){
    closeDialog()
    return
  }
    let statsText = '<div style="height:5"></div>'
    stats.forEach((stat,i) => statsText+=stat+': '+target.status[stat]+'/'+target.stats[stat]+' ')
    statsText=displayStats(target,0,true)
    let spellsText=''
    if(target.status.spells.length){
      spellsText+='<div style="margin-top:10;position:absolute;margin-top:100;left:800;margin-bottom:10;width:350">Spells: '
      target.status.spells.forEach(s=>spellsText+='<div style="width:350"oncontextmenu="showSpellInfo(event,\''+s+'\')"onclick="showSpellInfo(event,\''+s+'\')"> '+s+'</div>')
      spellsText+='</div>'
    }
    let skillsText='<div style="height:5"></div>'
    // Object.keys(target.skills).forEach(skill => {
    //   skillsText+='<span>'+skill+': '+target.status[skill]+'/'+target.skills[skill]+' </span>'
    // })
    // skillsText+='<div style="height:5"></div>'
    skillsText='<div style="position:absolute;left:400;top:150">'+displaySkills(target,0,true)+'</div>'
    let effectsText=''
    if(target.effects.length)effectsText+='<div>effects</div>'
    target.effects.forEach(e=>{
      effectsText+='<div>'+e.score+' '+e.amount+' '+e.type+'</div>'
    })
    let itemsText=''
    target.items.forEach(i=>{
      itemsText+='<img id="'+i.name+i.id+'" src="assets/items/'+i.picName+'.png"/>'
    })
    if(itemsText==='')itemsText='<div style="height:64"></div>'
    itemsText='<div style="width:650"><div>Items</div>'+itemsText+'</div>'
    let combatText='<div>Armor '+target.armor.physical+
    '</div><div>Attack +'+
      (target.weapon.ranged?rangedAttackBonus(target):meleeAttackBonus(target))+'</div'
    // let borderRight=equipSlot==='weapon'?340:equipSlot==='shield'?20:180
    // let borderTop=equipSlot==='hat'?20:equipSlot==='trousers'?200:equipSlot==='shoes'?330:80
    // let border='<img style="position:absolute;right:'+borderRight+';top:'+borderTop+'" src="./items/border.png"/>'
    let weaponPic='<img style="position:absolute;right:340;top:80" id="weapon" src="assets/items/'+target.weapon.picName+'.png"/>'
    let shieldPic=target.shield?'<img style="position:absolute;right:20;top:80" id="shield" src="assets/items/'+target.shield.picName+'.png"/>':''
    let hatPic=target.hat?'<img style="position:absolute;right:180;top:20" id="hat" src="assets/items/'+target.hat.picName+'.png"/>':''
    let topPic=target.top?'<img style="position:absolute;right:180;top:80" id="top" src="assets/items/'+target.top.picName+'.png"/>':''
    let trousersPic=target.trousers?'<img style="position:absolute;right:180;top:200" id="trousers" src="assets/items/'+target.trousers.picName+'.png"/>':''
    let shoesPic=target.shoes?'<img style="position:absolute;right:180;top:330" id="shoes" src="assets/items/'+target.shoes.picName+'.png"/>':''
    document.getElementById('dialog').innerHTML='<div style="min-height:100%;min-width:100%;font-size:26"class="bg2">'+'<div style="padding:20;">'+
    header(target)+
    spinningHuman+
    weaponPic+    shieldPic+
    hatPic+topPic+trousersPic+shoesPic+
    '<div style="padding-top:7;paddding-bottom:7;padding-left:19;padding-right:19;position:absolute;right:50;top:20;background-color:#888888;border-style=solid"onclick="closeDialog()">Close</div>'+

    '<div style="width:'+(screenwidth-470)+';font-size:28">'+
    '<div style="color:#111144">lvl '+target.level+(target.controlled?' <span style="margin-left:50">xp: '+target.xp+'</span>':'')+'</div>'+
    '<div>'+statsText+'</div>'+
    '<div>'+skillsText+'</div>'+
    '<div>'+spellsText+'</div>'+
    '<div style="position:absolute;left:1000;top:440">'+effectsText+'</div>'+
    '<div>Gold: '+target.gold+'</div>'+
    combatText+breaker+
        '<div style="margin-top:120">'+itemsText+'</div>'+
    '</div>'+
    // '<img style="position:absolute;top:420;right:0" src="assets/background/chemistry.png"id="chem"/>'+
    '</div></div>'

    // document.getElementById('chem').onclick=(e)=>openChemistry(e,target)
    slots.forEach(sl=>{
      if(target[sl]){
        document.getElementById(sl).onclick=(e)=>showItemStats(e,target[sl],target)
        if(target.controlled)document.getElementById(sl).oncontextmenu=(e)=>{openItemMenu(e,target[sl],target)}
      }
    })
    if(target.controlled){
      target.items.forEach((item,index)=>{
        document.getElementById(item.name+item.id).onclick=(e)=>showItemStats(e,item,target)
        document.getElementById(item.name+item.id).oncontextmenu=(e)=>openItemMenu(e,item,target)
      })
    }
    statContext()
    setTimeout(openDialog)
}
