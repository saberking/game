
const chooseSpell=(i)=>{
  let c=charactersToDesign[i]
  if(c.level===1){

    let html='<div style="background-color:rgba(66,66,33,0.33)"class="skillsColumn">Spell'
    let avSpells=spells.filter(s=>s.level<=c.level&&s.jobs.find(cl=>cl===c.job))
    avSpells.forEach(s=>{
      let col=(c.spells[0]===s.name?'#95999f':'#557250')
      html+='<div style="margin-top:20;width:250;border-width:1;border-style:solid;background-color:'+col+'"onclick="selectSpell('+s.name+','+i+')" oncontextmenu="showSpellInfo(event,'+s.name+')">'+
        s.name+
      '</div>'
    })
    html+='<div style="height:10"></div>'+
    '</div>'
    document.getElementById('info_'+i).innerHTML=html
  }else throw new Error()
}
const selectSpell=(spell,i)=>{
  let c=charactersToDesign[i];c.spells=[spell.name];
  chooseSpell(i)
  if(characterComplete(i)){
    document.getElementById('continue_'+i).innerHTML=continueButton(i)
  }
}
