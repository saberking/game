
const displaySkills=(c,i=0,top=100)=>{
  const skillRow=(skill)=>doubleColumn(skill[0].toUpperCase()+skill.substring(1),c.skills[skill],skill+'_'+i)
  c=c||charactersToDesign[i]
  let html=''
  let skills=[]
  for(let skill in c.skills){
    skills.push(skill)
  }
  skills.sort((m1,m2)=>m1.charCodeAt(0)-m2.charCodeAt(0))
  let j
  html+='<div style="position:absolute;top:'+top+'"><div style="width:250;height:100%">'

  html+='<div class="skillsColumn"style="  background-color:rgba(33,55,55,0.33)">'
  let ms=skills.filter(s=>typeof(magicSkills[s])==='number')
  ms.forEach(s=>    html+=skillRow(s))
  html+='</div>'

  html+='<div style="height:3"></div>'

  html+='<div style="background-color:rgba(44,44,70,0.33)"class="skillsColumn">'
  let mundane=skills.filter(s=>!ms.find(m=>m===s))
  for(j=0;j<mundane.length;j++)
  html+=skillRow(mundane[j])
  html+='</div></div></div>'

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
  document.getElementById('stats').innerHTML=  displaySkills(c)+'<div id="continue_0"></div>'
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
