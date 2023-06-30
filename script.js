function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Book {
    static bookNames = [
        'Officer With A UFO',
        
        'Mercenary Of Nowhere',
        
        'Beast Of Exploration',
        
        'Hero Of Sunshine',
        
        'Martians Of Outer Space',
        
        'Spies Of The New World',
        
        'Robots Of The Outlands',
        
        'Mercenaries Of The Crash',
        
        'Volunteers And Clones',
        
        'Creatures And Volunteers',
        
        'Creators And Traitors',
        
        'Defenders And Intruders',
        
        'Defeat Of Space',
        
        'Murder Of The Crash',
        
        'Signs Of New Worlds',
        
        'Extinction Of The Future',
        
        'Right For My Journey',
        
        'Basic A Nuclear Winter',
        
        'Anxious For The Mists',
        
        'Understanding The Revolution',
        
        'Joy Of The Sun',
        
        'Admiration For The End Of The Sun',
        
        'Lost In The Portal',
        
        'Origin Of The Portal'
    ]
    
    static namesList = [
        'Dee',
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
    static books = [

    ]

    constructor(name, author, cost) {
        this.name = name;
        this.author = author;
        this.cost = cost;
    }

    getID(id) {
        this.id = id;
    }
}

class Customer {
    ownedBooks = []
    constructor(balance) {
        this.balance = balance;
    }

    sell(book, id) {
        if (this.ownedBooks.includes(book)) {
            this.balance += book.cost;
            this.ownedBooks.splice(id, 1)
            Book.books.push(book)
            console.log("sold " + book.name)
            displayOwnedBooks()
        }
    }
}

//create a new customer named 'me'
me = new Customer(9999);

//generate 6 random books
for (let i = 0; i < 6; i++) {
    Book.books.push(new Book(Book.bookNames[getRandomInt(0,Book.bookNames.length - 1)], Book.namesList[getRandomInt(0,Book.namesList.length - 1)] + ' ' + Book.namesList[getRandomInt(0,Book.namesList.length - 1)], getRandomInt(2, 20)));
}

//getting the different elements from the document
const bookBG = document.getElementById("newBookMenuBG")
const submitButton = document.getElementById("submitButton")
const ownedBooksButton = document.getElementById("displayOwnedBooksButton")
const ownedBooksPanel = document.getElementById('ownedBooksPanel')

let nameText = document.getElementById("nameInput");
let authorText = document.getElementById("ageInput");
let costText = document.getElementById("costInput");
let bookContainer = document.getElementById("bookContainer")

function toggleMenu(menu) {
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

function showBookMenu() {
    authorText.value = ""
    nameText.value = ""
    costText.value = ""
    toggleMenu(bookBG)
}

ownedBooksButton.addEventListener('click', showOwnedBookMenu);

function showOwnedBookMenu() {
    displayOwnedBooks()
    toggleMenu(ownedBooksPanel)
}

function displayOwnedBooks() {
    const container = document.getElementById('ownedBooksPanelContainer');
    container.innerHTML = '';
    results = false;
    books = me.ownedBooks;
    if (books.length > 0) {
        for (i = 0; i < books.length; i++) {
            // Loop through the people array
            let book = books[i];

            book.bookID = i;

            let bookBox = document.createElement('div')
            bookBox.classList.add('book');

            // Create a paragraph to display the book's name and author

            let authorHeading = document.createElement("h1");
            let costHeading = document.createElement("h1");
            let nameHeading = document.createElement('h1')

            nameHeading.textContent = book.name;
            nameHeading.classList.add('nameText')

            authorHeading.textContent = 'Written by ' + book.author;
            authorHeading.classList.add('authorText')

            costHeading.textContent = book.cost + '$';
            costHeading.classList.add('costText')


            // Create a button for each book
            let buyButton = document.createElement("button");
            buyButton.textContent = "Sell book";
            buyButton.classList.add('buyButton')
            buyButton.addEventListener('click', me.sell.bind(book, book.bookID))



            // Append the button and paragraph to the container
            container.appendChild(bookBox);

            bookBox.appendChild(nameHeading);
            bookBox.appendChild(authorHeading);
            bookBox.appendChild(costHeading);

            bookBox.appendChild(buyButton);
        }
    } else {
        container.innerHTML = '<h1 class="logo" style="font-size: 80px; color: white; margin-top: 0; justify-self: center">No books to display.</h1>'
    }
}

function submitBooks() {

    if (nameText.value !== '' && authorText !== '' && Number.isInteger(parseInt(costText.value))) {
        newBook = new Book(nameText.value, parseInt(authorText.value), parseInt(costText.value))
        Book.books.push(newBook)
        console.log(newBook)

        console.log(newBook.name)
        toggleMenu(bookBG)
        displayBooks()
        console.log(Book.books[0])
    }
}

searchBar = document.getElementById("searchBar")

searchBar.addEventListener('input', displaySearchedBooks)

function displayBooks() {
    bookContainer.innerHTML = '';
    results = false;
    books = Book.books;
    const container = document.getElementById("bookContainer");
    if (books.length > 0) {
        for (i = 0; i < books.length; i++) {
            // Loop through the people array
            let book = books[i];

            book.bookID = i;

            let bookBox = document.createElement('div')
            bookBox.classList.add('book');

            // Create a paragraph to display the book's name and author

            let authorHeading = document.createElement("h1");
            let costHeading = document.createElement("h1");
            let nameHeading = document.createElement('h1')

            nameHeading.textContent = book.name;
            nameHeading.classList.add('nameText')

            authorHeading.textContent = 'Written by ' + book.author;
            authorHeading.classList.add('authorText')

            costHeading.textContent = book.cost + '$';
            costHeading.classList.add('costText')


            // Create a button for each book
            let buyButton = document.createElement("button");
            buyButton.textContent = 'Buy this book';
            buyButton.classList.add('buyButton')
            buyButton.addEventListener("click", buyBook.bind(null, book, me, book.bookID));



            // Append the button and paragraph to the container
            container.appendChild(bookBox);

            bookBox.appendChild(nameHeading);
            bookBox.appendChild(authorHeading);
            bookBox.appendChild(costHeading);

            bookBox.appendChild(buyButton);
        }
    } else {
        container.innerHTML = '<h1 class="logo" style="font-size: 80px; color: white; margin-top: 0; justify-self: center">No books to display.</h1>'
    }
}

function displaySearchedBooks() {
    results = false
    bookContainer.innerHTML = "";
    for (i = 0; i < Book.books.length; i++) {
        Book.books[i].getID(i);
        if(Book.books[i].name.toLowerCase().includes(searchBar.value.toLowerCase())) {
            results = true

            books = Book.books;
            const container = document.getElementById("bookContainer");
            let book = books[i];

            book.bookID = i;

            let bookBox = document.createElement('div')
            bookBox.classList.add('book');

            // Create a paragraph to display the book's name and author

            let authorHeading = document.createElement("h1");
            let costHeading = document.createElement("h1");
            let nameHeading = document.createElement('h1')

            nameHeading.textContent = book.name;
            nameHeading.classList.add('nameText')

            authorHeading.textContent = 'Written by ' + book.author;
            authorHeading.classList.add('authorText')

            costHeading.textContent = book.cost + '$';
            costHeading.classList.add('costText')


            // Create a button for each book
            let buyButton = document.createElement("button");
            buyButton.textContent = 'Buy this book';
            buyButton.classList.add('buyButton')
            buyButton.addEventListener("click", buyBook.bind(null, book, me, book.bookID));
            buyButton.addEventListener('mouseenter', function () {
                buyButton.classList.add('hover')
            })
            buyButton.addEventListener('mouseleave', function () {
                buyButton.classList.remove('hover')
            })



            // Append the button and paragraph to the container
            container.appendChild(bookBox);

            bookBox.appendChild(nameHeading);
            bookBox.appendChild(authorHeading);
            bookBox.appendChild(costHeading);

            bookBox.appendChild(buyButton);
        }
    }
    if (results === false) {
        bookContainer.innerHTML = '<h1 class="logo" style="font-size: 80px; color: white; margin-top: 0; justify-self: center">No search results.</h1>'
    }
}

function buyBook(book, customer, id) {
    if (Book.books.includes(book)) {
        if(book.cost < customer.balance) {
            customer.balance -= book.cost;
            customer.ownedBooks.push(book)
            Book.books.splice(id, 1)
            console.log("bought " + book.name)
        }
        else {
            console.log('not enough money')
        }
    } else {
        console.log('couldnt buy')
    }
    displayBooks()
}



const addBookButton = document.getElementById("addBookButton");

addBookButton.addEventListener("click", showBookMenu)
submitButton.addEventListener("click", submitBooks)
xbutton = document.getElementById('xbutton')
xbutton.addEventListener('click', function () {
    toggleMenu(bookBG)
})
dasb = document.getElementById('displayAllBooksButton')
dasb.addEventListener('click', function () {
    searchBar.value = ''
    displayBooks()
})

displayBooks()
setInterval(function () {
    balance = document.getElementById('balance')
    console.log(me.balance)
    balance.textContent = 'Current Balance:   ' + me.balance + '$';
}, 300);
