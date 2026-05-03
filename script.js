"use strict";

const myLibrary = [];
const body = document.querySelector("body");
const cardsConatiner = document.createElement("div");
body.appendChild(cardsConatiner);

function Books(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.id = crypto.randomUUID();
  this.isRead = isRead;
  this.read = function () {
    if (this.isRead === true) {
      return `You've read the book!`;
    } else {
      return `Not read yet!`;
    }
  };
}

function addBookToLibrary(title, author, pages, isRead) {
  const book = new Books(title, author, pages, isRead);
  myLibrary.push(book);
}

const first = addBookToLibrary(
  "Crime and Punishment",
  "Dostoevsky",
  "551",
  true,
);
const second = addBookToLibrary("1984", "George Orwell", "328", false);
const third = addBookToLibrary("The Hobbit", "Tolkien", "310", true);

Books.prototype.toggleRead = function () {
  this.isRead = !this.isRead;
};

const booksOnPage = function () {
  cardsConatiner.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    const card = document.createElement("div");
    cardsConatiner.appendChild(card);
    card.classList = "card";
    card.textContent = `${myLibrary[i].title}, ${myLibrary[i].author}, ${myLibrary[i].pages}, ${myLibrary[i].isRead}`;
    const removeBtn = document.createElement("button");
    card.appendChild(removeBtn);
    removeBtn.classList = "removeBtn";
    removeBtn.textContent = "Remove";
    card.dataset.id = myLibrary[i].id;
    removeBtn.addEventListener("click", function () {
      const index = myLibrary.findIndex(function (book) {
        return book.id === card.dataset.id;
      });
      myLibrary.splice(index, 1);
      booksOnPage();
    });
    const readBtn = document.createElement("button");
    card.appendChild(readBtn);
    readBtn.classList = "readBtn";
    readBtn.textContent = "Read";
    readBtn.addEventListener("click", function () {
      const bookIndex = myLibrary.findIndex(function (book) {
        return book.id === card.dataset.id;
      });
      myLibrary[bookIndex].toggleRead();
      booksOnPage();
    });
  }
};

booksOnPage();

const form = document.createElement("div");
body.appendChild(form);
form.classList = "form";
const placeHolders = ["Title", "Author", "Pages", "IsRead"];

for (let i = 0; i < 4; i++) {
  const input = document.createElement("input");
  body.appendChild(input);
  form.appendChild(input);
  input.classList = "input";
  input.placeholder = placeHolders[i];
  input.id = placeHolders[i];
}

const newBook = document.createElement("button");
body.appendChild(newBook);
newBook.classList = "newBook";
newBook.textContent = "New Book";

form.style.display = "none";

newBook.addEventListener("click", function () {
  form.style.display = "flex";
});

const submitBtn = document.createElement("button");
form.appendChild(submitBtn);
submitBtn.classList = "submitBtn";
submitBtn.textContent = "Submit";

submitBtn.addEventListener("click", function (event) {
  event.preventDefault();
  const value1 = document.getElementById("Title").value;
  const value2 = document.getElementById("Author").value;
  const value3 = document.getElementById("Pages").value;
  const value4 = document.getElementById("IsRead").value;
  addBookToLibrary(value1, value2, value3, value4);
  booksOnPage();
});
