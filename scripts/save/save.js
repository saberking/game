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
