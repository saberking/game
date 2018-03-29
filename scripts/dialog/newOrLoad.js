const newOrLoad=()=>{
  // characterDesign()
  let dialog=document.getElementById('dialog')
  dialog.innerHTML=topLineBackground()+'<div id="nl"></div>'

  let btn1=document.createElement('div')
  btn1.appendChild(createButton2('New game',fsAndDesign))
  btn1.style.marginTop=100
  btn1.style.marginLeft=100
  let btn2=document.createElement('div')
  btn2.appendChild(createButton2('Load',fsAndLoad))
  btn2.style.marginTop=10
  btn2.style.marginLeft=100
  document.getElementById('nl').appendChild(btn1)
  document.getElementById('nl').appendChild(btn2)
  characterDesign()

}
const fsAndLoad=()=>{
  // goFullscreen()
  setTimeout(load)
}
const fsAndDesign=()=>{
  // goFullscreen()
  // cutscene(characterDesign)
  slideTo(0)
}
