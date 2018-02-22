const defaultStats=()=>{
  let rtn={}
  stats.forEach(stat=>{
    rtn[stat]=3+floor(random()*4)
  })
  return rtn
}
const xpBonus=1
class Creature {
  constructor({
    stats =defaultStats(),
    hostileRange=0,
    skills={},
    spells=[],
    chat,
    route,
    leader,
    group,
    x,
    y,
    z,
    name,
    gold=0,
    hat,
    shield,
    top,
    trousers,
    shoes,
    unarmed = fist,
    weapon,
    items=[],
    faction=10,

    controlled = false,
    display,
    trader,
    level=1,
    effects=[],
    picWidth = 88,
    picHeight = 88,
    drawWidth=width*2,
    drawHeight=height*2,
    stages = 1,

    practice={},
    xp=0,

    immunities=[],
    special={},
    deathTrigger,
    job,
    status,
    naturalArmor={},

    carried
  }) {
    var pic = {
      sprite: new Image(),
    }
    pic.sprite.src = './assets/sprites/'+name+'.png'
    this.pic=pic
    this.picWidth=picWidth
    this.picHeight=picHeight
    this.stages=stages
    this.drawWidth=drawWidth
    this.drawHeight=drawHeight
    this.stats = stats
    this.controlled=  controlled
    this.hostileRange=hostileRange
    this.skills=merge(defaultSkills, skills)
    this.items=[]
    items.forEach(i=>this.items.push(new Item(i)))
    this.x=x-(x%2)
    this.y=y-(y%2)+1-((this.x/2)%2)
    this.z=z
    this.level=level
    this.movingFrom={x,y}
    this.dest={x,y,z}
    this.name=name
    this.display=display||displayName(name)
    if(typeof(id)==='string') this.id=id
    else this.id='cr'+creatureId++
    this.effects=effects
    this.spells=spells
    this.route=route
    this.gold=gold
    this.job=job
    this.leader=leader
    this.group=group
    this.immunities=immunities
    // this.primary=primary
    // this.secondary=secondary
    this.faction=faction
    this.naturalArmor=naturalArmor
    this.trader=trader
    this.carried=carried
    this.special=special
    this.unarmed=new Item(unarmed)
    this.practice={}
    this.lastCatchup=0
    // this.nextTurn={}
    for (let skill in this.skills){
      this.practice[skill]=practice[skill]||0
    }
    this.xp=xp
    this.weapon = (weapon?new Item(weapon):this.unarmed)
    if(top)this.top=new Item(top);if(shield)this.shield=new Item(shield);if(hat)this.hat=new Item(hat)
    if(trousers)this.trousers=new Item(trousers);if(shoes)this.shoes=new Item(shoes)
    this.deathTrigger=deathTrigger
    this.chat=chat
    this.status=status
    this.checkStatus(true)
    creatures.push(this)
  }
  addXP() {
    let xp=0
    let self=this
    for (let stat in this.stats)xp+=self.stats[stat]
    for (let skill in this.skills)xp+=self.skills[skill]
    xp = floor(xp/controlled.length)
    controlled.forEach(c=>{
      c.xp+=round(xp*(1+c.status[int]/10))
      c.checkStatus()
    })
    addMessage('You each got '+xp+' XP')
  }
  checkStatus(hideHealth=false) {
    let self=this
    const lastStatus = this.status
    for(let skill in this.skills){
      if(this.practice[skill]===floor(sqrt(this.skills[skill]))+4){
        this.skills[skill]++
        addMessage(this.display+'\'s '+skill+' skill increased!')
        this.practice[skill]=0
      }
    }
    let req=(this.level+2)*(this.level+2)*(this.level+2)*(this.level+2)/xpBonus
    if(this.xp>req){
      this.level++
      levelUp(this)
      addMessage(this.display+' went up a level!')
    }
    this.status = Object.assign({}, this.stats, this.skills)
    this.status.spells=spells.filter(s=>this.status[s.type]>=s.level).map(s=>s.name)

    this.effects.forEach(e => {
      this.status[e.score] += e.amount
    })
    self.armor=Object.assign({},{light:0,physical:0},this.naturalArmor)

    slots.forEach(ef=>{
      if(self[ef]){
        if(self[ef].effects){
          self[ef].effects.forEach(e=>{
            if(typeof(self.status[e.score])=='number') self.status[e.score]+=e.amount
          })
        }
        self[ef].spells.forEach(s=>
          !this.status.spells.find(sp=>sp===s)&&this.status.spells.push(s))
        if(self[ef].armor){self.armor.light+=self[ef].armor.light;self.armor.physical+=self[ef].armor.physical}
      }
    })
    // this.status.maxStamina=this.status.str*10
    // if(lastStatus){
    //   this.status.stamina=lastStatus.stamina+this.status.maxStamina-lastStatus.maxStamina
    // }else{
    //   this.status.stamina=this.status.maxStamina
    // }
    // this.status.maxAp=round(this.status.spd*sqrt(this.status.stamina/this.status.maxStamina))
    if (lastStatus) {
      // this.status.currentAp=lastStatus.currentAp
      if (this.status.str <= 0 && lastStatus.str > 0 ||
            this.status.int <= 0 && lastStatus.int > 0) {
        addMessage(this.display +' has fallen unconscious')
      }
    }
    if (this.status.str <= 0 || this.status.int <=0) {
      this.status.status = 'unconscious'
      if(this.controlled){
        this.carried=true
      }else{
        console.log('uncon')
        moveItems(this)
        creatures=creatures.filter(c=>c.id!==this.id)
        if(this.deathTrigger)deathTriggers[this.deathTrigger]()
        else this.addXP()
      }
    } else {
        this.status.status = 'active'
        this.carried=false
    }
    if(this.controlled&&!hideHealth)showHealth()
  }
}
