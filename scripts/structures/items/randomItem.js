const randomHat=()=> randomItem('hat')

const randomWeapon=()=>randomItem('weapon')
const randomArmor=()=>randomItem('top')
const randomItem=(type)=>{
  if(type){
    let it=items.filter(i=>i.type===type)
    let i=floor(random()*it.length)
    return new Item(it[i])
  }
  let i=floor(random()*items.length)
  return new Item(items[i])
}
const randomWeaponEffect=(bonus=0,type)=>{
  let skillEffects=magicSchools.concat([type])
  let i=random()
  if(i<0.5){
    let score=randomStat()
    return {score, amount:ceil((d20()+bonus)/8), name:fullStats[score]}
  }
  i=floor(random()*skillEffects.length)
  let score=skillEffects[i]
  return{score,amount:ceil((d20()+bonus)/4)+1,name:score===type?'quality':score}
}

const randomStat=()=>{
  let r=floor(random()*stats.length)
  return stats[r]
}

const randomSkill=()=>{
  let r=floor(random()*skills.length)
  return skills[r]
}

const randomItemEffect=(bonus=0)=>{
  let num=random()
  if(num<0.5){let stat=randomStat();return{score:stat,amount:ceil((d20()+bonus)/8),name:fullStats[stat]}}
  else{let skill=randomSkill();return{score:skill,amount:ceil((d20()+bonus)/4)+1,name:skill}}
}

const randomSpell=(l=1)=>{
  let s=spells.filter(sp=>sp.level===l)
  let i = floor(random()*s.length)
  return s[i]
}


const enchant=(params,count=1,level=1,sp=[])=>{
  if(params.type==='shield'||params.type==='chemical'||params.type==='pathogen'||params.type==='consumable')
    return new Item(params)
  let name=params.name+' of '
  let effects=[]
  let abils={}
  for(let i=0;i<count;i++){
    if(random()<0.25){
      let spell=randomSpell(level)
      if(!sp.find(s=>s===spell.name))sp.push(spell.name)
    }else{
      if(params.type==='weapon'){
        effects.push(randomWeaponEffect(0,params.subtype))
      }else    effects.push(randomItemEffect(0))
      if(abils[effects[effects.length-1].name])abils[effects[effects.length-1].name]++
      else abils[effects[effects.length-1].name]=1
    }
  }
  let hasAbil=false
  Object.keys(abils).forEach((k,i)=>{
    if(i)name+=' and '
    if(abils[k]>1)name+='super '
    if(abils[k]>2)name+='duper '
    name+=k
    hasAbil=true
  })
  sp.forEach((s,i)=>{
    if(i||hasAbil)name+=' and '
    name+=s
  })
  return modItem(params,{effects:effects.concat(params.effects||[]),name,picName:params.picName||params.name,spells:sp})
}
