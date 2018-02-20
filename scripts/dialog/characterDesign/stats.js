const addStatButtons=(i=0)=>{
  stats.forEach(s=>{
    document.getElementById(s+'_'+i).innerHTML+=increaseStatButton(s,i)
  })
}

const displayStats=(c,i=0,status=false)=>{
  let st=c.stats
  let html='<div style="background-color:rgba(55,20,30,0.33);"class="skillsColumn">'
  stats.forEach(s=>{
    html+=doubleColumn(fullStats[s],(status?c.status[s]+'/':'')+st[s],s+'_'+i)
  })
  html+='</div>'
return html
}
const statContext=(i=0)=>{
  stats.forEach(s=>{
    let box=document.getElementById(s+'_'+i)
    box.oncontextmenu=showStatInfo(s)
  })
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
  if(characterComplete(i)){
    document.getElementById('continue_'+i).innerHTML=continueButton(i)
  }
}
const decreaseStat=(s,i)=>{
  ('decrease',s)
  increasedStat[i]=increasedStat[i].filter(st=>st!=s)
  document.getElementById('continue_'+i).innerHTML=''
  let c= charactersToDesign[i]
  c.stats[s]-=2
  document.getElementById(s+'_'+i).innerHTML=doubleColumn(fullStats[s],c.stats[s])+
  increaseStatButton(s,i)
}
