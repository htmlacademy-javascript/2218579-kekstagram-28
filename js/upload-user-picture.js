const PICTURE_TYPES = ['jpg', 'jpeg', 'png'];

const pictureUploadButton = document.querySelector('.img-upload__input');
const picturePreview = document.querySelector('.img-upload__preview img');
const effectsPreview = document.querySelectorAll('.effects__preview');

const uploadUserPicture = () => {
  const userPicture = pictureUploadButton.files[0];
  const userPictureName = userPicture.name.toLowerCase();
  const validateType = PICTURE_TYPES.some((type) => userPictureName.endsWith(type));
  if (validateType) {
    picturePreview.src = URL.createObjectURL(userPicture);
    effectsPreview.forEach((effect) => (effect.style.backgroundImage = `url(${picturePreview.src})`));
  }
};

export {uploadUserPicture};
