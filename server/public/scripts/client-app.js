$(document).ready(function () {
  getBooks();

  // add a book
  $('#book-submit').on('click', postBook);
  $('#filter').on('click', genreSelected);
});

function getBooksByGenre(genre) {
  $.ajax({
    type: 'GET',
    url: '/books/' + genre,
    success: function (books) {
      console.log("Books: ", books);
      updateBooksList(books);
    },

    error: function (response) {
      console.log('GET /books fail. No books could be retrieved!');
    },
  });
}

function genreSelected() {
  console.log("Click");
  var genre = $( "#selectMenu option:selected" ).text();
  var genre = genre.toLowerCase();
  $('#book-list').empty();
  getBooksByGenre(genre);
  return;
}

function updateBooksList(books) {
  books.forEach(function (book) {
    console.log("Book: ", book);
    var $el = $('<li></li>');
    $el.append('<strong>' + book.title + '</strong>');
    $el.append(' <em>' + book.author + '</em');
    $el.append(' <time>' + book.published + '</time>');
    $el.append(' <strong>' + book.genre + '</strong>');
    $('#book-list').append($el);
  });
}

/**
 * Retrieve books from server and append to DOM
 */
function getBooks() {
  $.ajax({
    type: 'GET',
    url: '/books',
    success: function (books) {
      updateBooksList(books);
    },

    error: function (response) {
      console.log('GET /books fail. No books could be retrieved!');
    },
  });
}
/**
 * Add a new book to the database and refresh the DOM
 */
function postBook() {
  event.preventDefault();

  var book = {};

  $.each($('#book-form').serializeArray(), function (i, field) {
    book[field.name] = field.value;
  });

  console.log('book: ', book);

  $.ajax({
    type: 'POST',
    url: '/books',
    data: book,
    success: function () {
      console.log('POST /books works!');
      $('#book-list').empty();
      getBooks();
    },

    error: function (response) {
      console.log('POST /books does not work...');
    },
  });
}
