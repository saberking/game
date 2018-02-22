const creation=(i)=>{
  const c=charactersToDesign[i]
  increasedStat[i]=[]
  let n=c.display
  document.getElementById('dialog_'+i).innerHTML=
  topLineBackground()+
      '<div style="margin-left:125;margin-right:125;position:relative;height:100%;top:0">'+
        '<div class="skillsColumn"style="left:0;right:0;height:88;background-color:rgba(33,33,33,0.33);width:670">'+
          '<div style="margin-top:30">Name</div>'+
          designPic(c)+
          '<input style="background-color:#999988;margin-bottom:40  "type="text" value="'+n+'"onchange="updateName(value,'+i+')"/>'+

        '</div>'+
        displayStats(c,i)+
        // '<div style="height:70"></div>'+
        // displayMagicSkills(c,false,i)+

        // '<div style="position:absolute;left:310;top:-12">'+'<div id="info_'+i+'"></div></div>'+
          // '<div style="margin-bottom:4;margin-top:30">Class</div>'+
          // '<select style="background-color:#999988;margin-bottom:38"id="class_'+i+'" onchange="selectClass('+i+')">'+
          // jobs.map(j=>'<option value="'+j+'"'+(c.job===j?'selected="true"':'')+'>'+j[0].toUpperCase()+j.substring(1)+'</option>').join()+
          // '</select>'+

        '<div id="skill_'+i+'" style="position:absolute;top:120;right:0;"></div>'+
        '<div style="position:absolute;bottom:60;left:0"id="backButton'+i+'"></div>'+
        '<div style="position:absolute;right:20;bottom:60"id="continue_'+i+'"></div>'+
        '</div></div>'
    document.getElementById('backButton'+i).appendChild(backButton(i))
    document.getElementById('skill_'+i).innerHTML=displaySkills(c,i)
      // displayMeleeSkills(c,false,i)+
      // '<div style="height:3"></div>'+
      // displayRangedSkills(c,false,i)
    addSkillButtons(i)
    addStatButtons(i)
    statContext(i)
}
