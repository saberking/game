var selectCharacter=c=>{
  if(combat)return
  if(!selected||c.id!==selected.id){
    selected=c
    c.catchupRoute=null
    selected.attract=false
    showHealth()
  }
}
