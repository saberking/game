const openTravelDialog=()=>{
  console.log(savedDestinations,worldNames)
  info('Where do you want to go?',null,
  savedDestinations.filter(d=>d!==currentWorld).map(d=>({
    text:worldNames[d],
    function:()=>{travelTo(startingPos[d])}
  })))
}
const travelTo=dest=>{
  closeDialog()
  currentWorld=dest.z
  resetView()
  creatures.forEach(c=>{
    if(c.controlled){
      c.z=currentWorld
      const {x,y,z}=dest
      position(c,x,y,z)
      centreScreen()
    }
  })
}
