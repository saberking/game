const min = Math.min
const max = Math.max
const abs = Math.abs
const floor=Math.floor
const ceil=Math.ceil
const round=Math.round
const random=Math.random
const sqrt=Math.sqrt
const merge=(a,b={},c={})=>Object.assign({},a,b,c)
const $=document.getElementById
const d20 = (c) => {
  let bonus=c&&c.status.luc?c.status.luc/5:0
  bonus=0
  return ceil(Math.random() *20*(1+bonus))
}
const rss=arr=>{
  let total=0
  arr.forEach(a=>total+=a*a)
  return sqrt(total)
}
const alphabetic=arr=>arr.slice().sort((m1,m2)=>m1.charCodeAt(0)-m2.charCodeAt(0))
