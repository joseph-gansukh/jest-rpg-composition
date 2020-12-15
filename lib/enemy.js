const potion = require('./potion')
const {stats, health, attack} = require('./utils') 

const description = properties => ({
  getDescription: () => {
   return `A ${properties.name} holding a ${properties.weapon} has appeared!` 
  }
})

const enemy = (name, weapon) => {
  let properties ={
    name,
    weapon,
    health: Math.floor(Math.random() * 10 + 95),
    strength: Math.floor(Math.random() * 5 + 7),
    agility: Math.floor(Math.random() * 5 + 7),
    potion: potion()
  }

  return Object.assign(
    properties,
    stats(properties),
    health(properties),
    attack(properties),
    description(properties)
  )
}

module.exports = enemy

