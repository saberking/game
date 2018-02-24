let constructId=0
const maxConstructHeight=16
const maxConstructWidth=12
const wallHeight=1

class Construct{
  constructor({
    zone,
    name,
    passable=false,
    actions=[],
    items=[],
    dest,
    id,
    height=wallHeight
  }){
    this.zone=zone
    this.name=name
    this.passable=passable
    this.image=new Image()
    this.actions=actions
    this.items=items
    this.dest=dest
    this.image.src='assets/constructs/'+this.name+'.png'
    this.id=id||constructId++
    this.height=height
    if(!passable){
      for(let x=zone.left;x<=zone.right;x++){
        for(let y=zone.top;y<=zone.bottom;y++){
          if(!world[zone.z][x]){
            console.log(zone.z,x)
          }
          world[zone.z][x][y].passable=false
        }
      }
    }
    constructs.push(this)
  }
}
const zone=(x,y,z,width=2,height=1)=>({top:y,bottom:y+height-1,left:x,right:x+width-1,z})
const addConstruct=(c,x,y,z,w=2,h=1,actions=[],items=[],height=wallHeight,passable=false)=>{
  new Construct({
    zone:zone(x,y,z,w,h),
    name:c,
    actions,
    items,
    height,
    passable
  })
}
const removeConstructs=(x,y,z,width=1,height=1)=>{
  for(let i=0;i<width;i++){
    for(let j=0;j<height;j++){
      constructs=constructs.filter(c=>!c.height||!inside({x:x+i,y:y+j,z},c.zone))
      if(!world[z][x+i]){
        console.log(z,x+i,world[z].length)
      }
      if(!world[z][x+i][y+j]){
        console.log(z,x+i,y+j,x,y)
      }
        world[z][x+i][y+j].blocking=''
        world[z][x+i][y+j].passable=true
    }
  }
}
const refreshConstructs=()=>{
  constructs=constructs.sort((a,b)=>a.zone.top-b.zone.top)
  flatConstructs=constructs.filter(c=>c.height===0)
  nonFlatConstructs=constructs.filter(c=>c.height)
  bucket=[]
  nonFlatConstructs.forEach(c=>{
    if(!bucket[c.zone.top])bucket[c.zone.top]=[]
    bucket[c.zone.top].push(c)
  })
  bucket.forEach(b=>b=b.sort((c,d)=>(c.zone.z-d.zone.z)*100+(d.name.toLowerCase().includes('wall')?1:-1)))
}
