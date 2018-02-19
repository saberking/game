const caesium={
  type:'chemical',
  name:'caesium'
}
items.push(caesium)
const chlorine={
  type:'chemical',
  name:'chlorine'
}
const lead={
  type:'chemical',
  name:'lead'
}
const carbon ={
  type:'chemical',
  name:'carbon',
  picName:'lead'
}
const nitrogen={
  type:'chemical',
  name:'nitrogen',
  picName:'caesium'
}
const arsenic={
  type:'chemical',
  name:'arsenic',
  picName:'lead',
  poisonEffects:[{score:str,amount:-2,type:norm}]
}
const cyanide={
  type:'chemical',
  name:'cyanide',
  poisonEffects:[{score:dex,amount:-4,type:norm},{score:str,amount:-3,type:norm}],
  compound:{ing:['carbon','nitrogen'],diff:15,danger:10},
  picName:'chlorine'
}
const mix=(chem)=>{
  selected.practice.chemistry++
  selected.checkStatus()
  let index=selected.items.findIndex(i=>item.name===chem.compound.ing[0])
  selected.items.splice(index,1)
    let index2=selected.items.findIndex(i=>item.name===chem.compound.ing[1])
    selected.items.splice(index2,1)

  let score=d20()+selected.status.int*2+selected.status.chemistry
  if(score<chem.compound.danger){
    let mess='Experiment goes haywire - '
    chem.poisonEffects.forEach(e=>mess+=enactEffect(selected,e))
    addMessage(mess)
    selected.checkStatus()
  }else if(score<chem.compound.diff){
    addMessage('Experiment failed')
  }else{
    addMessage(selected.display+' created some '+chem.name+'!')
    selected.items.push(new Item(chem))
  }
}
