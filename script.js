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
    this.status = !this.status;
}

function createBtn(className, textContent) {
    const btn = document.createElement("button");
    btn.setAttribute("class", className)
    btn.textContent = textContent;

    return btn;
}

function addButtonsToCard(book, card, statusDiv) {
    const statusBtn = createBtn("status-btn", "Update Status");
    const removeBtn = createBtn("remove-btn", "Remove");

    const btnDiv = document.createElement("div");
    btnDiv.setAttribute("class", "btn-div");
    card.append(btnDiv);
    btnDiv.append(statusBtn);
    btnDiv.append(removeBtn);

    statusBtn.addEventListener("click", (e) => {
        book.toggleStatus();
        statusDiv.textContent = `Status: ${book.status}`;
    })

    removeBtn.addEventListener("click", (e) => {
        card.remove();
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

    const bookCard = document.createElement("div");
    const bookTitleDiv = document.createElement("div");
    const bookAuthorDiv = document.createElement("div");
    const bookPagesDiv = document.createElement("div");
    const bookStatusDiv = document.createElement("div");
    
    bookTitleDiv.textContent = `Title: ${newBook.title}`;
    bookAuthorDiv.textContent = `Author: ${newBook.author}`;
    bookPagesDiv.textContent = `Pages: ${newBook.pages}`;
    bookStatusDiv.textContent = `Status: ${newBook.status}`;
    
    cardContainer.append(bookCard);
    bookCard.append(bookTitleDiv);
    bookCard.append(bookAuthorDiv);
    bookCard.append(bookPagesDiv);
    bookCard.append(bookStatusDiv);

    bookCard.setAttribute("class", "book-card");
    bookTitleDiv.setAttribute("class", "book-title-div");
    bookAuthorDiv.setAttribute("class", "book-author-div");
    bookPagesDiv.setAttribute("class", "book-pages-div");
    bookStatusDiv.setAttribute("class", "book-status-div");

    addButtonsToCard(newBook, bookCard, bookStatusDiv);
    formDialog.hidePopover();
}

newBook(theHobbit);
newBook(theFellowshipoftheRing);
newBook(theTwoTowers);
newBook(theReturnoftheKing);