let zombieStats={
  str:3,
  mag:3,
  spd:4,
  int:2,
  rea:2,
  luc:3
}
const neonaziZombie={
  name:'neonaziZombie',
  hostileRange:7,
  weapon:molotov,
  stats:zombieStats,
  spells:['heal','prayer'],
  skills:Object.assign({},defaultSkills,{divinity:5,sorcery:5,throwing:20,unarmed:15}),
  items:[brick]
}

const zombie={
  name:'zombie',
  hostileRange:7,
  stats:zombieStats
}


let zombieQueen={
  // stats:{
  //   str:10,
  //   int:5,
  //   mag:8,
  //   san:8,
  //   luc:10,
  //   agi:1,
  //   spd:4
  // },
  name: 'zombieQueen',
  hostileRange: 12,
  // spells:['terror'],
  // skills:{
  //   mental:7
  // }
}
