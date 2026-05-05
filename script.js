const body = document.querySelector("body");
const addBookBtn = document.getElementById("add-book");
const cardContainer = document.querySelector(".card-container");

const newBookTitle = document.querySelector("#new-book-title");
const newBookAuthor = document.querySelector("#new-book-author");
const newBookPages = document.querySelector("#new-book-pages");
const newBookStatus = document.querySelector("#new-book-status");

const formDialog = document.querySelector("#form-dialog");

const library = [];

function Book(title, author, pages, status){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.id = crypto.randomUUID();
}

Book.prototype.getInfo = function() {
    return `Title: ${this.title}, Author: ${this.author}, Pages: ${this.pages}, Read Status: ${this.status}`;
}

Book.prototype.toggleStatus = function() {
    if (this.status === true) this.status = false;
    else this.status = true;
    console.log(`toggled book: ${this.title} status: ${this.status}`);
}

Book.prototype.createToggleBtn = function() {
    this.toggleBtn = document.createElement("button");
    this.toggleBtn.setAttribute("class", "status-btn");
    this.bookCard.append(this.toggleBtn);
    this.toggleBtn.textContent = "Update Status";

    this.toggleBtn.addEventListener("click", (e) => {
        this.toggleStatus();
        this.bookStatusDiv.textContent = `Status: ${this.status}`;
    })
}

Book.prototype.createRemoveBtn = function() {
    this.removeBtn = document.createElement("button");
    this.removeBtn.setAttribute("class", "remove-btn");
    this.bookCard.append(this.removeBtn);
    this.removeBtn.textContent = "Remove";

    this.removeBtn.addEventListener("click", (e) => {
        console.log(`remove btn clicked for ${this.title}`);
        this.bookCard.remove();
        this.toggleBtn.remove();
        this.removeBtn.remove();
        const bookIndex = findBookIndex(this);
        library.splice(bookIndex, 1);
    })
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 310, true);

const theFellowshipoftheRing = new Book("The Fellowship of the Ring", "J.R.R. Tolkien", 423, true);

const theTwoTowers = new Book("The Two Towers", "J.R.R. Tolkien", 352, true);

const theReturnoftheKing = new Book("The Return of the King", "J.R.R. Tolkien", 416, true);

for (const book of library) {
    book.bookCard = document.createElement("p");
    book.bookCard.textContent = book.getInfo();
    cardContainer.append(book.bookCard);
    console.log(book.getInfo());
    book.createToggleBtn();
    book.createRemoveBtn();
}

function findBookIndex(book){
    const bookIndex = library.findIndex((element) => element.id === book.id)
    console.log(library[bookIndex].id);
    return bookIndex;
}

addBookBtn.textContent = "Add";
addBookBtn.addEventListener("click", (e) => {
    newBook();
    event.preventDefault();
})

function newBook(book) {
    let newBook;
    if(!book){
        newBook = new Book(newBookTitle.value, newBookAuthor.value, newBookPages.value, newBookStatus.checked);
    } else newBook = book;
    
    library.push(newBook);

    newBook.bookCard = document.createElement("div");

    newBook.bookTitleDiv = document.createElement("div");
    newBook.bookAuthorDiv = document.createElement("div");
    newBook.bookPagesDiv = document.createElement("div");
    newBook.bookStatusDiv = document.createElement("div");
    
    newBook.bookTitleDiv.textContent = `Title: ${newBook.title}`;
    newBook.bookAuthorDiv.textContent = `Author: ${newBook.author}`;
    newBook.bookPagesDiv.textContent = `Pages: ${newBook.pages}`;
    newBook.bookStatusDiv.textContent = `Status: ${newBook.status}`;
    
    cardContainer.append(newBook.bookCard);
    newBook.bookCard.append(newBook.bookTitleDiv);
    newBook.bookCard.append(newBook.bookAuthorDiv);
    newBook.bookCard.append(newBook.bookPagesDiv);
    newBook.bookCard.append(newBook.bookStatusDiv);

    newBook.bookCard.setAttribute("class", "book-card");

    newBook.bookTitleDiv.setAttribute("class", "book-title-div");
    newBook.bookAuthorDiv.setAttribute("class", "book-author-div");
    newBook.bookPagesDiv.setAttribute("class", "book-pages-div");
    newBook.bookStatusDiv.setAttribute("class", "book-status-div");

    newBook.createToggleBtn();
    newBook.createRemoveBtn();

    newBook.btnDiv = document.createElement("div");
    newBook.btnDiv.setAttribute("class", "btn-div");
    newBook.bookCard.append(newBook.btnDiv);
    newBook.btnDiv.append(newBook.toggleBtn);
    newBook.btnDiv.append(newBook.removeBtn);
    formDialog.hidePopover();
}

newBook(theHobbit);
newBook(theFellowshipoftheRing);
newBook(theTwoTowers);
newBook(theReturnoftheKing);