
const selectClass=(i)=>{
  const value=document.getElementById('class_'+i).value
  increasedSkill[i]=[]
  const c=charactersToDesign[i]
  c.job=value
  c.spells=c.spells.filter(s=>spells.find(sp=>sp.name===s).jobs.find(j=>j===c.job))
  //

  c.skills=merge(jobsSkills[value],magicSkills)
  // chooseSpell(i)

  document.getElementById('continue_'+i).innerHTML=''
}
