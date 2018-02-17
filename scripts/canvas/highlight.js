let highlightId=0
let highlights = []

const highlightHex = (color, c) => {
  highlights.push({
    color,
    x:c.x,
    y:c.y,
    id:highlightId++
  })
  const id=highlightId-1
  setTimeout(()=>highlights.splice(highlights.findIndex(h=>h.id===id),1),500)
}
let quarterHighlight=({x,y,color='white'})=>([{x,y,color,size:1},{x:x+1,y,color,size:1}])
                          // {x,y:y+1,color:'white',size:1},{x:x+0.5,y:y+1,color:'white',size:1}])
const getHighlight=()=>{
  let hi=[]
  for(let i=minheight[currentWorld];i<=maxheight[currentWorld];i++)hi[i]=[]
  let c
  if(stillToMove)c=stillToMove[0]
  if(combat&&c){
    let range=floor(c.status.currentAp/2)
    range=2
    // let color=range?'white':'#77aaaa'
    if(range)adjacentHexes(c,min(range,2)).
      filter(h=>h.x!==c.x||h.y!==c.y).
      forEach(h=>{
        hi[h.y]=hi[h.y].concat(quarterHighlight(merge(h)))
        hi[h.y+1]=hi[h.y+1].concat(quarterHighlight({x:h.x,y:h.y+1}))
    })
    else{
      if(c.y-1>=minheight[currentWorld])
      hi[c.y-1]=hi[c.y].concat(quarterHighlight({x:c.x,y:c.y-1}))
      if(c.x-1>=minwidth[currentWorld]){
        hi[c.y].push({color:'white',size:1,x:c.x-1,y:c.y})
        hi[c.y+1].push({color:'white',size:1,x:c.x-1,y:c.y+1})
      }
      if(c.x+2<=maxwidth[currentWorld]){
        hi[c.y].push({color:'white',size:1,x:c.x+2,y:c.y})
        hi[c.y+1].push({color:'white',size:1,x:c.x+2,y:c.y+1})
      }
      if(c.y+2<=maxheight[currentWorld])hi[c.y+2]=hi[c.y+2].concat(quarterHighlight({x:c.x,y:c.y+2}))
    }
  }
  if(!combat&&selected&&!selected.moving&&Date.now()-moveEndTime>100){
    hi[selected.y]=hi[selected.y].concat(quarterHighlight(selected))
    hi[selected.y+1]=hi[selected.y+1].concat(quarterHighlight({x:selected.x,y:selected.y+1}))
  }
  highlights.forEach(h=>{
    hi[h.y]=hi[h.y].concat(quarterHighlight(h))
    hi[h.y+1]=hi[h.y+1].concat(quarterHighlight(Object.assign({},h,{y:h.y+1})))
  })
  return hi
}

var showHighlight = (squares) => {
  if(!squares)return
  ctx.globalAlpha = 0.16
  squares.forEach(s=>colorRect(s))
  ctx.globalAlpha = 1
}
