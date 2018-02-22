const newOrLoad=()=>{
  // characterDesign()
  let dialog=document.getElementById('dialog')
  dialog.innerHTML=
  '<div style="border-width:3;top:'+round(screenheight/2-300)+';left:'+round(screenwidth/2-485)+'" class="bg2 intro"id="nl"></div>'
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
}
const fsAndLoad=()=>{
  // goFullscreen()
  setTimeout(load)
}
const fsAndDesign=()=>{
  // goFullscreen()
  // cutscene(characterDesign)
  characterDesign()
  slideTo(0)
}
