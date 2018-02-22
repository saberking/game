const creation=(i)=>{
  const c=charactersToDesign[i]
  increasedStat[i]=[]
  let n=c.display
  document.getElementById('dialog_'+i).innerHTML=
    '<div style="position:absolute;top:30;left:50">'+
    '<div class="skillsColumn"style="width:770;height:88;background-color:rgba(33,33,33,0.33)"></div>'+
    '<div style="position:absolute;top:0">'+
      '<div style="margin-top:30">Name</div>'+
      designPic(c)+
      '<input style="background-color:#999988;margin-bottom:40  "type="text" value="'+n+'"onchange="updateName(value,'+i+')"/>'+
      displayStats(c,i)+

    '</div>'+
    '<div style="position:absolute;left:360;top:0">'+
      // '<div style="margin-bottom:4;margin-top:30">Class</div>'+
      // '<select style="background-color:#999988;margin-bottom:38"id="class_'+i+'" onchange="selectClass('+i+')">'+
      // jobs.map(j=>'<option value="'+j+'"'+(c.job===j?'selected="true"':'')+'>'+j[0].toUpperCase()+j.substring(1)+'</option>').join()+
      // '</select>'+
      '<div id="info_'+i+'"></div></div>'+
    '<div id="skill_'+i+'" style="position:absolute;top:130;left:460"></div>'+'</div>'+
    '<div style="position:absolute;bottom:60;left:40"id="backButton'+i+'"></div>'+
    '<div style="position:absolute;right:120;bottom:60"id="continue_'+i+'"></div>'
    console.log(document.getElementById('dialog_'+i).style.width)
    document.getElementById('backButton'+i).appendChild(backButton(i))
    document.getElementById('skill_'+i).innerHTML=displaySkills(c,i)
    addSkillButtons(i)
    addStatButtons(i)
    statContext(i)
}
