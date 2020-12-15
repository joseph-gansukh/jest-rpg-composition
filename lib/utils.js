const stats = properties => ({
  getStats: () => ({
    health: properties.health,
    strength: properties.strength,
    agility: properties.agility,
    potions: properties.inventory.length
  })
})

const health = properties => ({
  getHealth: () => `${properties.name}'s health is now ${properties.health}`,
  isAlive: () => properties.health === 0 ? false : true,
  reduceHealth: (amount) => {
    properties.health -= amount
    
    if (properties.health < 0) properties.health = 0
  }
})

const attack = properties => ({
  getAttackValue: () => {
    const min = properties.strength - 5
    const max = properties.strength + 5

    return Math.floor(Math.random() * (max - min) + min)
  }
})

module.exports = {stats, health, attack}