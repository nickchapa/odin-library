// Book object constructor
// store books in array
// display each book
// button: new book
// button: remove book
// button: change read status

const body = document.querySelector("body");
const addBookBtn = document.getElementById("add-book");
const removeBookBtn = document.getElementById("remove-book");
const container = document.querySelector(".container");

// input
const newBookTitle = document.querySelector("#new-book-title");

const bookArray = [];

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

Book.prototype.getInfo = function() {
    return `Title: ${this.title}, Author: ${this.author}, Pages: ${this.pages}, Read Status: ${this.read}`;
}

Book.prototype.toggleRead = function() {
    if (this.read === true) this.read = false;
    else this.read = true;
    console.log(`toggled book: ${this.title} status: ${this.read}`);
}

Book.prototype.createToggleBtn = function() {
    const btn = document.createElement("button");
    this.btn = btn;
    container.append(btn);
    btn.textContent = "status btn";
    btn.setAttribute("data-id", this.id);
}

Book.prototype.createRemoveBtn = function() {
    const removeBtn = document.createElement("button");
    this.removeBtn = removeBtn;
    container.append(this.removeBtn);
    this.removeBtn.textContent = "Remove";

    this.removeBtn.addEventListener("click", (e) => {
        console.log(`remove btn clicked for ${this.title}`);
        this.newP.remove();
        this.btn.remove();
        this.removeBtn.remove();
        const bookIndex = findBookIndex(this);
        bookArray.splice(bookIndex, 1);
    })
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 310, true);

const theFellowshipoftheRing = new Book("The Fellowship of the Ring", "J.R.R. Tolkien", 423, true);

const theTwoTowers = new Book("The Two Towers", "J.R.R. Tolkien", 352, true);

const theReturnoftheKing = new Book("The Return of the King", "J.R.R. Tolkien", 416, true);

bookArray.push(theHobbit);
bookArray.push(theFellowshipoftheRing);
bookArray.push(theTwoTowers);
bookArray.push(theReturnoftheKing);

for (const book of bookArray) {
    book.newP = document.createElement("p");
    book.newP.textContent = book.getInfo();
    container.append(book.newP);
    console.log(book.getInfo());
    book.createToggleBtn();

    book.btn.addEventListener("click", (e) => {
        book.toggleRead();
        book.newP.textContent = book.getInfo();
    })

    book.createRemoveBtn();
}

function findBookIndex(book){
    // const bookIndex = bookArray.findIndex((element) => 
    //     element.id === book.id);
    const bookIndex = bookArray.findIndex(checkId, book);
    return bookIndex;
}

function checkId(element) {
    console.log(`book.id: ${this.id}`);
    return element.id === this.id;
}

// button: new book
// input field for new book info
// push new book to array when button clicked
addBookBtn.textContent = "add book";
addBookBtn.addEventListener("click", (e) => {
    // put input values into Book constructor
    // push to bookArray
    const newBook = new Book(newBookTitle.value, "rina", 120, true);
    bookArray.push(newBook);

    // display info:
    // create new element
    // add book to text content
    // append to container
    const bookDisplay = document.createElement("p");
    bookDisplay.textContent = `Title: ${newBook.title}, Author: ${newBook.author}, Pages: ${newBook.pages}, Read Status: ${newBook.read}`;
    container.append(bookDisplay);
    
    event.preventDefault();
})