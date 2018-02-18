var keydown=(key)=>{
  closeMenu()
  if(dialogOpen)return
    let dist=round(20*sqrt(zoomLevel))
    if(key.key=='ArrowDown')moveScreen(0,dist)
    if(key.key=='ArrowLeft')moveScreen(-dist,0)
    if(key.key=='ArrowRight')moveScreen(dist,0)
    if(key.key=='ArrowUp')moveScreen(0,-dist)
    if(key.key=='c'||key.key=='C'){
      centreScreen()
    }
    if(key.key==='v'||key.key==='V'){
      if(!dialogOpen){
        cutscene()
      }
    }
    if(key.key==='s'||key.key==='S'){
      console.log('save')
      save()
    }
    if(key.key==='l'||key.key==='L'){
      load()
    }
    if(key.key==='j'||key.key==='J'){
      showJournal()
    }
    if(key.key==='f'||key.key==='F'){goFullscreen()
    }
    if(!charactersToDesign.length){
      if(key.key==='Enter')
      if(combat&&stillToMove[0]&&stillToMove[0].controlled&&selected&&selected.controlled&&!refuseInput){
        skip(selected)
      }else         console.log('nooooo,s',selected)

      // if(key.key.toLowerCase()==='m'){
      //   if(document.getElementById('menu'))closeMenu()
      //   else openSpellMenu()
      // }
      if(key.key.toLowerCase()==='o'){
        if(dialogOpen)closeDialog()
        else if(selected)
        openStatsMenu(selected)
      }
      if(key.key===' '&&selected){
        if(combat){
        }else {
            let index=controlled.findIndex(c=>c.id===selected.id)
            selectCharacter(controlled[(index+1)%controlled.length])
            centreScreen()
        }
      }
    }
}
// const selectNextCharacter=()=>{
//   let index=stillToMove.findIndex(c=>c.id===selected.id)
//   if(index!==-1)selectCharacter(stillToMove[(index+1)%stillToMove.length])
// }
