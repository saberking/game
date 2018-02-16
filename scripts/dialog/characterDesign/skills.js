
const displaySkills=(c,i=0,top=100)=>{
  c=c||charactersToDesign[i]
  let html=''
  let skills=[]
  for(let skill in c.skills){
    skills.push(skill)
  }
  html+='<div style="position:absolute;top:'+top+'"><div style="width:250">'
  let j
  for(j=0;j<skills.length;j++)
  html+=doubleColumn(skills[j][0].toUpperCase()+skills[j].substring(1),c.skills[skills[j]],skills[j]+'_'+i)

  html+=      '<div id="continue_'+i+'"></div></div></div>'
  return html

}
const addSkillButtons=(i=0)=>{
  Object.keys(charactersToDesign[i].skills).forEach(skill=>{
    document.getElementById(skill+'_'+i).innerHTML+=increaseButton(skill,i,'Skill')

  })
}
const chooseSkills=()=>{
  let c= charactersToDesign[0]
  // document.getElementById('continue').innerHTML='<div style="height:52"></div>'
  document.getElementById('dialog').innerHTML=
  header(c)+'<div style="position:absolute;left:200;top:50"id="stats"></div>'
  document.getElementById('stats').innerHTML=  displaySkills(c)
  addSkillButtons()
}
const increaseSkill=(skill,i)=>{
  (skill,i)
  let c=charactersToDesign[i]
  if(increasedSkill[i].length===2)return
    c.skills[skill]+=5
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
  c.skills[s]-=5
  document.getElementById(s+'_'+i).innerHTML=doubleColumn(s[0].toUpperCase()+s.substring(1),c.skills[s])+
  increaseButton(s,i,'Skill')
}
