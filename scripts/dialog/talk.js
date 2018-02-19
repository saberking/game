const getAnswers=c=>{
  let answers=[]
  if(c.chat.questions)c.chat.questions.forEach(q=>answers.push(q))
  if(c.chat.states[c.chat.state].answers)c.chat.states[c.chat.state].answers.forEach(a=>answers.push(a))
  return answers
}

const talk=(c)=>{
  if(c.chat){
    let {text}=c.chat.states[c.chat.state]
    document.getElementById('dialog').innerHTML=
      '<div style="min-height:100%"><div style="padding:20">'+
      header(c)+
      text+
      '<div style="padding-top:50"> </div><div id="contents"></div></div></div>'
    const reply=document.createElement('input')
    reply.type='text'
    const button=document.createElement('button')
    button.innerHTML='say'
    button.onclick=()=>{
      makeReply(c,reply.value)
    }
    document.getElementById('contents').appendChild(reply)
    document.getElementById('contents').appendChild(button)
    let defaultAnswers=getAnswers(c).filter(a=>a.suggest)
    if(defaultAnswers.length){
      const line2=document.createElement('div')
      line2.style.marginTop=30
      document.getElementById('contents').appendChild(line2)

      const replies=document.createElement('select')
      replies.style.width=200
      line2.appendChild(replies)
      replies.onchange=v=>reply.value=v
      for(let i=0;i<defaultAnswers.length;i++){
        let op=document.createElement('option')
        op.value=op.innerHTML=defaultAnswers[i].words[0]
        replies.appendChild(op)
      }
      reply.value=defaultAnswers[0].words[0]
    }
    setTimeout(    openDialog)
  }else throw new Error()
}

const makeReply=(c,r)=>{
  if(!r||!r.length)return
  let answers=getAnswers(c)
  for(let i =0;i<answers.length;i++)
    for(let j=0;j<answers[i].words.length;j++)
      if(r.toLowerCase().includes(answers[i].words[j])){
        if(answers[i].event)setTimeout(talkEvent[answers[i].event],1000)
        c.chat.state=answers[i].state
      }
  talk(c)
}
