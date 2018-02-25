const addRoof=(x,y,z,w,h)=>{
  new Construct({
    zone:zone(x,y,z,w,h),
    height:0,
    passable:true,
    type:'roof',
    name:'roof'
  })
}
