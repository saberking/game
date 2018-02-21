let charactersToDesign = []
let designIndex=0
let clones=[]
let increasedStat=[]
let increasedSkill=[]
const characterComplete=(i)=>{
  return increasedSkill[i].length===2&&increasedStat[i].length===2
}
const increaseStatButton=(s,i)=>increaseButton(s,i,'Stat')

const increaseButton=(s,i,type)=>
  '<button style="background-color:#999988;position:absolute;top:0;left:280"onclick="increase'+type+'(\''+s+'\','+i+')">+</button>'

const designPic=c=>      '<div style="overflow:hidden;position:absolute;left:250;top:10;width:88;height:100"><img src="assets/sprites/'+c.name+'.png"/></div>'

const continueButton= (i)=>     createButton(25,'finishedCreation('+i+')','Continue')

const finishedCreation=(i)=>{
  charactersToDesign[i].checkStatus(true)
  if(charactersToDesign[i].level>1){
    charactersToDesign.splice(0,1)
    if(charactersToDesign.length)singleCharacterDesign()
    else closeDialog()
    return
  }
  if(i<noOfCharacters-1){
    slideTo(i+1)
  }else{
    closeDialog()
  }
}

const decreaseButton=(s,i,type)=>'<button style="background-color:#999988;position:absolute;top:0;left:190"onclick="decrease'+type+'(\''+s+'\','+i+')">-</button>'
const slideTo=(i)=>{
  console.log(i)
  let cont=document.getElementById('dialogContainer')
  cont.removeAttribute('class')
  cont.classList.add('slider'+i)
}
const removeClones=()=>{
  for(let i=0;i<noOfCharacters;i++){
    let c=document.getElementById('dialog_'+i)
    c&&c.remove()
  }
}
const characterDesign=()=>{
  let dialog=document.getElementById('dialog')
  charactersToDesign=[]
  for(let i = 0;i<noOfCharacters;i++){
    let clone=dialog.cloneNode(false)
    console.log(dialog.style.width,clone.style.width)
    clone.id='dialog_'+i

    let x=75+screenwidth*(i+1)
    clone.style.left=x

    document.getElementById('dialogContainer').appendChild(clone)

    charactersToDesign.push(you[i])
    increasedStat[i]=[]
    increasedSkill[i]=[]
    creation(i)
  }
}

const openLevelDialog=()=>{
  openDialog()
  let c=charactersToDesign[0]
  increasedSkill[0]=[]
  increasedStat[0]=[]
  // document.getElementById('continue').innerHTML='<div style="height:52"></div>'
  document.getElementById('dialog').innerHTML=
  header(c)+displayStats(c)+'<div style="position:absolute;left:500;top:150"id="skills"></div>'
  document.getElementById('skills').innerHTML=  displaySkills(c)+'<div id="continue_0"></div>'
  addSkillButtons()
  addStatButtons()
  statContext()
}
const levelUp=c=>{
  charactersToDesign.push(c)
  if(charactersToDesign.length===1)
  openLevelDialog()

}
