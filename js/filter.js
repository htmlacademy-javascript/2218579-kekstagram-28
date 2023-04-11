import {debounce} from './util.js';
import {renderThumbnails} from './thumbnail.js';

const RERENDER_DELAY = 500;
const RANDOM_PICTURES_COUNT = 10;
const SORT_NUMBER = 0.5;

const picturesUser = document.querySelector('.pictures');

const resetArrayPicture = () => {
  Array.from(picturesUser.children).forEach((item) => {
    if (item.classList.contains('picture')) {
      item.remove();
    }
  });
};

const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const filtersContainer = document.querySelector('.img-filters');

let currentFilter = Filter.DEFAULT;

const showFilters = () => {
  filtersContainer.classList.remove('img-filters--inactive');
};

const sortRandomly = () => Math.random() - SORT_NUMBER;

const sortByComments = (pictureA, pictureB) =>
  pictureB.comments.length - pictureA.comments.length;

const filterPictures = (pictures) => {
  switch(currentFilter) {
    case(Filter.RANDOM):
      resetArrayPicture();
      return pictures.slice().sort(sortRandomly).slice(0,RANDOM_PICTURES_COUNT);
    case(Filter.DISCUSSED):
      resetArrayPicture();
      return pictures.slice().sort(sortByComments);
    default:
      resetArrayPicture();
      return pictures;
  }
};

const debouncedCreateGallery = debounce(renderThumbnails, RERENDER_DELAY);

const setOnFilterClick = (pictures) => {
  filtersContainer.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }
    const activeButton = evt.target;
    if (activeButton.id === currentFilter) {
      return;
    }
    filtersContainer
      .querySelector('.img-filters__button--active')
      .classList.remove('img-filters__button--active');
    activeButton.classList.add('img-filters__button--active');
    currentFilter = activeButton.id;
    debouncedCreateGallery(filterPictures(pictures));
  });
};

export {showFilters, setOnFilterClick};
