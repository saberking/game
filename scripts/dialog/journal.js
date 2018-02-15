let journalEntries=[{
  text: 'Training complete! Your party is now at level 1. Congratulations!',
  img:'animation/king.png'
}]
const showJournal=()=>{
  let reverseOrder=journalEntries.slice().reverse()
  let html='<div style="font-size:32;margin-bottom:34">Journal</div>'
  reverseOrder.forEach(j=>{
    html+='<div><img height=64 width=64 style="height:64,width:64" src="'+j.img+'"/>'+j.text+'</div>'
  })
  info(html)
}
