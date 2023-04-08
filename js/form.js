import {resetScale} from './scale.js';
import {resetEffects} from './effect.js';
import {showAlert} from './util.js';
import {sendData} from './api.js';
import {isEscapeKey} from './util.js';

const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOL = /^#[a-zа-яё0-9]{1,19}$/i;
const TAG_ERROR_TEXT = 'Не более 5 хештегов, Хештеги не должны повторяться, Хештег должен начинаться с #, содержать символы и/или цифры и не более 20 символов';

const form = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const cancelButton = document.querySelector('#upload-cancel');
const fileField = document.querySelector('#upload-file');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

const showModal = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const hideModal = () => {
  form.reset();
  resetScale();
  resetEffects();
  pristine.reset();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const isTextFieldFocused = () =>
  document.activeElement === hashtagField ||
  document.activeElement === commentField;

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !isTextFieldFocused()) {
    evt.preventDefault();
    hideModal();
  }
}

const onCancelButtonClick = () => {
  hideModal();
};

const onFileInputChange = () => {
  showModal();
};

const isValidTag = (tag) => VALID_SYMBOL.test(tag);

const hasValidCount = (tags) => tags.length <= MAX_HASHTAG_COUNT;

const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateTags = (value) => {
  const tags = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);
  return hasValidCount(tags) && hasUniqueTags(tags) && tags.every(isValidTag);
};

pristine.addValidator(
  hashtagField,
  validateTags,
  TAG_ERROR_TEXT
);

const getMessageType = () => document.querySelector('.error, .success');

const closeMessage = () => {
  const message = getMessageType();
  if (message) {
    message.remove();
  }

  document.removeEventListener('click', onOutsideClick);
  document.removeEventListener('keydown', onMessageKeydown);
};

const openErrorMessage = () => {
  const error = errorTemplate.cloneNode(true);
  document.body.append(error);
  const errorButton = document.querySelector('.error__button');
  errorButton.addEventListener('click', closeMessage);

  document.addEventListener('click', onOutsideClick);
  document.addEventListener('keydown', onMessageKeydown);
};

const openSuccessMessage = () => {
  const success = successTemplate.cloneNode(true);
  document.body.append(success);
  const successButton = document.querySelector('.success__button');
  successButton.addEventListener('click', closeMessage);

  document.addEventListener('click', onOutsideClick);
  document.addEventListener('keydown', onMessageKeydown);
};

function onMessageKeydown (evt) {
  if (isEscapeKey(evt) && getMessageType()) {
    evt.preventDefault();
    closeMessage();
  }
}

function onOutsideClick (evt) {
  const type = getMessageType();
  if (evt.target === type) {
    closeMessage();
  }
}

const setUserFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      openSuccessMessage ();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .catch((err) => {
          openErrorMessage();
          showAlert(err.message);
        });
    }
  });
};

fileField.addEventListener('change', onFileInputChange);
cancelButton.addEventListener('click', onCancelButtonClick);

export {setUserFormSubmit, showModal, hideModal};
