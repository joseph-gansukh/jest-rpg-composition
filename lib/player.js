const potion = require('./potion')
const {stats, health, attack} = require('./utils')

const inventory = properties => ({
  getInventory: () => {
    if (properties.inventory.length > 0) {
      return [...properties.inventory]
    } else {
    return false
    }
  },
  addPotion: (potion) => properties.inventory.push(potion),
  usePotion: (index) => {
    const potion = properties.inventory.splice(index, 1)[0]

    switch (potion.name) {
      case 'agility':
        properties.agility += potion.value;
        break;
      case 'health':
        properties.health += potion.value;
        break;
      case 'strength':
        properties.strength += potion.value;
        break;
    }
  }
})

const player = name => {

  let properties = {
    name,
    health: Math.floor(Math.random() * 10 + 95),
    strength: Math.floor(Math.random() * 5 + 7),
    agility: Math.floor(Math.random() * 5 + 7),
    inventory: [potion('health'), potion()]
  }

  return Object.assign(
    properties,
    stats(properties),
    inventory(properties),
    health(properties),
    attack(properties)
  )
}

module.exports = player