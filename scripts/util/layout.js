const layout=()=>{
  // closeDialog()
  screenwidth=window.innerWidth
  screenheight=window.innerHeight
  // document.getElementById('border').style.width = screenwidth
  document.getElementById('can').width = screenwidth
  document.getElementById('can').style.width = screenwidth
  document.getElementById('can').height = screenheight
  document.getElementById('can').style.height = screenheight
  document.getElementById('offscreen').width = screenwidth+100
  document.getElementById('offscreen').style.width = screenwidth+100
  document.getElementById('offscreen').height = screenheight+100
  document.getElementById('offscreen').style.height = screenheight+100
  // document.getElementById('canvas2').width = screenwidth
  // document.getElementById('canvas2').style.width = screenwidth
  // document.getElementById('canvas2').height = screenheight
  // document.getElementById('canvas2').style.height = screenheight
  document.getElementById('dialog').style.height = screenheight
  document.getElementById('dialog').style.width =screenwidth
  document.getElementById('dialog').style.top = 0
  document.getElementById('dialog').style.left =0
  for(let i=0;i<noOfCharacters;i++){
    let e=document.getElementById('dialog_'+i)
    if(e)  {
      e.style.height = screenheight
      e.style.width =screenwidth
      e.style.left=(i+1)*screenwidth
    }
  }
  document.getElementById('message2').style.width=screenwidth*0.5
  document.getElementById('dialog2').style.width=screenwidth*0.5 - 50
  document.getElementById('dialog2').style.left=screenwidth*0.25
  document.getElementById('dialog2').style.top=screenheight*0.1
  document.getElementById('dialog2').style.height=screenheight*0.8-50
  lastZoomLevel=0
}
