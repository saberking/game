
var shopkeeper={
  name:'shopkeeper',
  display:'shopkeeper',

  trader: true,
  gold: 50,
}
var mayor={
  name:'mayor',
  chat:{
    state:0,
    questions:[
      {
        words:['job'],
        state:1,
        // event:'primeCoach',
        suggest:false
      }
    ],
    states:[
      {
        text:'Welcome and congratulations on defeating the dummy! I have a job if you are interested',
      },
      {
        text:'The nearby village of Tsong is being terrorised by the evil wizard king.'+
          ' He turns his followers into neo-Nazi zombies and has been using his spells to make the village\'s crops fail. '+
          'Your quest is to kill the evil wizard king and then return here for your reward. The coach at the gate will take you there.',
      }
    ]
  },
  deathTrigger:'mayor'
}

const tim={
  name:'tim',
  chat:{
    state:0,
    states:[
      {
        text:'You have to defeat a training dummy to prove you are worthy to speak to the mayor',
        answers:[
          {words:['ok'],
          state:1,
            event:'dummy',
          suggest:true}
        ],
      },
      {
        text:'Oh no! I accidentally overloaded the system. The dummy might be over-powered so watch out!',
      },
      {
        text:'Well done! you looked like you were having trouble there',
      }
    ]
  }
}
const kasparov={
  name:'kasparov',
  chat:{
    state:0,
    states:[
      {
        defaultAnswers:['ok'],
        text:'You must defeat me at chess or face the wrath of my skeletons',
        answers:[{words:['ok'],
          state:0,
          event:'chess',
          suggest:true
        }],
      }
    ]
  }
}

const farmer={
  name:'farmer',
}
