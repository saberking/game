const addStatButtons=(i)=>{
  stats.forEach(s=>{
    document.getElementById(s+'_'+i).innerHTML+=increaseStatButton(s,i)
  })
}

const displayStats=(i)=>{
  document.getElementById('continue_'+i).innerHTML=''
  increasedStat[i]=[]
  let st=charactersToDesign[i].stats
  let html='<div style="height:30"></div>'
  stats.forEach(s=>{
    html+=doubleColumn(fullStats[s],st[s],s+'_'+i)
  })
  document.getElementById('stats_'+i).innerHTML=html
  stats.forEach(s=>{
    let box=document.getElementById(s+'_'+i)
    box.oncontextmenu=showStatInfo(s)
  })
  addStatButtons(i)
}

const increaseStat=(s,i)=>{
  if(increasedStat[i].length===2)return
  let c=charactersToDesign[i]
  c.stats[s]+=2
  document.getElementById(s+'_'+i).innerHTML='<div style="position:relative">'+
    doubleColumn(fullStats[s],c.stats[s],s+'_'+i)+
    decreaseButton(s,i,'Stat')
  +'</div>'
  increasedStat[i].push(s)
  console.log(increasedSkill)
  if(characterComplete(i)){
    document.getElementById('continue_'+i).innerHTML=continueButton(i)
  }
}
const decreaseStat=(s,i)=>{
  console.log('decrease',s)
  increasedStat[i]=increasedStat[i].filter(st=>st!=s)
  document.getElementById('continue_'+i).innerHTML=''
  let c= charactersToDesign[i]
  c.stats[s]-=2
  document.getElementById(s+'_'+i).innerHTML=doubleColumn(fullStats[s],c.stats[s])+
  increaseStatButton(s,i)
}
