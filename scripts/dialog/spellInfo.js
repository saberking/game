const showSpellInfo=(event,spell)=>{
  if(typeof(spell)==='string')
  spell=spells.find(s=>s.name===spell)
  event.preventDefault()
  event.stopPropagation()
  document.getElementById('dialog2').innerHTML=
    '<div>'+spell.name+'</div>'+
    '<div>Type: '+spell.type+'</div>'+
    (spell.rangePen?'<div>Range modifier: '+spell.rangePen+'</div>':'')+
    '<div>classes:'+spell.jobs.join(', ')+'</div>'+
    '<div>AP: '+spell.ap+'</div>'+
    '<div onclick="closeDialog2()">Close</div>'
  setTimeout(openDialog2)
}
