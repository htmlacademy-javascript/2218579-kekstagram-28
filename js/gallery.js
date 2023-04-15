import {renderThumbnails} from './thumbnail.js';
import {showBigPicture} from './big-picture.js';

const container = document.querySelector('.pictures');

let pictures = [];

const onContainerclick = (evt) => {
  const thumbnail = evt.target.closest('[data-thumbnail-id]');
  if (!thumbnail) {
    return;
  }

  evt.preventDefault();
  const picture = pictures.find(
    (item) => item.id === Number(thumbnail.dataset.thumbnailId)
  );
  showBigPicture(picture);
};

const renderGallery = (currentPicture) => {
  pictures = currentPicture;
  renderThumbnails(pictures, container);
  container.addEventListener('click', onContainerclick);
};

export {renderGallery};
