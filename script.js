function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Slave {
    static blackNames = [
        'Deion',
        'Deiondre',
        'Dele',
        'Denzel',
        'Dewayne',
        'Dikembe',
        'Duante',
        'Jamar',
        'Jevonte',
        'Kadeem',
        'Kendis',
        'Kentay',
        'Keshawn',
        'Khalon',
        'Kofi',
        'Kwamin',
        'Kyan',
        'Kyrone',
        'La Vonn',
        'Lado',
        'Laken',
        'Lakista',
        'Lamech',
        'Lavaughn',
        'LeBron',
        'Lisimba',
        'Ludacris',
        'Mablevi',
        'Marques',
        'Mashawn',
        'Montraie',
        'Mykelti',
        'Nabulung',
        'Naeem',
        'Napoleon',
        'Obiajulu',
        'Quaashie',
        'Quaddus',
        'Quadrees',
        'Quannell',
        'Quarren',
        'Quashawn',
        'Quintavius',
        'Quoitrel',
        'Raimy',
        'Rashon',
        'Razi',
        'Roshaun',
        'Runako',
        'Salim'
    ]
    static slaves = [

    ]

    constructor(name, age, cost) {
        this.name = name;
        this.age = age;
        this.cost = cost;
    }

    getID(id) {
        this.id = id;
    }
}

class Customer {
    ownedSlaves = []
    constructor(balance) {
        this.balance = balance;
    }

    sell(slave, id) {
        if (this.ownedSlaves.includes(slave)) {
            this.balance += slave.cost;
            this.ownedSlaves.splice(id, 1)
            Slave.slaves.push(slave)
            console.log("sold " + slave.name)
            displayOwnedSlaves()
        }
    }
}

me = new Customer(9999);

for (i = 0; i < 5; i++) {
    Slave.slaves.push(new Slave(Slave.blackNames[getRandomInt(0,Slave.blackNames.length - 1)] + '\n' + Slave.blackNames[getRandomInt(0,Slave.blackNames.length - 1)], getRandomInt(12,56), getRandomInt(1000, 10000)));
}

const slaveMenu = document.getElementById("slaveMenu");
const slavebg = document.getElementById("slavebg")
const submitButton = document.getElementById("submitButton")
const ownedSlavesButton = document.getElementById("displayOwnedSlavesButton")
const ownedSlavesPanel = document.getElementById('ownedSlavesPanel')

var nameText = document.getElementById("nameInput");
var ageText = document.getElementById("ageInput");
var costText = document.getElementById("costInput");
var slaveContainer = document.getElementById("slaveContainer")

function fadeInOut(menu) {
    if (menu.classList.contains("active")) {
        menu.classList.remove("active")
        setTimeout(function () {
            menu.style.visibility = "hidden"
        },300);
    } else {
        menu.classList.add("active");
        menu.style.visibility = "visible"
    }
}

function showSlaveMenu() {
    ageText.value = ""
    nameText.value = ""
    costText.value = ""
    fadeInOut(slavebg)
}

ownedSlavesButton.addEventListener('click', showOwnedSlaveMenu);

function showOwnedSlaveMenu() {
    displayOwnedSlaves()
    fadeInOut(ownedSlavesPanel)
}

function displayOwnedSlaves() {
    const container = document.getElementById('ownedSlavesPanelContainer');
    container.innerHTML = '';
    results = false;
    slaves = me.ownedSlaves;
    if (slaves.length > 0) {
        for (i = 0; i < slaves.length; i++) {
            // Loop through the people array
            var slave = slaves[i];

            slave.slaveID = i;

            var slaveBox = document.createElement('div')
            slaveBox.classList.add('slave');

            // Create a paragraph to display the slave's name and age

            var ageHeading = document.createElement("h1");
            var costHeading = document.createElement("h1");
            let nameHeading = document.createElement('h1')

            nameHeading.textContent = slave.name;
            nameHeading.classList.add('nameText')

            ageHeading.textContent = slave.age + ' years old';
            ageHeading.classList.add('ageText')

            costHeading.textContent = slave.cost + '$';
            costHeading.classList.add('costText')


            // Create a button for each slave
            var buyButton = document.createElement("button");
            buyButton.textContent = "Sell " + slave.name;
            buyButton.classList.add('buyButton')
            buyButton.addEventListener('click', me.sell.bind(slave, slave.slaveID))



            // Append the button and paragraph to the container
            container.appendChild(slaveBox);

            slaveBox.appendChild(nameHeading);
            slaveBox.appendChild(ageHeading);
            slaveBox.appendChild(costHeading);

            slaveBox.appendChild(buyButton);
        }
    } else {
        container.innerHTML = '<h1 class="logo" style="font-size: 80px; color: white; margin-top: 0; justify-self: center">No slaves to display.</h1>'
    }
}

