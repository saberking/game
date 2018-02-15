
let oozeStats={
  str:4,
  int:1,
  mag:1,
  spd:2,
  rea:4,
  luc:7
}
let greenOoze={
  stats:oozeStats,
  name:'greenOoze',
  hostileRange:8,
  skills:{
    unarmed:5
  },
  unarmed:slime,
  immunities:['radiation'],
  naturalArmor:{physical:7,light:3}
}
let radioactiveOoze={
  stats:oozeStats,
  name:'radioactiveOoze',
  hostileRange:8,
  skills:{
    unarmed:10
  },
  unarmed:slime,
  special:{
    radiation:4
  },
  immunities:['radiation'],
  naturalArmor:{physical:7,light:5}
}
