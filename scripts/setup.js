
const starting=startingPos[startingWorld]
// setTimeout(audio,100)

const addCharacters=()=>{
  let cl=['thief','wizard','priest']
  let sp=['invisibility','magicMissile','heal']
  let bonuses=[{str:-2,spd:1,rea:1,luck:2},{str:-2,int:+7,spd:-2},{spd:1,rea:-2}]
  for(let j = 0;j<noOfCharacters;j++){
    you.push( new Creature({
      controlled: true,
      stats:{str:6,spd:6,int:6,mag:6,rea:6,luc:6},
      name: pcNames[j],
      display:pcNames[j],
      faction:1,
      skills:merge(jobsSkills[cl[j]],magicSkills),
      spells: [],
      items:[],
      stages: 5,
      gold:50
    })  )
    // Object.keys(bonuses[j]).forEach(key=>you[j].stats[key]+=bonuses[j][key])
    if(!offerLoad){
      you[j].job=cl[j]
      you[j].spells=[sp[j]]
    }
    you[j].checkStatus(true)
  }
  you.forEach(c=>position(c,starting.x,starting.y,starting.z))

}

const setup=()=>{
  initActions()
  layout()
  window.onresize=layout
  background()

  can = document.getElementById('can')
  ctx = can.getContext('2d')
  can2=can
  ctx2=ctx
  message=document.getElementById('message')

  document.getElementById('file-input').onchange= loadFile
  screenPos={x:0,y:100}
  dev&&devEvents.forEach(e=>e())
  currentWorld=starting.z
  initWorld()

  addCharacters()

  selected=you[0]
  setTimeout(()=>{
    if(offerLoad){
      newOrLoad()
      console.log('neworload')
    }  else{
        start()
    }
  })
  setTimeout(initBackgrounds)

}
const start=()=>{
  charactersToDesign=[]

  restart()
  slideTo(-1)
  closeDialog()
  centreScreen()
  document.getElementById('message2').style.display='inline-block'
  removeBackground()

}
let backgrounds=[]
const initBackgrounds=()=>{
  // let bgi=['bg2','concrete','paper','largeConcrete','table']
  let bgi=['bg2','table']
  bgi.forEach(i=>{
    let c=new Image()
    c.onload=()=>console.log(c.src)
    c.src='assets/background/'+i+'.jpg'
    backgrounds.push(c)
  })
}

const restart=()=>{
  controlled=creatures.filter(c=>c.controlled)
  resetView()
}

setup()
