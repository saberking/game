const seat={
  type:'weapon',
  subtype:'unarmed',
  picName:'seat',
  name:'seat',
  ap:4,
  penetration:2,
  melee:{
    effect:[{score:str,amount:-3,type:norm},{score:luc,amount:-3,type:norm}]
  },
  damageType:'physical'
}
const fangs={
  type:'weapon',
  subtype:'unarmed',
  name:'fangs',
  melee:{
    effect:[{score:str,amount:-4,type:norm},{score:mag,amount:-3,type:norm}]
  }
}
const fist = {
  type:'weapon',
  subtype: 'unarmed',
  picName: 'fist',
  name:'fist',
  ap:4,
  penetration:2,
  melee: {
    effect:[{score:str,amount:-3,type:norm}]
  },
  damageType:'physical'
}
const bible={
  type:'weapon',
  subtype:'club',
  name:'bible',
  ap:4,
  penetration:6,
  melee:{
    effect:[{score:int,amount:-4,type:norm},{score:str,amount:-2,type:norm}]
  },
  damageType:'physical',
  jobs:['priest']
}
const arrow={
  type:'shield',
  subtype:'arrow',
  name:'arrow',
  ranged: {effect:[{score:str,amount:-3,type:norm}]},
  maxQuantity:10,
  value:1,
  jobs:['fighter','thief']
}
items.push(arrow)
const musketBalls={
  type:'shield',
  subtype:'musketBalls',
  name:'musketBalls',
  ranged:{effect:[{score:str,amount:-4,type:norm}]},
  maxQuantity:10,
  value:2,
  jobs:['fighter','thief']
}
items.push(musketBalls)
const vampireSword={
  type:'weapon',
  subtype:'sword',
  picName:'rustySword',
  name:'vampire sword',
  ap:5,
  penetration:4,
  melee:{
    effect:[{score:str,amount:-7,type:norm}]
  },
  effects:[{score:'sword',amount:+5}],
  jobs:['fighter']
}
items.push(vampireSword)
const bow = {
  type:'weapon',
  subtype: 'bow',
  name: 'bow',
  picName:'bow',
  ammo:['arrow'],
  ap:7,
  penetration:3,
  ranged:true,
  rangePen: 1,
  value:12,
  jobs:['fighter','thief']
}
items.push(bow)
const knife = {
  type: 'weapon',
  subtype: 'dagger',
  name: 'knife',
  picName:'dagger',
  ap:3,
  penetration:4,
  melee: {effect:[{score:str,amount:-3,type:norm}]},
  value:5,
}
items.push(knife)
const dagger={
  type:'weapon',
  subtype:'dagger',
  name:'dagger',
  picName:'dagger',
  ap:3,
  penetration:5,
  melee:{effect:[{score:str,amount:-4,type:norm}]},
  value:15
}
items.push(dagger)
const club={
  type:'weapon',
  subtype:'club',
  name:'club',
  picName:'club',
  ap:5,
  penetration:4,
  melee:{effect:[{score:str,amount:-5,type:norm}]},
  value:5
}
items.push(club)
const claws={
  type:'weapon',
  subtype:'unarmed',
  name:'claws',
  penetration:3,
  melee:{effect:[{score:str,amount:-4,type:norm}]}
}
const musket={
  type:'weapon',
  subtype:'gun',
  name:'musket',
  picName:'musket',
  ammo:['musketBalls'],
  ranged:true,
  rangePen:3,
  penetration:4,
  ap:7,
  value:30,
  jobs:['fighter','thief']
}
items.push(musket)
const rustySword={
  type:'weapon',
  subtype:'sword',
  name:'rusty sword',
  picName:'rustySword',
  penetration:3,
  melee:{effect:[{score:str,amount:-4,type:norm}]},
  value:3,
  jobs:['fighter']
}
items.push(rustySword)
const sword={
    type:'weapon',
    subtype:'sword',
    name:'sword',
    picName:'sword',
    penetration:4,
    melee:{effect:[{score:str,amount:-6,type:norm}]},
    value:30,
    jobs:['fighter']

}
items.push(sword)
const staff={
  type:'weapon',
  subtype:'staff',
  name:'staff',
  penetration:3,
  melee:{
    effect:[{score:str,amount:-3,type:norm}]
  },
  ap:4,
  value:4,
}
items.push(staff)
const slime={
  type:'weapon',
  subtype:'unarmed',
  name:'slime',
  picName:'slime',
  penetration:4,
  melee:{effect:[{score:str,amount:-4,type:norm},{score:spd,amount:-4,type:temp}]}
}

const molotov={
  type:'weapon',
  subtype:'throwing',
  name:'molotov',
  picName:'molotov',
  penetration:6,
  ranged:{effect:[{score:'fire',amount:5,type:temp}]},
  rangePen: 3
}
items.push(molotov)
const brick={
  type:'weapon',
  subtype:'throwing',
  name:'brick',
  picName:'brick',
  penetration:3,
  ranged:{effect:[{score:str,amount:-4,type:norm}]},
  rangePen: 3
}
items.push(brick)
const syringe={
  type:'shield',
  subtype:'needle',
  name:'syringe',
  picName:'syringe',
  maxQuantity:10,
  value:4
}
items.push(syringe)
const dartPistol={
  type:'weapon',
  ammo:['needle'],
  subtype:'gun',
  name:'dartPistol',
  ranged:true,
  rangePen:3
}
items.push(dartPistol)
const laserPistol={
  type:'weapon',
  damageType:'light',
  subtype:'gun',
  name:'laserPistol',
  ranged:true,
  rangePen:3,
  ammo:['smallBattery'],
  ap:3,
  value:60
}
items.push(laserPistol)
const smallBattery={
  type:'shield',
  subtype:'smallBattery',
  name:'smallBattery',
  ranged:{effect:[{score:str,amount:-4,type:norm}]},
  maxQuantity:10,

}
items.push(smallBattery)
