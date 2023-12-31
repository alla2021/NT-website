 //scroll
document.querySelector('.intro__btn-scroll').addEventListener('click', function() {
   scrollToElement('about');
});

function scrollToElement(elementId) {
   const element = document.getElementById(elementId);
   if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
   }
}

//search
const searchIcon = document.querySelector('.icon-search');
const headerSearch = document.querySelector('.header__search');

const searchInput = document.createElement('input');
searchInput.type = 'text';
searchInput.placeholder = 'Search...';
searchInput.classList.add('search-input');

function toggleSearchInput() {
   if (!headerSearch.contains(searchInput)) {
      headerSearch.appendChild(searchInput);
      searchInput.focus();
   } else {
      headerSearch.removeChild(searchInput);
   }
}

function performSearch() {
  const searchTerm = searchInput.value.trim().toLowerCase();

  const mainElementTexts = Array.from(document.querySelectorAll('div'))
  .map(element => element.innerText.toLowerCase().trim())
  .filter(text => text.trim() !== '' && text.trim() !== '\n');
  console.log(mainElementTexts)

  searchAndHighlight(mainElementTexts, searchTerm);
}

function searchAndHighlight(elementsText, searchTerm) {
  elementsText.forEach((text, index) => {
    const matches = findMatches(text, searchTerm);

    matches.forEach(match => {
      const element = document.querySelectorAll('div')[index];
      const span = document.createElement('span');
      span.classList.add('highlight');
      const matchedText = document.createTextNode(match);
      span.appendChild(matchedText);

      element.innerHTML = element.innerHTML.replace(match, span.outerHTML);
    });
  });
}

function findMatches(text, searchTerm) {
  const matches = [];
  let index = text.indexOf(searchTerm);

  while (index !== -1) {
    matches.push(text.substr(index, searchTerm.length));
    index = text.indexOf(searchTerm, index + 1);
  }

  return matches;
}
// Функция для очистки подсветки при повторном поиске или закрытии
function clearSearchHighlight(element) {
  const highlights = element.querySelectorAll('.highlight');
  highlights.forEach((highlight) => {
    const text = document.createTextNode(highlight.textContent);
    highlight.parentNode.replaceChild(text, highlight);
  });
}


searchInput.addEventListener('keydown', function (event) {
   if (event.key === 'Enter') {
      performSearch();
   }
});

searchIcon.addEventListener('click', function () {
   if (headerSearch.contains(searchInput)) {
      performSearch();
      console.log('enter')
   }
});

searchIcon.addEventListener('click', toggleSearchInput);

document.addEventListener('click', function (event) {
   if (event.target !== searchIcon && !headerSearch.contains(event.target)) {
      if (searchInput) {
      // headerSearch.removeChild(searchInput);
         clearSearchHighlight(document.body);
      }
   }
});
