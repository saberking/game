let longTime=0,longCount=0

var longMove=(soFar,finish,func,lengthRemaining=maxLongMove,startCalcTime=Date.now())=>{

  let start=soFar[soFar.length-1]
  let dist=distance(start,finish)+length
  if(dist>lengthRemaining)return
  if(dist>distance(soFar[0],finish)*3+2)return
  if(start.x===finish.x&&start.y===finish.y)return soFar
  if(Date.now()-startCalcTime>maxCalcTime)return 'timeout'
  let xVec=start.x>finish.x?-1:1
  if(start.x===finish.x)xVec=0
  let yVec=start.y>finish.y?-1:1
  let options = []
  let vertical=[{x:start.x,y:start.y+2*yVec},{x:start.x-2,y:start.y+yVec},{x:start.x+2,y:start.y+yVec}]

  let v2=vertical.map(v=>Object.assign({},v,{y:2*start.y-v.y}))
  options=vertical.concat(v2)
  options.forEach(o=>o.z=finish.z)
  options.sort((a,b)=>(distance(a,finish)-distance(b,finish))*100+(max(abs(a.x-finish.x),abs(a.y-finish.y))-max(abs(b.x-finish.x),abs(b.y-finish.y))))


  let maxI=4

  for(let i = 0;i<maxI;i++){
    if(isNaN(options[i].x)||isNaN(options[i].y)){
      console.log(soFar)
      throw new Error()
    }
    if(func(start,options[i])){
      if(soFar.findIndex(s=>func(s,options[i]))===soFar.length-1){
        let route=longMove(soFar.concat([options[i]]),finish,func,lengthRemaining-1,startCalcTime)
        if(route){
          return route
        }
      }

    }
  }
}
