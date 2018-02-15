
var showHealth = ()=>{
  document.getElementById('health').style.display='inline'
  // document.getElementById('health').style.display='none'
  let healthHTML=''
  let index = 0
  let rv=controlled.slice().reverse()
  rv.forEach(c=>{
    const gb=((selected&&selected.id===c.id)?'117,157':'77,130')
    let readied=((c.thisTurn&&c.thisTurn.ap)||(c.nextTurn&&c.nextTurn.ap))
      healthHTML+=
          '<div style="position:absolute;bottom:5;right:'+index*104+
                  ';height:104;width:104;border-width:1;border-color:rgba(77,77,130,0.96);background-color:rgba(77,'+
                  gb+',0.7)" id="box'+c.name+'">'+
            '<div style="height:114,margin-top:-8;">'+
              '<div style="width:104;height:104;overflow:hidden">'+
                '<div   style="height:100;width:88;margin-left:15;margin-top:10;background-image:url(assets/sprites/'+
                          c.name+'.png);background-repeat:no-repeat"></div>'+
              '</div>'+
            '</div>'+

            '<div style="height:10"></div>'+
            '<div style="position:absolute;bottom:0;height:102;width:104" >'+

              '<div style=";height:10;background-color:pink;width:'+max(0,c.stats.str*5)+'" ></div>'+
              '<div style="height:10;background-color:cyan;width:'+max(0,c.stats.mag*5)+'" ></div>'+
            '</div>'+
            '<div style="position:absolute;bottom:0;height:102;width:104" >'+
              '<div style=";height:10;background-color:red;width:'+max(0,c.status.str*5)+'" ></div>'+
              '<div style="height:10;background-color:blue;width:'+max(0,c.status.mag*5)+'" ></div>'+
              (combat?'<span style="background-color:rgba(128,128,128,0.8);margin-top:10;top:10;font-size:20;padding-left:6;padding-right:6"> '+
              c.status.currentAp+
              (readied?' +'+readied:'')+' </span>':'')+'<div>'+
              // (combat&&!selectingTarget?getAvailableSpells(c).map((s,i)=>'<button id="'+s+'"style="position:absolute;top:-40;right:'+i*60+'"type="button" >'+s+'</button>').join(''):'')+
              '</div>'+
            '</div>'+
          '</div>'
      index++
  })
  document.getElementById('health').innerHTML=healthHTML
  controlled.forEach((c,i)=>{
    const box=  document.getElementById('box'+c.name)
     box.onclick=()=>{
       if(charactersToDesign.length)return
       if(shopping){
         if(c.id===selected.id){
           closeDialog()
         } else {
           selectCharacter(c)
           shop(shopping)
         }
       }else if(dialogOpen&&selected&&c.id===selected.id)closeDialog()
       else openStatsMenu(c)
     }
    //  box.oncontextmenu=(e)=>{
    //    e.preventDefault()
    //    e.stopPropagation()
    //    closeMenu()
    //    console.log(box)
    //    openCreatureMenu(c)
    // }
  })
  // spells.forEach(s=>{
  //   let b=document.getElementById(s.name)
  //   if(b){
  //     b.onclick=(e)=>{
  //       e.preventDefault()
  //       e.stopPropagation()
  //       castSpell(s)
  //     }
  //   }
  // })
}
const hideHealth=()=>document.getElementById('health').style.display='none'
