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
const newBookAuthor = document.querySelector("#new-book-author");
const newBookPages = document.querySelector("#new-book-pages");
const newBookStatus = document.querySelector("#new-book-status");

const formDialog = document.querySelector("#form-dialog");

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
    this.toggleBtn = document.createElement("button");
    this.bookDisplay.append(this.toggleBtn);
    this.toggleBtn.textContent = "status btn";
    //this.toggleBtn.setAttribute("data-id", this.id);

    this.toggleBtn.addEventListener("click", (e) => {
        this.toggleRead();
        this.bookStatusDiv.textContent = `Status: ${this.read}`;
    })
}

Book.prototype.createRemoveBtn = function() {
    const removeBtn = document.createElement("button");
    this.removeBtn = removeBtn;
    this.bookDisplay.append(this.removeBtn);
    this.removeBtn.textContent = "Remove";

    this.removeBtn.addEventListener("click", (e) => {
        console.log(`remove btn clicked for ${this.title}`);
        this.bookDisplay.remove();
        this.toggleBtn.remove();
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
    book.bookDisplay = document.createElement("p");
    book.bookDisplay.textContent = book.getInfo();
    container.append(book.bookDisplay);
    console.log(book.getInfo());
    book.createToggleBtn();

    // book.btn.addEventListener("click", (e) => {
    //     book.toggleRead();
    //     book.newP.textContent = book.getInfo();
    // })

    book.createRemoveBtn();
}

function findBookIndex(book){
    // const bookIndex = bookArray.findIndex((element) => 
    //     element.id === book.id);
    const bookIndex = bookArray.findIndex(checkId, book);
    console.log(bookArray[bookIndex].id);
    return bookIndex;
}

function checkId(element) {
    return element.id === this.id;
}

// button: new book
// input field for new book info
// push new book to array when button clicked
addBookBtn.textContent = "Add";
addBookBtn.addEventListener("click", (e) => {
    // put input values into Book constructor
    // push to bookArray
    const newBook = new Book(newBookTitle.value, newBookAuthor.value, newBookPages.value, newBookStatus.checked);
    bookArray.push(newBook);

    // display info:
    // create new element
    // add book to text content
    // append to container
    newBook.bookDisplay = document.createElement("div");

    newBook.bookTitleDiv = document.createElement("div");
    newBook.bookAuthorDiv = document.createElement("div");
    newBook.bookPagesDiv = document.createElement("div");
    newBook.bookStatusDiv = document.createElement("div");
    
    newBook.bookTitleDiv.textContent = `Title: ${newBook.title}`;
    newBook.bookAuthorDiv.textContent = `Author: ${newBook.author}`;
    newBook.bookPagesDiv.textContent = `Pages: ${newBook.pages}`;
    newBook.bookStatusDiv.textContent = `Status: ${newBook.read}`;
    
    container.append(newBook.bookDisplay);
    newBook.bookDisplay.append(newBook.bookTitleDiv);
    newBook.bookDisplay.append(newBook.bookAuthorDiv);
    newBook.bookDisplay.append(newBook.bookPagesDiv);
    newBook.bookDisplay.append(newBook.bookStatusDiv);

    newBook.bookDisplay.setAttribute("class", "book-card");

    newBook.bookTitleDiv.setAttribute("class", "book-title-div");
    newBook.bookAuthorDiv.setAttribute("class", "book-author-div");
    newBook.bookPagesDiv.setAttribute("class", "book-pages-div");
    newBook.bookStatusDiv.setAttribute("class", "book-status-div");
        
    newBook.createToggleBtn();
    newBook.createRemoveBtn();
    formDialog.hidePopover();

    event.preventDefault();
})