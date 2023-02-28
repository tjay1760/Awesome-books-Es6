import { BookCollection } from './modules/bookCollection.js';
import displayBook from './modules/bookDisplay.js';
import { DateTime } from './modules/luxon.js';

const dateLabel = document.querySelector('.date');
const myLuxon = DateTime.local();
const monthName = myLuxon.monthLong; // get the full name of the month
// eslint-disable-next-line max-len
const hour = myLuxon.hour % 12 === 0 ? 12 : myLuxon.hour % 12; // convert 24-hour time to 12-hour time
const amPm = myLuxon.hour < 12 ? 'am' : 'pm'; // determine if it's AM or PM

dateLabel.innerHTML = `${monthName} ${myLuxon.day} ${myLuxon.year} ${hour}:${myLuxon.minute.toString().padStart(2, '0')}:${myLuxon.second.toString().padStart(2, '0')} ${amPm}`;

const bookContainer = document.querySelector('.bookDisplay');
const bookCollection = localStorage.getItem('bookCollectionArray')
  ? new BookCollection(JSON.parse(localStorage.getItem('bookCollectionArray')))
  : new BookCollection([]);
bookCollection.bookArray.forEach((book) => {
  displayBook(book);
  if (document.querySelector(`#remove-${book.id}`)) {
    document
      .querySelector(`#remove-${book.id}`)
      .addEventListener(
        'click',
        bookCollection.removeBook.bind(bookCollection, book),
      );
  }
});
if (bookCollection.bookArray[0]) {
  bookContainer.style.border = 'solid 3px #000000';
} else bookContainer.style.border = 'none';

const addButton = document.querySelector('.addBtn');
const titleInput = document.querySelector('#titleInput');
const authorInput = document.querySelector('#authorInput');
addButton.addEventListener('click', () => {
  if (titleInput.value && authorInput.value) {
    bookCollection.addBook(titleInput.value, authorInput.value);
    titleInput.value = '';
    authorInput.value = '';
  }
});

document.querySelectorAll('.section').forEach((section) => {
  if (!(section.id === 'bookList')) section.style.display = 'none';
});

const navBar = document.querySelector('.navBar');
navBar.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.classList.contains('navLink')) {
    const anchorHref = e.target.href.split('#')[1];
    document.querySelectorAll('.section').forEach((section) => {
      if (section.id === anchorHref) section.style.display = 'flex';
      else section.style.display = 'none';
    });
  }
});