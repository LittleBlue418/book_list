class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {

  addBookToList(book) {
    const list = document.getElementById('book-list')

    // Create table row (tr)
    const row = document.createElement('tr');

    // Insert cols
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
    `;

    list.appendChild(row);
  }

  showAlert(message, className) {
    // Create Div
    const div = document.createElement('div');

    // Add a class name
    div.className = `alert ${className}`;

    // Add test
    div.appendChild(document.createTextNode(message));

    // Get parent
    const container = document.querySelector('.container');

    // Get item that comes directly before the alert
    const form = document.querySelector('#book-form');

    // target container, insert before method
    // insert the div, before the form
    container.insertBefore(div, form);

    // Timeout after 3 secs
    setTimeout(function () {
      document.querySelector('.alert').remove();
    }, 3000);
  }

  deleteBook(target) {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}

class Store {
  static getBooks(){
    // getting our books from local storage
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static displayBooks() {
    // get books
    const books = Store.getBooks();

    books.forEach(function(book){
      // Instantiate a new UI object
      const ui = new UI;

      // Add book to UI
      ui.addBookToList(book);
    })

  }

  static addBook(book) {
    // get existing books
    const books = Store.getBooks();

    // Add the new book
    books.push(book);

    // Push whole thing to local storage
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();
    books.forEach(function(book, index){
      if(book.isbn === isbn) {
        books.splice(index, 1);
      }
    })
    localStorage.setItem('books', JSON.stringify(books));
  }
}


// EVENT LISTENERS

// DOM load event
document.addEventListener('DOMContentLoaded', Store.displayBooks);


// Event listener for add book
document.getElementById('book-form').addEventListener('submit',
  function(e){
    e.preventDefault();

    // Get form values
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;

    // Instantiate Book
    const book = new Book(title, author, isbn);

    // Instantiate UI
    const ui = new UI();

    // Validate
    if (title === '' || author === '' || isbn === '') {

      // Error allert in the UI
      ui.showAlert('Please fill in all feilds', 'error')

    } else {

      // Add book to UI
      ui.addBookToList(book);

      // Add to Local Storage
      Store.addBook(book);

      // Show success
      ui.showAlert('The book has been sucessfully added', 'success')

      // Clear fields
      ui.clearFields();

    }
  });

// Event listener for Delete
document.getElementById('book-list').addEventListener('click',
  function(e) {
    e.preventDefault();

    // Instantiate UI
    const ui = new UI();

    // Call delete book method
    ui.deleteBook(e.target);

    // Delete from Local Storage
        // Traversing the DOM to get the isbn number
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    // Show allert
    ui.showAlert('The book has been sucessfully deleted!', 'success')

})