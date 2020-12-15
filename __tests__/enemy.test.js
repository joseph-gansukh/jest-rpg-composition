const enemy = require('../lib/enemy')
const potion = require('../lib/potion')

jest.mock('../lib/potion')

potion.mockImplementation(() => ({
  type: 'health',
  value: 20
}))

test('should create an enemy object', () => {
  const newEnemy = enemy('goblin', 'sword')

  expect(newEnemy.name).toBe('goblin');
  expect(newEnemy.weapon).toBe('sword');
  expect(newEnemy.health).toEqual(expect.any(Number))
  expect(newEnemy.strength).toEqual(expect.any(Number))
  expect(newEnemy.agility).toEqual(expect.any(Number))
  expect(newEnemy.potion).toEqual(expect.any(Object))
})

test("gets enemy's health value", () => {
  const newEnemy = enemy('goblin', 'sword');

  expect(newEnemy.getHealth()).toEqual(expect.stringContaining(newEnemy.health.toString()));
});

test('checks if enemy is alive or not', () => {
  const newEnemy = enemy('goblin', 'sword');

  expect(newEnemy.isAlive()).toBeTruthy();

  newEnemy.health = 0;

  expect(newEnemy.isAlive()).toBeFalsy();
});

test("gets enemy's attack value", () => {
  const newEnemy = enemy('goblin', 'sword');
  newEnemy.strength = 10;

  expect(newEnemy.getAttackValue()).toBeGreaterThanOrEqual(5);
  expect(newEnemy.getAttackValue()).toBeLessThanOrEqual(15);
});

test("subtracts from enemy's health", () => {
  const newEnemy = enemy('goblin', 'sword');
  const oldHealth = newEnemy.health;

  newEnemy.reduceHealth(5);

  expect(newEnemy.health).toBe(oldHealth - 5);

  newEnemy.reduceHealth(99999);

  expect(newEnemy.health).toBe(0);
});

test('gets a description of the enemy', () => {
  const newEnemy = enemy('goblin', 'sword');

  expect(newEnemy.getDescription()).toEqual(expect.stringContaining('goblin'));
  expect(newEnemy.getDescription()).toEqual(expect.stringContaining('sword'));
});