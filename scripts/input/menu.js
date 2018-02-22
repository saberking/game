const popup = (id, left, top) => {
  const pop = document.createElement('div')
  pop.id=id
  document.body.appendChild(pop)
  pop.style.top=top
  pop.style.left=left
  pop.style.position='absolute'
  return pop
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
