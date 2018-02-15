const popup = (id, left, top) => {
  const pop = document.createElement('div')
  pop.id=id
  document.body.appendChild(pop)
  pop.style.top=top
  pop.style.left=left
  pop.style.position='absolute'
  return pop
}

const openMenu=(actions, {x, y})=>{
  if (actions.length) {
    const menu = popup('menu', zoomLevel*width*x-screenPos.x,zoomLevel*height*(y)-screenPos.y)
    actions.forEach(a => {
      const row = document.createElement('button')
      row.innerHTML=a.text
      row.id=a.text
      menu.appendChild(row)
      row.onclick=()=>{closeMenu();a.event()}
    })
  }
}



const closeMenu = (event) => {
  if(event){
    event.preventDefault()
    event.stopPropagation()
  }
  const menu = document.getElementById('menu')
  if (menu){menu.remove()}
}
const addButtonToMenu=(text)=>{
  const btn=document.createElement('button')
  btn.innerHTML=text
  document.getElementById('menu').appendChild(btn)
  return btn
}
