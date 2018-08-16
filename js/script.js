/******************************************
Pagination separates a large list of students into 10
per page and lets you navigate through them using the
links at the bottom of the page or the search bar
******************************************/

const pageDiv = document.querySelector('.page');

// Calls the addPages function since some of the
// variables require this to be done first
addPages(Math.ceil(document.querySelectorAll('li').length / 10), pageDiv);

const liList = document.querySelector('.student-list').querySelectorAll('li');
const pageHeaderDiv = document.querySelector('.page-header');
const anchorList = pageDiv.querySelector('.pagination').querySelectorAll('a');

// Hides all of the student elements based on the page number
// and the elements that matched the search (newElementList)
function hideItem(elementList, currentPageNumber, newElementList) {
  if (newElementList != null) {

    // Makes only the elements in the newElementList visible
    for (let i = 0; i < elementList.length; i++) {
      if (newElementList.includes(elementList[i])) {
        elementList[i].style.display = '';
      } else {
        elementList[i].style.display = 'none';
      }
    }

    // Hides all of the elements in the newElementList
    // that are not in the current page
    for (let i = 0; i < newElementList.length; i++) {
      if (i > currentPageNumber * 10 - 1 || i < currentPageNumber * 10 - 10) {
        newElementList[i].style.display = 'none';
      } else {
        newElementList[i].style.display = '';
      }
    }
  } else {

    // Hides all of the elements in the elementList
    // that are not in the current page
    for (let i = 0; i < elementList.length; i++) {
      if (i > currentPageNumber * 10 - 1 || i < currentPageNumber * 10 - 10) {
        elementList[i].style.display = 'none';
      } else {
        elementList[i].style.display = '';
      }
    }
  }
}

// Creates the html for multiple links inside of
// the div based on the required numberOfPages
function addPages(numberOfPages, div) {

  // Erases the contents of the pagination div if it has already been
  // created since this function needs to be called more than once
  if (div.querySelector('.pagination') != null) {
    div.querySelector('.pagination').innerHTML = '';
  } else {
    div.innerHTML += ('<div class="pagination"></div>');
  }
  div.querySelector('.pagination').innerHTML += ('<ul></ul>');

  // Adds links for every page making sure that
  // the first page gets the class of "active"
  for (let i = 1; i < numberOfPages + 1; i++) {
    if (i === 1) {
      div.querySelector('.pagination').querySelector('ul')
         .innerHTML += (`<li>
                           <a class="active" href="#">${i}</a>
                         </li>`);
    } else {
      div.querySelector('.pagination').querySelector('ul')
         .innerHTML += (`<li>
                           <a href="#">${i}</a>
                         </li>`);
    }
  }
}

// Changes the page based on what is entered in the search input
function search(div, elementList, anchorList) {
  div.innerHTML += (`<div class="student-search">
                       <input placeholder="Search for students...">
                       <button>Search</button>
                     </div>`);
  const searchButton = div.querySelector('button');
  const searchInput = div.querySelector('input');

  searchButton.addEventListener("click", () => {
      const newLiList = [];

      // Creates a new student list containing
      // everything that matched the search
      for (let i = 0; i < elementList.length; i++) {
        if (elementList[i].querySelector('h3').innerHTML.includes(searchInput.value)) {
          newLiList.push(elementList[i]);
        }
      }

      // Changes the entire page
      addPages(Math.ceil(newLiList.length / 10), pageDiv);
      hideItem(liList, 1, newLiList);
      const anchorList = document.querySelector('.pagination').querySelectorAll('a');
      anchorClick(newLiList, anchorList);

      if (newLiList.length === 0) {
        document.querySelector('.pagination').innerHTML += ('No results were found.');
      }
  });

// Makes the page update without the use of the search
// button, making the button kind of useless
  searchInput.onkeyup = () => {
    const newLiList = [];

    for (let i = 0; i < elementList.length; i++) {
      if (elementList[i].querySelector('h3').innerHTML.includes(searchInput.value)) {
        newLiList.push(elementList[i]);
      }
    }

    addPages(Math.ceil(newLiList.length / 10), pageDiv);
    hideItem(liList, 1, newLiList);
    const anchorList = document.querySelector('.pagination').querySelectorAll('a');
    anchorClick(newLiList, anchorList);

    if (newLiList.length === 0) {
      document.querySelector('.pagination').innerHTML += ('No results were found.');
    }
  }
}

// Makes it possible to change pages
function anchorClick(liList, anchorList) {

  let previousAnchor = anchorList[0];

  for (let i = 0; i < anchorList.length; i++) {
    anchorList[i].addEventListener("click", () => {

      // Makes the anchor tag that was clicked have the class of "active",
      // while removing the class from the previous anchor tag
      anchorList[i].classList.add("active");
      if (anchorList[i] != previousAnchor) {
        previousAnchor.classList.remove("active");
      }
      previousAnchor = anchorList[i];

      // Changes which students are hidden when the page changes
      let currentPage = anchorList[i].text;
      hideItem(liList, currentPage);
    });
  }
}

hideItem(liList, 1);
anchorClick(liList, anchorList);
search(pageHeaderDiv, liList, anchorList);
