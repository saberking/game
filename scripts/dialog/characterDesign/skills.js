const skillRow=(skill,c,status,i)=>doubleColumn(skill[0].toUpperCase()+skill.substring(1),(status?c.status[skill]+'/':'')+c.skills[skill],skill+'_'+i)

const displayMeleeSkills=(c,status,i)=>{
  let html='',j
  html+='<div style="background-color:rgba(44,44,70,0.33)"class="skillsColumn">'
  let melee=alphabetic(Object.keys(meleeSkills))
  for(j=0;j<melee.length;j++)
  html+=skillRow(melee[j],c,status,i)
  html+='</div>'
  return html
}
const displayRangedSkills=(c,status,i)=>{
  let html='',j
  html+='<div style="background-color:rgba(55,70,33,0.33)"class="skillsColumn">'
  let ranged=alphabetic(Object.keys(rangedSkills))
  for(j=0;j<ranged.length;j++)
  html+=skillRow(ranged[j],c,status,i)
  html+='</div>'
  return html
}
const displayMagicSkills=(c,status,i)=>{
  let html='',j
  html+='<div style="background-color:rgba(33,55,55,0.33)"class="skillsColumn">'
  let ranged=alphabetic(Object.keys(magicSkills))
  for(j=0;j<ranged.length;j++)
  html+=skillRow(ranged[j],c,status,i)
  html+='</div>'
  return html
}
const displaySkills=(c,i=0,status=false)=>{
  c=c||charactersToDesign[i]
  let html=displayMagicSkills(c,status,i)+
    '<div style="height:3"></div>'+
    displayMeleeSkills(c,status,i)+
    '<div style="height:3"></div>'+
    displayRangedSkills(c,status,i)


  return html

}
const addSkillButtons=(i=0)=>{
  Object.keys(charactersToDesign[i].skills).forEach(skill=>{
    document.getElementById(skill+'_'+i).innerHTML+=increaseButton(skill,i,'Skill')

  })
}

const increaseSkill=(skill,i)=>{
  (skill,i)
  let c=charactersToDesign[i]
  if(increasedSkill[i].length===2)return
    c.skills[skill]+=3
    increasedSkill[i].push(skill)
    document.getElementById(skill+'_'+i).innerHTML=
      doubleColumn(skill[0].toUpperCase()+skill.substring(1),c.skills[skill],skill+'_'+i)+
      decreaseButton(skill,i,'Skill')
    if(characterComplete(i)){
      document.getElementById('continue_'+i).innerHTML=continueButton(i)
    }
}
const decreaseSkill=(s,i)=>{
  (s)
  increasedSkill[i]=increasedSkill[i].filter(sk=>sk!=s)
  document.getElementById('continue_'+i).innerHTML=''
  let c= charactersToDesign[i]
  c.skills[s]-=3
  document.getElementById(s+'_'+i).innerHTML=doubleColumn(s[0].toUpperCase()+s.substring(1),c.skills[s])+
  increaseButton(s,i,'Skill')
}
