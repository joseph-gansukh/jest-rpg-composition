const potion = require('../lib/potion')

test('should create a health potion object', () => {
  let healthPotion = potion('health')

  expect(healthPotion.type).toBe('health')
  expect(healthPotion.value).toEqual(expect.any(Number))
})

test('should create a random potion object', () => {
  let randomPotion = potion();
  
  expect(randomPotion.type).toEqual(expect.any(String))
  expect(randomPotion.type.length).toBeGreaterThan(0)
  expect(randomPotion.value).toEqual(expect.any(Number))
})