let shopping=false


const shop = c=>{
  shopping=c
  let item=(i,price)=>'<span style="position:relative;width:64;height:64" id="item'+i.id+'"><img src="assets/items/'+i.picName+'.png"/><span style="font-size:20;position:absolute;right:0;bottom:0;background-color:rgba(136,136,136,0.6)">'+price+'</span></span>'
  let html='<div class="style1"><div style="padding:50;position:relative;display:inline-block;width:300"><div style="background-color:rgba(136,136,136,0.6)">Buy</div>'
  c.items.forEach(i=>{
    html+=item(i,i.value*i.quantity)
  })
  html+='</div><div style="position:absolute;top:0;left:460;width:300;padding:50"><div style="background-color:rgba(136,136,136,0.6)">Sell</div>'
  selected.items.forEach(i=>{
      html+=item(i,floor(i.value*i.quantity/3))
  })
  html+='</div></div>'
  document.getElementById('dialog').innerHTML=html
  c.items.forEach(i=>{
    const it = document.getElementById('item'+i.id)
    if(it){
      it.onclick=buy(c, i)
      it.oncontextmenu=e=>showItemStats(e,i)
    }
  })
  selected.items.forEach(i=>{
    const it = document.getElementById('item'+i.id)
    if(it){
      it.onclick=sell(c,i)
      it.oncontextmenu=e=>showItemStats(e,i)
    }
  })
  setTimeout(openDialog)
}

const buy = (c,i)=>()=>{
  if(selected.gold>=i.value*i.quantity){
    selected.gold-=i.value*i.quantity
    c.gold+=i.value*i.quantity
    addToInventory(selected,i)
    c.items.splice(c.items.findIndex(item=>item.id===i.id),1)
    shop(c)
  }
}

const sell=(c,i)=>()=>{
  if(c.gold>=floor(i.value*i.quantity/3)){
    selected.gold+=floor(i.value*i.quantity/3)
    c.gold-=floor(i.value*i.quantity/3)
    selected.items.splice(selected.items.findIndex(item=>item.id===i.id),1)
    c.items.push(i)
    shop(c)
  }
}
