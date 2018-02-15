let itemPics={}
const itemTypes=['weapon','top','hat','trousers','shield','shoes','consumable','chemical','pathogen']
let items=[]
class Item {
  constructor({
    type='weapon',
    subtype,
    melee,
    ranged,
    rangePen=3,
    value=5,
    ap=4,
    effects=[],
    name,
    picName,
    consumeEffect,
    damageType='physical',
    armor=null,
    penetration=5,
    poisonEffects=[],
    compound=null,
    ammo=[],
    quantity=1,
    maxQuantity=1,
    spells=[],
    iv=false,
    jobs=['fighter','wizard','priest','thief']
  }) {
    this.jobs=jobs
    this.iv=iv
    this.pic=new Image()
    this.picName=picName?picName:name
    this.pic.src='assets/items/'+this.picName+'.png'
    this.type=type
    this.subtype=subtype||type
    this.melee=melee
    this.ranged = ranged
    this.rangePen=rangePen
    this.value=value
    this.ap=ap
    this.name=name
    this.effects=effects
    this.consumeEffect=consumeEffect
    this.armor=armor
    this.damageType=damageType
    this.penetration=penetration
    this.poisonEffects=poisonEffects
    this.id=itemId++
    this.compound=compound
    this.ammo=ammo
    this.quantity=quantity
    this.maxQuantity=maxQuantity
    this.spells=spells
    if(!itemPics[this.picName]){
      itemPics[this.picName]=new Image()
      itemPics[this.picName].src='assets/items/'+this.picName+'.png'
    }
  }
}
let compounds=[]
const modItem=(item,params)=>{
  return new Item(Object.assign({},item,params))
}
const addToInventory=(c,i)=>{
  if(!c)c=controlled.find(co=>co.status.status==='active')
  let item=c.items.find(it=>it.name===i.name)
  if(item&&item.maxQuantity>=item.quantity+i.quantity)item.quantity+=i.quantity
  else c.items.push(i)
}

const moveItems=(c)=>{
  let target=selected||you.find(y=>y.status.status==='active'&&y.z===c.z)
  if(!target)return
  c.items.forEach(i=>{
    if(i.subtype!=='unarmed'){
      addToInventory(target,i)
      addMessage('You got '+i.name+'!')
    }
  })
  if(c.weapon.subtype!=='unarmed'){
    addToInventory(target,c.weapon)
    addMessage('You got '+c.weapon.name+'!')
  }
  slots.forEach(s=>{
    if(s!=='weapon'&&c[s]){
      addToInventory(target,c[s])
      addMessage('You got '+c[s].name+'!')
    }
  })
  target.gold+=c.gold
  addMessage('You got '+c.gold+' gold!')
}
