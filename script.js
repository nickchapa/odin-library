const body = document.querySelector("body");
const addBookBtn = document.querySelector("#add-book");
const cardContainer = document.querySelector(".card-container");

const newBookTitle = document.querySelector("#new-book-title");
const newBookAuthor = document.querySelector("#new-book-author");
const newBookPages = document.querySelector("#new-book-pages");
const newBookStatus = document.querySelector("#new-book-status");

const formDialog = document.querySelector("#form-dialog");

addBookBtn.addEventListener("click", (e) => {
    newBook();
    e.preventDefault();
})

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
}

function createBtn(book, className, textContent) {
    const btn = document.createElement("button");
    btn.setAttribute("class", className)
    book.bookCard.append(btn);
    btn.textContent = textContent;

    return btn;
}

Book.prototype.createToggleBtn = function() {
    this.toggleBtn = document.createElement("button");
    this.toggleBtn.setAttribute("class", "status-btn");
    this.bookCard.append(this.toggleBtn);
    this.toggleBtn.textContent = "Update Status";

    this.toggleBtn.addEventListener("click", (e) => {
        this.toggleStatus();
    })
}

Book.prototype.createRemoveBtn = function() {
    this.removeBtn = document.createElement("button");
    this.removeBtn.setAttribute("class", "remove-btn");
    this.bookCard.append(this.removeBtn);
    this.removeBtn.textContent = "Remove";

    this.removeBtn.addEventListener("click", (e) => {
        this.bookCard.remove();
        this.toggleBtn.remove();
        this.removeBtn.remove();
        const bookIndex = findBookIndex(this);
        library.splice(bookIndex, 1);
    })
}

function addButtonsToCard(book) {
    const statusBtn = createBtn(book, "status-btn", "Update Status");
    const removeBtn = createBtn(book, "remove-btn", "Remove");

    const btnDiv = document.createElement("div");
    btnDiv.setAttribute("class", "btn-div");
    book.bookCard.append(btnDiv);
    btnDiv.append(statusBtn);
    btnDiv.append(removeBtn);

    statusBtn.addEventListener("click", (e) => {
        book.toggleStatus();
        book.bookStatusDiv.textContent = `Status: ${book.status}`;
    })

    removeBtn.addEventListener("click", (e) => {
        book.bookCard.remove();
        statusBtn.remove();
        removeBtn.remove();
        const bookIndex = findBookIndex(book);
        library.splice(bookIndex, 1);
    })
}

function findBookIndex(book){
    return bookIndex = library.findIndex((element) => element.id === book.id)
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 310, true);

const theFellowshipoftheRing = new Book("The Fellowship of the Ring", "J.R.R. Tolkien", 423, true);

const theTwoTowers = new Book("The Two Towers", "J.R.R. Tolkien", 352, true);

const theReturnoftheKing = new Book("The Return of the King", "J.R.R. Tolkien", 416, true);

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

    addButtonsToCard(newBook);
    formDialog.hidePopover();
}

newBook(theHobbit);
newBook(theFellowshipoftheRing);
newBook(theTwoTowers);
newBook(theReturnoftheKing);