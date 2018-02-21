
const starting=startingPos[startingWorld]
// setTimeout(audio,100)

const addCharacters=()=>{
  for(let j = 0;j<noOfCharacters;j++){
    you.push( new Creature({
      controlled: true,
      name: pcNames[j],
      display:pcNames[j],
      faction:1,
      spells: [],
      items:[],
      stages: 5,
      gold:50
    })  )
    // Object.keys(bonuses[j]).forEach(key=>you[j].stats[key]+=bonuses[j][key])
    you[j].checkStatus(true)
  }
  you.forEach(c=>position(c,starting.x,starting.y,starting.z))

}

const setup=()=>{
  initActions()
  layout()
  background()
  window.onresize=layout
  // background()

  can = document.getElementById('can')
  ctx = can.getContext('2d')
  can2=can
  ctx2=ctx
  message=document.getElementById('message')

  document.getElementById('file-input').onchange= loadFile
  screenPos={x:0,y:100}
  currentWorld=starting.z
  initWorld()

  addCharacters()

  createTime()
  restart()

  selected=you[0]
  newOrLoad()

  setTimeout(initBackgrounds)
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
  slideTo(-1)
  centreScreen()
  charactersToDesign=[]
  controlled=creatures.filter(c=>c.controlled)
  resetView()
}

setup()
