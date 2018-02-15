const consume=(e,item,target)=>{
  context(e)
  if(item.iv&&!target.items.find(i=>i.name==='syringe')){
    addMessage('You need a syringe!')
    closeDialog()
  }else{
    target.items.splice(target.items.findIndex(i=>i.id===item.id),1);
    item.consumeEffect.forEach(e=>enactEffect(e)(target))
    target.checkStatus()
    closeMenu()
    openStatsMenu(target)
  }
}
