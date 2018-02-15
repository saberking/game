const spellbook={
  type:'spellbook',
  name:'spellbook',
  picName:'spellbook'
}
const createSpellbook=(spell)=>modItem(spellbook,{spells:[spell.name],name:'Book of '+spell.name})
