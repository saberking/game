var tracks = {
  "untitledd7z.mp3": {
    speed: 138,
    length: 16,
    vol: 1
  },
  "untitleddz.mp3": {
    speed: 137,
    length: 16,
    vol: 1
  },
  "untitledd2z.mp3": {
    speed: 137,
    length: 16,
    vol: 1
  }
}
var channel
const fadeTime = 1000
var audio = () => {
  channel=channel||document.getElementById('1')
  fade({from: 0, to:1, el:channel, time: fadeTime })
  const titles = Object.keys(tracks)
  var next = titles[floor(random()*titles.length)]
  channel.src=next
  setTimeout(()=>fade({from:1,to:0,el:channel,time:fadeTime,callback:audio}), tracks[next].length * 4 * 60000 / tracks[next].speed - fadeTime)
}
const fade = ({from, to, el, time, startTime=Date.now(), callback}) => {
  const now = Date.now()
  const fraction = (now - startTime) /time
  if(now-startTime > time) el.volume=to
  else el.volume=fraction*to+(1-fraction)*from
  if(el.volume!==to)setTimeout(()=>{
    fade({from, to, el, time, startTime, callback})
  },50)
  else if(callback){
    callback()
  }
}
