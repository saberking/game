const clothCap = {
  type:'hat',
  name:'cloth cap',
  picName:'clothCap',
  armor:{
    physical:4,
    light:2
  },
  value:5
}
items.push(clothCap)
const clothShirt={
  type:'top',
  name:'cloth shirt',
  picName:'clothShirt',
  armor:{
    physical:7,
    light:3
  },
  value:7
}
items.push(clothShirt)
const leatherJacket={
  type:'top',
  name:'leather jacket',
  picName:'leatherJacket',
  armor:{
    physical:12,
    light:7
  },
  value:20,
  jobs:['fighter','priest','thief']
}
items.push(leatherJacket)
const chainMail={
  type:'top',
  name:'chain mail',
  picName:'chainMail',
  armor:{
    physical:20,
    light:9
  },
  value:50,
  jobs:['fighter','priest']
}
items.push(chainMail)
const sandals={
  type:'shoes',
  name:'sandals',
  armor:{
    physical:2,
    light:0
  },
  value:3
}
items.push(sandals)
const leatherBoots={
  type:'shoes',
  name:'leather boots',
  picName:'leatherBoots',
  armor:{
    physical:4,
    light:2
  },
  value:8,
  jobs:['fighter','priest','thief']
}
items.push(leatherBoots)
const leatherHelm={
  type:'hat',
  name:'leatherHelm',
  armor:{
    physical:8,
    light:4
  },
  value:12,
  jobs:['fighter','priest','thief']
}
items.push(leatherHelm)
const steelHelm={
  type:'hat',
  name:'steelHelm',
  armor:{
    physical:12,
    light:8
  },
  value:15,
  jobs:['fighter','priest']
}
items.push(steelHelm)
const jeans={
  type:'trousers',
  name:'jeans',
  armor:{
    physical:5,
    light:1
  },
  value:8,
}
items.push(jeans)
const underpants={
  type:'trousers',
  name:'underpants',
  armor:{
    physical:1,
    light:1
  },
  value:30,
  effects:[{score:str,amount:2}],
  jobs:['fighter']
}
items.push(underpants)
const leatherTrousers={
  type:'trousers',
  name:'leatherTrousers',
  armor:{
    physical:12,
    light:6
  },
  value:25,
  jobs:['fighter','thief','priest']
}
items.push(leatherTrousers)
