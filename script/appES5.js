// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}


// UI Constructor
function UI() {

}


// Event Listeners
document.getElementById('book-form').addEventListener('submit',
  function(e){
    e.preventDefault();

    // Get form values
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;

    // Instantiate Book
    const book = new Book(title, author, isbn);

    console.log(book)
  })