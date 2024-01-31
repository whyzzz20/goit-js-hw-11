//Імпорти бібліотек
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
//Посилання на форму та галерею
const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
//Прослуховування "сабміту" форми
form.addEventListener('submit', onFormSuccess);
let counter = 0;
loader.style.display = 'none';

//Отримання і відмальовка фото
function onFormSuccess(e) {
  e.preventDefault();
  gallery.innerHTML = '';
  loader.style.display = 'block';

  searchImage(e.target.elements.searchQuery.value);
  e.target.elements.searchQuery.value = '';
}

//Функція запиту данних по пошуковому слову
function searchImage(searchWord) {
  fetch(
    `https://pixabay.com/api/?key=41293253-42a55b268bdac57d89d3cc200&q=${searchWord}&image_type=photo&orientation=horizontal&safesearch=true`
  )
    .then(r => {
      if (!r.ok) {
        throw new Error(r.status);
      }
      return r.json();
    })
    .then(r => {
      if (r.total === 0) {
        iziToast.warning({
          title: 'Wrong request',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
        return;
      }
      gallery.innerHTML = makeMarkup(r.hits);
      counter += 1;
      let lightbox = new SimpleLightbox('.gallery a');
      lightbox.refresh();
      loader.style.display = 'none';
    })
    .catch(error =>
      iziToast.error({
        title: 'Error',
        message: `Oh, we have problem: ${error}`,
      })
    );
}

//Створення розмітки з масиву

function makeMarkup(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
        id,
      }) => `<a class="gallery__link" href="${largeImageURL}">
  <div class="gallery-item" id="${id}">
    <img class="gallery-item__img" src="${webformatURL}" alt="${tags}" loading="lazy">
    <div class="info">
      <p class="info-item"><b>Likes</b>${likes}</p>
      <p class="info-item"><b>Views</b>${views}</p>
      <p class="info-item"><b>Comments</b>${comments}</p>
      <p class="info-item"><b>Downloads</b>${downloads}</p>
    </div>
  </div>
</a>`
    )
    .join('');
}
