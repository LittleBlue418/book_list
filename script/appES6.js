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

// EVENT LISTENERS
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

    // Show allert
    ui.showAlert('The book has been sucessfully deleted!', 'success')

})