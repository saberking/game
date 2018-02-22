const mousemove=(e)=>{
  let {screenX,screenY,clientX,clientY}=e
  if(clientX<12)scrollLeft=true
  else scrollLeft=false
  if(clientX>screenwidth-12)scrollRight=true
  else scrollRight=false
  if(clientY<12)scrollUp=true
  else scrollUp=false
  if(clientY>screenheight-12)scrollDown=true
  else scrollDown=false
}
var selectCharacterAt = function({coords}) {
  if(combat){
    return false
  }
  var character = controlled.find(c=>c.x===coords.x&&c.y===coords.y&&c.z===currentWorld&&c.status.status==='active')
  if (character){

    if(selected&&selected.id===character.id)selected.attract=true
    else {
      if(selected)selected.attract=false
      selectCharacter(character)
    }
    return true
  }
}
const context=e=>{
  e.preventDefault()
  e.stopPropagation()
}
let handleTime=0
var handle = function(event) {
  let start=Date.now()
  closeMenu()
  event.preventDefault()
  if(dialogOpen||refuseInput){
// console.log(refuseInput,stillToMove,selected,dialogOpen,stillToMove[0].controlled)
    return
  }
  if(combat){
    if(!stillToMove||!stillToMove[0]||!stillToMove[0].controlled||!selected)return
  }
  const coords =coordinates(event)
  if(coords.x<minwidth[currentWorld]||coords.x>maxwidth[currentWorld]||coords.y<=minheight[currentWorld]||coords.y>maxheight[currentWorld])return
  if(selectingTarget){
    let nor=normalise(coords)
    if(canSee(selected,nor)||selectingTarget.blind){
      if(selectingTarget.targets==='area'){
        onTargetSelect(normalise(coords))
        return
      }
      let target=creatureAt(nor)
      if(target&&!target.effects.find(e=>e.score==='invisibility')){
        onTargetSelect(target)
        return
      }
    }
    addMessage('invalid target!')
  }else{
    selectCharacterAt({coords:normalise(coords)})||
    attack(coords)||
    openActionMenu(coords,false)||
    movePC(normalise(coords))
  }
  handleTime+=Date.now()-start
}

var handleright = (e) =>{
  e.preventDefault()
  let start=Date.now()
  if(selectingTarget){
    selectingTarget=false
    showHealth()
    return
  }
  closeMenu()
  if(refuseInput||dialogOpen)return
  const coords =coordinates(e)

  openActionMenu(coords,false)
  handleTime+=Date.now()-start
}
