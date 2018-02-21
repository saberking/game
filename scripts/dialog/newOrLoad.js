const newOrLoad=()=>{
  // characterDesign()
  let dialog=document.getElementById('dialog')
  dialog.innerHTML=
  '<div style="position:absolute;top:200;left:'+round(screenwidth/3-200)+'" id="nl"></div>'
  let btn1=document.createElement('div')
  btn1.appendChild(createButton2('New game',fsAndDesign))

  let btn2=document.createElement('div')
  btn2.appendChild(createButton2('Load',fsAndLoad))
  btn2.style.marginTop=10
  document.getElementById('nl').appendChild(btn1)
  document.getElementById('nl').appendChild(btn2)
}
const fsAndLoad=()=>{
  // goFullscreen()
  setTimeout(load)
}
const fsAndDesign=()=>{
  // goFullscreen()
  // cutscene(characterDesign)
  // slideTo(0)
  closeDialog()
}
