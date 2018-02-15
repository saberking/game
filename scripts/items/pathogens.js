const cold = {
  type:'pathogen',
  name:'cold',
  picName:'bottle',
  poisonEffects:[{score:str,amount:-2,type:norm}]
}
items.push(cold)
const meningitis={
  type:'pathogen',
  name:'meningitis',
  picName:'bottle',
  poisonEffects:[{score:str, amount:-2, type:norm},{score:int,amount:-3,type:norm},{score:dex,amount:-2,type:norm}]
}
items.push(meningitis)
