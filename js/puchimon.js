console.log('Weclome to the Puchimon App')

const names = ['Jan', 'Piet', 'Pol']
const puchimons = []

const createPuchimon = function (name) {
  return {
    name: name,
    health: 100,
    damage: 20
  }
}

names.forEach((name) => {
  puchimons.push(createPuchimon(name))
})