function submitSlaves() {

    if (nameText.value != '' && Number.isInteger(parseInt(ageText.value)) && Number.isInteger(parseInt(costText.value))) {
        newSlave = new Slave(nameText.value, parseInt(ageText.value), parseInt(costText.value))
        Slave.slaves.push(newSlave)
        console.log(newSlave)

        console.log(newSlave.name)
        fadeInOut(slavebg)
        displaySlaves()
        console.log(Slave.slaves[0])
    }
}

searchBar = document.getElementById("searchBar")

searchBar.addEventListener('input', displaySearchedSlaves)

function displaySlaves() {
    slaveContainer.innerHTML = '';
    results = false;
    slaves = Slave.slaves;
    const container = document.getElementById("slaveContainer");
    if (slaves.length > 0) {
        for (i = 0; i < slaves.length; i++) {
            // Loop through the people array
            var slave = slaves[i];

            slave.slaveID = i;

            var slaveBox = document.createElement('div')
            slaveBox.classList.add('slave');

            // Create a paragraph to display the slave's name and age

            var ageHeading = document.createElement("h1");
            var costHeading = document.createElement("h1");
            let nameHeading = document.createElement('h1')

            nameHeading.textContent = slave.name;
            nameHeading.classList.add('nameText')

            ageHeading.textContent = slave.age + ' years old';
            ageHeading.classList.add('ageText')

            costHeading.textContent = slave.cost + '$';
            costHeading.classList.add('costText')


            // Create a button for each slave
            var buyButton = document.createElement("button");
            buyButton.textContent = "Buy " + slave.name;
            buyButton.classList.add('buyButton')
            buyButton.addEventListener("click", buySlave.bind(null, slave, me, slave.slaveID));



            // Append the button and paragraph to the container
            container.appendChild(slaveBox);

            slaveBox.appendChild(nameHeading);
            slaveBox.appendChild(ageHeading);
            slaveBox.appendChild(costHeading);

            slaveBox.appendChild(buyButton);
        }
    } else {
        container.innerHTML = '<h1 class="logo" style="font-size: 80px; color: white; margin-top: 0; justify-self: center">No slaves to display.</h1>'
    }
}

function displaySearchedSlaves() {
    results = false
    slaveContainer.innerHTML = "";
    for (i = 0; i < Slave.slaves.length; i++) {
        Slave.slaves[i].getID(i);
        if(Slave.slaves[i].name.toLowerCase().includes(searchBar.value.toLowerCase())) {
            results = true

            slaves = Slave.slaves;
            const container = document.getElementById("slaveContainer");
            var slave = slaves[i];

            slave.slaveID = i;

            var slaveBox = document.createElement('div')
            slaveBox.classList.add('slave');

            // Create a paragraph to display the slave's name and age

            var ageHeading = document.createElement("h1");
            var costHeading = document.createElement("h1");
            let nameHeading = document.createElement('h1')

            nameHeading.textContent = slave.name;
            nameHeading.classList.add('nameText')

            ageHeading.textContent = slave.age + ' years old';
            ageHeading.classList.add('ageText')

            costHeading.textContent = slave.cost + '$';
            costHeading.classList.add('costText')


            // Create a button for each slave
            var buyButton = document.createElement("button");
            buyButton.textContent = "Buy " + slave.name;
            buyButton.classList.add('buyButton')
            buyButton.addEventListener("click", buySlave.bind(null, slave, me, slave.slaveID));
            buyButton.addEventListener('mouseenter', function () {
                buyButton.classList.add('hover')
            })
            buyButton.addEventListener('mouseleave', function () {
                buyButton.classList.remove('hover')
            })



            // Append the button and paragraph to the container
            container.appendChild(slaveBox);

            slaveBox.appendChild(nameHeading);
            slaveBox.appendChild(ageHeading);
            slaveBox.appendChild(costHeading);

            slaveBox.appendChild(buyButton);
        }
    }
    if (results === false) {
        slaveContainer.innerHTML = '<h1 class="logo" style="font-size: 80px; color: white; margin-top: 0; justify-self: center">No search results.</h1>'
    }
}

function buySlave(slave, customer, id) {
    if (Slave.slaves.includes(slave)) {
        if(slave.cost < customer.balance) {
            customer.balance -= slave.cost;
            customer.ownedSlaves.push(slave)
            Slave.slaves.splice(id, 1)
            console.log("bought " + slave.name)
        }
        else {
            console.log('not enough money')
        }
    } else {
        console.log('couldnt buy')
    }
    displaySlaves()
}



const addSlaveButton = document.getElementById("addSlaveButton");

addSlaveButton.addEventListener("click", showSlaveMenu)
submitButton.addEventListener("click", submitSlaves)
xbutton = document.getElementById('xbutton')
xbutton.addEventListener('click', function () {
    fadeInOut(slavebg)
})
dasb = document.getElementById('displayAllSlavesButton')
dasb.addEventListener('click', function () {
    searchBar.value = ''
    displaySlaves()
})

displaySlaves()
setInterval(function () {
    balance = document.getElementById('balance')
    console.log(me.balance)
    balance.textContent = 'Current Balance:   ' + me.balance + '$';
}, 300);

createMenu()
