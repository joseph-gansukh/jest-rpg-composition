const player = require('../lib/player')
const potion = require('../lib/potion')

jest.mock('../lib/potion')

potion.mockImplementation(() => ({
  type: 'health',
  value: 20
}))

// console.log('mock', potion())

test('should create a player object', () => {
  const newPlayer = player('Dave')

  expect(newPlayer.name).toBe('Dave');
  expect(newPlayer.health).toEqual(expect.any(Number))
  expect(newPlayer.strength).toEqual(expect.any(Number))
  expect(newPlayer.agility).toEqual(expect.any(Number))
  expect(newPlayer.inventory).toEqual(
    expect.arrayContaining([expect.any(Object)])
  )
})

test(`should should get player's stats as an object`, () => {
  const newPlayer = player('Dave')

  expect(newPlayer.getStats()).toHaveProperty('health')
  expect(newPlayer.getStats()).toHaveProperty('strength')
  expect(newPlayer.getStats()).toHaveProperty('agility')
  expect(newPlayer.getStats()).toHaveProperty('potions')
})

test('should get inventory from player or return false', () => {
  const newPlayer = player('Dave')
  expect(newPlayer.getInventory()).toEqual(expect.any(Array))

  newPlayer.inventory = []
  expect(newPlayer.getInventory()).toEqual(false)
})

test(`should get player's health value`, () => {
  const newPlayer = player('Dave')

  expect(newPlayer.getHealth()).toEqual(expect.stringContaining(newPlayer.health.toString()))
})

test(`should check if player is alive or not`, () => {
  const newPlayer = player('Dave')

  expect(newPlayer.isAlive()).toBeTruthy()

  newPlayer.health = 0

  expect(newPlayer.isAlive()).toBeFalsy()
})

test(`should substract from player's health`, () => {
  const newPlayer = player('Dave')
  const oldHealth = newPlayer.health

  newPlayer.reduceHealth(5)

  expect(newPlayer.health).toBe(oldHealth - 5)
  
  newPlayer.reduceHealth(99999)
  expect(newPlayer.health).toBe(0)
})

test(`should get player's attack value`, () => {
  const newPlayer = player('Dave')
  newPlayer.strength = 10;

  expect(newPlayer.getAttackValue()).toBeGreaterThanOrEqual(5)
  expect(newPlayer.getAttackValue()).toBeLessThanOrEqual(15)
})

test(`should add a potion to the inventory`, () => {
  const newPlayer = player('Dave')
  const oldCount = newPlayer.inventory.length

  newPlayer.addPotion(potion())
  expect(newPlayer.inventory.length).toBeGreaterThan(oldCount)
})

test(`should use a potion from inventory`, () => {
  const newPlayer = player('Dave')
  newPlayer.inventory = [potion(), potion(), potion()]
  const oldCount = newPlayer.inventory.length

  newPlayer.usePotion(1)

  expect(newPlayer.inventory.length).toBeLessThan(oldCount)
})
