const zoom = ({deltaY})=>{
  for(let i = 0;i<abs(deltaY/10);i++){
    if(deltaY<0){
      if(zoomLevel>minZoom){
        screenPos={x:max(0,(screenPos.x+screenwidth/2)*(zoomLevel-0.05)/zoomLevel-screenwidth/2),
          y:max(0,(screenPos.y+screenheight/2)*(zoomLevel-0.05)/zoomLevel-screenheight/2)}
        zoomLevel-=0.05
      }
    }else{
      if(zoomLevel<1){
        screenPos={x:(screenPos.x+screenwidth/2)*(zoomLevel+0.05)/zoomLevel-screenwidth/2,
          y:(screenPos.y+screenheight/2)*(zoomLevel+0.05)/zoomLevel-screenheight/2}
        zoomLevel+=0.05
      }

    }
  }
}
