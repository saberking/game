const magicHerbs={
  type:'consumable',
  name:'magic herbs',
  picName:'magicHerbs',
  consumeEffect:[{score:'mag',amount:5,type:'healing'}],
  value:15
}
items.push(magicHerbs)
const magicPowder={
  type:'consumable',
  name:'magic powder', 
  picName:'brownPowder',
  iv:true,
  consumeEffect:[{score:str,amount:5,type:'healing'}],
  value:20
}
items.push(magicPowder)
const lithium={
  type:'consumable',
  name:'lithium',
  picName:'lithium',
  consumeEffect:[{score:'int',amount:3,type:'healing'}],
  value:25
}
items.push(lithium)
const speedPowder={
  type:'consumable',
  name:'speed powder',
  picName:'speedPowder',
  consumeEffect:[{score:spd,amount:4,type:temp}],
  value:10
}
const englishWine={
  type:'consumable',
  name:'English Wine',
  picName:'englishWine',
  consumeEffect:[{score:str,amount:+4,type:norm},{score:mag,amount:-2,type:norm}]
}
items.push(englishWine)
const fruits={
  type:'consumable',
  name:'fruits',
  picName:'fruits',
  consumeEffect:[{score:str,amount:+1,type:norm},{score:mag,amount:+1,type:healing}]
}
items.push(fruits)
items.push(speedPowder)
