// const bookBackground=o=>
//   '<img src="art/bookBackground.png" style="margin-left:-100;top:-'+
//   (1075-screenheight*0.75)+';position:absolute;opacity:'+o+'"/>'
const scroll=()=>''
let dialogType=null
const background=()=>{
  let html=''

  for(let i=0;i<10;i++)
    password.forEach(p=>html+='<div style="font-family:times;position:absolute;margin-left:'+(round(screen.width*random())-400)+';font-size:108;background-color:#888888;opacity:0.1;top:'+round(random()*screen.height-60)+'">'+p+'</div>')
  let ins=document.getElementById('ins')
  if(ins)ins.innerHTML=html
}
const removeBackground=()=>{
  let ins=  document.getElementById('ins')
  if(ins)ins.innerHTML=''
}
const topLineBackground=()=>    '<div class="bg2 intro"style="border-width:4;display:flex">'

const displayEffect=e=>'<div>'+e.score+' '+e.amount+' '+e.type+'</div>'
const info = (text,c,options=[],bg)=>{
  console.log(options)
  let html='<div style="min-height:100%"><div style="padding:20">'

  if(c&&c.pic.sprite)html+='<div><img src="assets/sprites/'+c.name+'.png"/>'+c.display+'</div>'
  html+='<div style="padding:50"  id="contents">'+text+'</div>'
  html+='<div style="position:absolute;top:50;right:100;border-style:solid;border-width:2" onclick="closeDialog()">Close</div>'
  options.forEach(o=>{
    html+='<div id="'+o.text+'">'+o.text+'</div>'
  })
  html+='</div></div>'
  dialog.innerHTML=html
  options.forEach(o=>document.getElementById(o.text).onclick=o.function)
  setTimeout(  openDialog)
}
const openDialog=()=>{
  dialogOpen=true;
  continueDrawing=false
  // slideTo(-1)
  document.getElementById('dialogContainer').style.display='inline-block'
  document.getElementById('message2').style.display='none'
  hideCanvas()
}
const closeDialog = (lp=true) => {showHealth();closeDialog2();removeClones()
dialogOpen=false;showCanvas();continueDrawing=true;
dialogType=null
lp&&restartLoop()
document.getElementById('dialogContainer').style.display='none'
document.getElementById('message2').style.display='inline-block'
slideTo(-1)
removeBackground()
}
const closeDialog2=()=>{closeMenu();document.getElementById('dialog2').style.display='none'
dialog2Open=false}
const openDialog2=()=>{
  closeMenu()
  document.getElementById('dialog2').style.display='inline'
  dialog2Open=true
}


const header = c=>  '<div style="height:100;width:80;overflow:hidden"><img src="assets/sprites/'+c.name+'.png"/></div><div style="position:absolute;top:80;left:120">'+c.display+'</div>'+
  '<div>----------------------------------------------</div>'
  const doubleColumn=(col1,col2,id,offset=30)=>
  '<div style="position:relative"'+(id?'id="'+id+'"':'')+'><span>'+col1+'</span><span style="position:absolute;right:'+offset+'">'+col2+'</span></div>'


const showStatInfo=(s)=>(e)=>{
  e.preventDefault()
  e.stopPropagation()
  openDialog2()
  document.getElementById('dialog2').innerHTML=
    '<div>'+fullStats[s]+'</div>'+
    '<div style="margin-top:50;font-size:28">'+statDescriptions[s]+'</div>'+
    '<div style="margin-top:50"onclick="closeDialog2()">Close</div>'
}
const createButton=(marginTop,onclick,text)=>
  '<div style="margin-top:'+marginTop+'"><span style="background-color:#999988;border-style:solid" onclick="'+onclick+'">'+text+'</span></div>'
const createButton2=(text,onclick)=>{
  let btn=document.createElement('span')
  btn.innerHTML=text
  btn.style.backgroundColor='#999988'
  btn.style.borderStyle='solid'
  btn.onclick=onclick
  return btn
}
