const openChemistry=(e,c)=>{
  e.preventDefault()
  closeMenu()
  document.getElementById('dialog2').style.display='inline'
  document.getElementById('dialog2').innerHTML=''
  dialog2Open=true
  compounds.forEach(i=>{
    let poss=true
    i.compound.ing.forEach(ing=>{if(!c.items.find(it=>it.name===ing))poss=false})
    if(poss){
      const comp=document.createElement('div')
      comp.onclick=()=>mix(i)
      comp.innerHTML=i.name
      document.getElementById('dialog2').appendChild(comp)
    }
  })
  const close=document.createElement('div')
  close.innerHTML='Close'
  close.onclick=()=>closeDialog2()
  document.getElementById('dialog2').appendChild(close)
}
