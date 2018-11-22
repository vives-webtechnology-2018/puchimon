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
  clearList()
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

  const fightButton = document.getElementById('fightButton')
  fightButton.addEventListener('click', prepareAttack)
})

const attack = function (attacker, victim) {
  // TODO: make a real attack here
  return `${attacker.name} fought with ${victim.name}. 
    ${victim.name} has now ${victim.health} health remaining`
}

const prepareAttack = function () {
  // TODO: choose random attacker and victim
  const attacker = puchimons[0]
  const victim = puchimons[1]
  const result = attack(attacker, victim)

  const historyList = document.getElementById('historyList')
  const listItem = document.createElement('li')
  listItem.textContent = result

  historyList.appendChild(listItem)

  showPuchimons(puchimons)
}

const clearList = function () {
  const rows = document.querySelectorAll('#playersList table tr')
  rows.forEach((row, index) => {
    if (index !== 0) {
      row.remove()
    }
  })
}
