# puchimon
Graphical Puchimon application in the browser

On 22/11/2018 we created classically an application to visualize the Puchimon game. In the following chapters we will inspect and explain this application step by step.

## Code details

### Confirm correct file is loaded

```javascript
console.log('Weclome to the Puchimon App')
```

The `console.log()` function will just print out a string value to the console in the browser (Developer tools / F12). This enables us to check if the JavaScript file is correctly linked in the HTML document and will give us feedback if everything is right.

### Create application data

```javascript
const names = ['Jan', 'Piet', 'Pol']
const puchimons = []
```

Here we create two arrays. The array `puchimons` is an empty array that we will fill later on with puchimon objects. To easily create those puchimon objects we will start with a list (array) of `names`. Later on we will create a function that will convert the names to more complex objects that will contain that name, together with other properties.

### Create puchimon objects

```javascript
const createPuchimon = function (name) {
  return {
    name: name,
    health: 100,
    damage: 20
  }
}
```

The function `createPuchimon` will take a single name (string) as argument, and will return a new complex object that will represent a puchimon object. It will add a `name`, `health` and `damage` property to those object.

### Convert name list to objects

```javascript
names.forEach((name) => {
  puchimons.push(createPuchimon(name))
})
```

Now that we can create objects that represent puchimons, lets iterate the list of names and create puchimon object for each of those names (with a `forEach()` loop). We will add the new object directly to the puchimon array that we defined earlier. This can be done with the `.push()` method.

### Clear table

```javascript
const clearList = function () {
  const rows = document.querySelectorAll('#playersList table tr')
  rows.forEach((row, index) => {
    if (index !== 0) {
      row.remove()
    }
  })
}
```

Now that we have created puchimon objects, lets display them in the webpage. Before we can start, we first need to empty the rows in the table. This will enable us to refresh the list automatically when updating any puchimon objects.

The `clearList` function will select the `table` element with an id of `playerList`, and will remove each row in that table. To prevent removing the first header row we can check if the `index` is equal to `0` or not.

### Show puchimons in table

```javascript
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
```

Now that we are able to start with an empty and fresh table, lets fill it with the data from the puchimon objects. Now we need to create a row (`tr`) and 4 columns (`td`) that will contain the properties of the objects.

Next we will add the content of the puchimon object to the columns as text. When the DOM nodes are ready, we can add them to the row, and add the row to the table (`appendChild()`).

### Show puchimons at startup

```javascript
document.addEventListener('DOMContentLoaded', () => {
  showPuchimons(puchimons)
})
```

Now we are able to show the list in the webpage. There is just one thing to keep in mind. The browser will create a DOM in the order of which all the elements are defined. This means that the JavaScript will be exectued **before** the table elements are defined. This means that when the JavaScript code is trying to find the table, that it won't be able to find it (it has not been defined yet when creating the DOM).

We can solve this problem by waiting until the DOM is ready. This can be done in JavaScript by using an `event`. This event will notify us when to run the code to show the puchimons in the table. In this case we need to wait until the `DOMContentLoaded` event is emitted on the `document` object.

### Make the fight button do something

```javascript
document.addEventListener('DOMContentLoaded', () => {
  showPuchimons(puchimons)

  const fightButton = document.getElementById('fightButton')
  fightButton.addEventListener('click', prepareAttack)
})
```

Now that the DOM is ready, we can also add an event handler to the fight button. In this case we will wait until and `click` event is emitted on the button, and we will execute the `prepareAttack` function.

### Let two puchimons fight

```javascript
const attack = function (attacker, victim) {
  // TODO: make a real attack here
  return `${attacker.name} fought with ${victim.name}. 
    ${victim.name} has now ${victim.health} health remaining`
}
```

Now that we are able to start an attack by pressing the fight button, lets create a function that will be able to execute the attack. This function is still empty and will need to be implemented.

The function will take an attacker and victim object, and will enable those two objects to interact with each other and update each other properties.

At the end, the function will create an attack report using and [JavaScript Template Literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals).

### Prepare an attack

```javascript
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
```

Before executing the attack between an attacker and victim, we need to pick two random puchimons out of the array. This still needs to implemented. For now we will take the first two puchimons out of the array.

Then the attack is executed using the previous method, and when ready the report will be added to the history list.

## Result

When combining all this code we get the following application.


```javascript
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
```