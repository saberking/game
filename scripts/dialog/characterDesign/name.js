const updateName=v=>charactersToDesign[0].display=v
const backButton=(i)=>{
  let btn=createButton2('Back',(e)=>{
    e.preventDefault()
    slideTo(i-1)
  })
  return btn
}
const creation=(i)=>{
  const c=charactersToDesign[i]
  let n=c.display
  document.getElementById('dialog_'+i).innerHTML=
    scroll()+    designPic(c)+
    '<div style="position:absolute;top:100;left:50">'+
    '<div>Name</div>'+
    '<input style="background-color:#999988"type="text" value="'+n+'"onchange="updateName(value,'+i+')"/>'+

      '<div id="stats_'+i+'"></div><div style="margin-top:20"id="backButton'+i+'"></div></div>'+'<div style="position:absolute;left:410;top:100">'+
      '<div >Class</div>'+
      '<select style="background-color:#999988"id="class_'+i+'" onchange="selectClass('+i+')">'+
      jobs.map(j=>'<option value="'+j+'"'+(c.job===j?'selected="true"':'')+'>'+j[0].toUpperCase()+j.substring(1)+'</option>').join()+
      '</select>'+'<div id="info_'+i+'"></div></div>'+
      '<div id="skill_'+i+'" style="position:absolute;top:0;left:710"></div>'
      document.getElementById('backButton'+i).appendChild(backButton(i))
      selectClass(i)
      displayStats(i)
}
