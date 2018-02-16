var defaultSkills= {
  dagger: 0,
  throwing:0,
  unarmed:0,
  gun:0,
  sword:0,
  bow:0,
  club:0,
  staff:0,
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
    club:0,
    staff:0,
  }
}
let skills=[]
Object.keys(defaultSkills).forEach(k=>skills.push(k))
let magicSkills={
  sorcery:0,
  illusion:0,
  divinity:0,
  healing:0
}
