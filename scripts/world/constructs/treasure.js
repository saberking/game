const addHatStand=(x,y,z,items=[(randomHat())])=>{
  addTreasure('hatStand',x,y,z,items)
}
const addTreasure=(name,x,y,z,items=[])=>{
  new Construct({
    zone:zone(x,y,z),
    name,
    actions:['search'],
    items
  })
}
const addCounter2=(x,y,z)=>{
  new Construct({
    zone:zone(x,y,z,4),
    name:'counter2'
  })
}
const addCounter3=(x,y,z)=>{
  new Construct({
    zone:zone(x,y,z,4),
    name:'counter3'
  })
}

const addPotionRack=(x,y,z,items=[randomItem('consumable')])=>{
  new Construct({
    actions:['search'],
    items,
    zone:zone(x,y,z,1,5),
    name:'potionRack'
  })
}
const addPlant=(x,y,z,items=[new Item(magicHerbs)])=>{
  new Construct({
    actions:['search'],
    items,
    zone:zone(x,y,z),
    name:'plant'
  })
}
const addCauldron=(x,y,z)=>{
  new Construct({
    zone:zone(x,y,z),
    name:'cauldron'
  })
  timedEvents.add({interval:4,event:()=>{if(currentWorld===5)startAnimation(explosion,{x,y},{x:x+2,y:y-4},1000)}})

}
const addArmorRack=(x,y,z,items=[(randomItem('top'))])=>{
  let actions
  if(items)actions=['search']
  new Construct({
    zone:zone(x,y,z,1,3),
    name:'armorRack',
    items,
    actions
  })
}
const addChest=(x,y,z,items=[(randomItem())])=>{
  new Construct({
    zone:zone(x,y,z),
    height:0,
    actions:['search'],
    items,
    name:'chest'
  })
}
const addMagicChest=(x,y,z)=>addChest(x,y,z,[enchant(randomItem())])
const addWeaponsRack=(x,y,z,items=[(randomWeapon())])=>{
  new Construct({
    zone:zone(x,y,z),
    name:'weaponsRack2',
    actions:['search'],
    items
  })
}
