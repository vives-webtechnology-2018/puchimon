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

const showPuchimons = function(puchimons) {
  puchimons.forEach((puchimon, index) => {
    const row = document.createElement('tr')
    const rankColumn = document.createElement('td')
    const nameColumn = document.createElement('td')
    const healthColumn = document.createElement('td')
    const damageColumn = document.createElement('td')

    rankColumn.textContent = `#${index + 1}`
    nameColumn.textContent = puchimon.name
    healthColumn.textContent = puchimon.health
    damageColumn.textContent = puchimon.damage

    row.appendChild(rankColumn)
    row.appendChild(nameColumn)
    row.appendChild(healthColumn)
    row.appendChild(damageColumn)

    const table = document.querySelector('#playersList table')
    table.appendChild(row)
  })
}

document.addEventListener('DOMContentLoaded', () => {
  showPuchimons(puchimons)

})
