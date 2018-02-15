const openTravelDialog=()=>{
  console.log(savedDestinations,worldNames)
  info('Where do you want to go?',null,
  savedDestinations.filter(d=>d!==currentWorld).map(d=>({
    text:worldNames[d],
    function:()=>{travelTo(startingPos[d])}
  })))
}
