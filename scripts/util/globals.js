var can,can2,can3
var ctx,ctx2,ctx3
var combat
var continueDrawing=true
var dialogOpen=true
var dialog2Open=false
let selectingTarget=false
let onTargetSelect
let moveEndTime=Date.now()
let constructs=[]
let turnTrigger
var stillToMove
var selected
let scrollLeft,scrollRight,scrollUp,scrollDown
let screenPos
let zoneTriggers=[]
let itemId=0
let startingPos=[]
let events=[]
let initEvents=[]

var you=[]
let currentWorld=0
let creatureId = 0
var world=[]
let finishedLoop=true

var creatures = []
let controlled=[]
let bucket=[]
var searched=[]
var startDate=-1*floor(Date.now()/1000)
var date=1
let flatConstructs=[]
let nonFlatConstructs=[]
let savedDestinations=[5,6,9]

let zoomLevel=minZoom
let visibleCreatures
let queuedRoute
let message
