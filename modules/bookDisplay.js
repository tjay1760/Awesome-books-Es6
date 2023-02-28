const bookContainer = document.querySelector('.bookDisplay');
const displayBook = (book) => {
  bookContainer.insertAdjacentHTML(
    'beforeend',
    `<div class="book-details" id="book-${book.id}">
        <p>"${book.title}" by ${book.author}</p> 
        <button class="remove" type="button" id="remove-${book.id}">Remove</button>
      </div>`,
  );
};

export default displayBook;
