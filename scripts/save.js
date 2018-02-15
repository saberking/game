let save=()=>{
  let j=JSON.stringify(creatures)
  j+='++++'
   j+=JSON.stringify(searched)
   j+='++++'
   j+=date
   let seen=[]
   world.forEach((l,z)=>{
     l.forEach((c,x)=>{
       c.forEach((h,y)=>{
         if(h.seen)seen.push({x,y,z,seen:h.seen})
       })
     })
   })
   j+='++++'
   j+=JSON.stringify(seen)
   j+='++++'
   j+=JSON.stringify(events)
  var blob=new Blob([j], { type: 'text/plain' })
  var downloadLink = document.createElement('a');
        downloadLink.download = 'save';
          downloadLink.href = window.URL.createObjectURL(blob);
  downloadLink.click()
  addMessage('Save successful')
}

const parseText=text=>{
  closeDialog(false)
  continueDrawing=false
  setTimeout(()=>{
    resetWorld(()=>loadData(text))
  })
}
const loadData=text=>{
  if(combat)endBattle()
  let split=text.split('++++')
  let creaturesText=split[0]
  let worldText=split[1]
  if(split[2]){
    date=parseInt(split[2])
    startDate=date-floor(Date.now()/1000)
  }
  if(split[3]){
    let sn=JSON.parse(split[3])
    sn.forEach(({x,y,z,seen})=>{
      world[z][x][y].seen=seen
    })
  }
  if(split[4]){
    let ev=JSON.parse(split[4])
    console.log(events)
    console.log(ev)
    ev.forEach(e=>{if(talkEvent[e])talkEvent[e]()
    if(deathTriggers[e])deathTriggers[e]()})
    events=ev
  }
  let critters=JSON.parse(creaturesText)
  creatures=[]
  critters.forEach(c=>new Creature(c))
  creatureId=0;
  creatures.forEach(c=>{if(c.id>=creatureId)creatureId=c.id+1})
  for(let i = 0;i<noOfCharacters;i++) you[i]=creatures.find(c=>c.name===pcNames[i])
  currentWorld=you[0].z
  selected=you.find(y=>y.status.status==='active')
  continueDrawing=true
  endDesign()
  if(worldText){
    searched=JSON.parse(worldText)
    searched.forEach((id)=>constructs.find(c=>c.id===id).items=[])
  }
  console.log(you.map(y=>y.z),controlled.map(c=>c.z))
  centreScreen()
  document.body.onclick=null
  addMessage('load successful')
  restartLoop()
}

const load=()=>{
    document.getElementById('file-input').click()
}
const loadFile=event=>{
  console.log('load')
  console.log(constructs.filter(c=>c.name==='coach'))
  var fileToLoad = event.target.files[0];
  if (fileToLoad) {
    var reader = new FileReader();
    reader.onload = function(fileLoadedEvent) {
      var textFromFileLoaded = fileLoadedEvent.target.result;
      console.log('loaded txt')
      parseText(textFromFileLoaded)
    };
    reader.readAsText(fileToLoad, 'UTF-8');
  }

}
