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
    '<div style="position:absolute;top:30;left:50">'+
    '<div class="skillsColumn"style="width:670;height:88;background-color:rgba(33,33,33,0.33)"></div>'+
    '<div style="position:absolute;top:0">'+
      '<div style="margin-top:30">Name</div>'+
      designPic(c)+
      '<input style="background-color:#999988;margin-bottom:40  "type="text" value="'+n+'"onchange="updateName(value,'+i+')"/>'+

      '<div id="stats_'+i+'"style="background-color:rgba(55,20,30,0.33);"class="skillsColumn"></div>'+
    '</div>'+
    '<div style="position:absolute;left:360;top:0">'+
      '<div style="margin-bottom:4;margin-top:30">Class</div>'+
      '<select style="background-color:#999988;margin-bottom:38"id="class_'+i+'" onchange="selectClass('+i+')">'+
      jobs.map(j=>'<option value="'+j+'"'+(c.job===j?'selected="true"':'')+'>'+j[0].toUpperCase()+j.substring(1)+'</option>').join()+
      '</select>'+'<div id="info_'+i+'"></div></div>'+
    '<div id="skill_'+i+'" style="position:absolute;top:0;left:720"></div>'+'</div>'+
    '<div style="position:absolute;bottom:60;left:40"id="backButton'+i+'"></div>'+
    '<div style="position:absolute;right:70;bottom:60"id="continue_'+i+'"></div>'
    console.log(document.getElementById('dialog_'+i).style.width)
    document.getElementById('backButton'+i).appendChild(backButton(i))
    selectClass(i)
    displayStats(i)
}
