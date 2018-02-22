const displayName=n=>{
  let indices=[]
  for(let i=1;i<n.length;i++){
    if(n[i].toLowerCase()!==n[i])indices.push(i)
  }
  indices.push(n.length)
  let start=0
  let n2=''
  indices.forEach(i=>{
    n2+=n.substring(start,i)+' '
    start=i
  })
  return n2
}
