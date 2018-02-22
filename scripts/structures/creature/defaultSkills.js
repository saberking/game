var rangedSkills= {
  bow:0
  throwing:0,
  gun:0,
}
const jobsSkills={
  fighter:{
    dagger: 0,
    throwing:0,
    unarmed:0,
    gun:0,
    sword:0,
    bow:0,
    club:0,
    staff:0,
  },
  priest:{
    dagger: 0,
    throwing:0,
    unarmed:0,
    club:0,
    staff:0,
  },
  thief:{
    dagger: 0,
    throwing:0,
    unarmed:0,
    gun:0,
    sword:0,
    bow:0,
    club:0,
    staff:0,
  },
  wizard:{
    dagger: 0,
    throwing:0,
    unarmed:0,
    staff:0,
  }
}

let magicSkills={
  chemistry:0,
  illusion:0,
  theology:0,
}
let meleeSkills={
  dagger: 0,
  unarmed:0,
  sword:0,
  club:0,
  staff:0,
}
const defaultSkills=merge(magicSkills,merge(meleeSkills,rangedSkills))
const rmsSkill=(s,skills)=>{
  let arr=[]
  for(let skill in skills){
    if(s!==skill)arr.push(a.status[skill])
  }
  return rms(arr)
}
