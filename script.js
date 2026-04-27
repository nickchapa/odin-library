// Book object constructor
// store books in array
// display each book
// button: new book
// button: remove book
// button: change read status

const body = document.getElementsByName("body");
const addBookBtn = document.getElementById("add-book");
const removeBookBtn = document.getElementById("remove-book");

const bookArray = [];

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.getInfo = function() {
    return `Title: ${this.title}, Author: ${this.author}, Pages: ${this.pages}, Read Status: ${this.read}`;
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
    newP = document.createElement("p");
    newP.textContent = book.getInfo();
    document.body.append(newP);
    console.log(book.getInfo());
}



// button: new book
// input field for new book info
// push new book to array when button clicked
addBookBtn.textContent = "add book";
addBookBtn.addEventListener("click", (e) => {
    console.log("button clicked")
    const newBookEx = new Book("")
    bookArray.push("book");
    console.log(bookArray);
    event.preventDefault();
})

// button: remove book
// next to specific book
removeBookBtn.textContent = "remove book";
removeBookBtn.addEventListener("click", (e) => {
    bookArray.pop();
    console.log(bookArray);
})

// button: change read status
// next to specific book