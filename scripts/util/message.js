let messages = []
const addMessage=(text)=>{
  messages.push(text)
  if(messages.length > 20)messages.splice(0,1)
  let messageHTML = ''
  messages.forEach(m=>messageHTML+='<div style="margin-top:2">'+m+'</div>')
  let message=document.getElementById('message')
  // message.style.height=messages.length*30
  message.innerHTML=messageHTML
  document.getElementById('message2').scrollTo(0,document.getElementById('message2').scrollHeight)
}
