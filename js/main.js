const IDS = 25;
const URLS = 25;
const AVATARS = 6;
const LIKE_MIN_COUNT = 15;
const LIKE_MAX_COUNT = 200;
const PHOTO_COUNT = 25;

const DESCRIPTIONS = [
  'Я и море...',
  'Мой первый рисунок на холсте',
  'Мои незабываемые студенческие годы',
  'В заросшем парке стоит старинный дом',
  'Темный мрачный коридор',
  'В провинциальном городке был праздник, музыка звучала',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо.Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.Как можно было поймать такой неудачный момент ? !',
];

const NAMAS = [
  'Михаил',
  'Андрей',
  'Ирина',
  'Анна',
  'Виктория',
  'Николай',
];

const createIdGenerator = () => {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const generateCommentId = createIdGenerator();

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

createRandomIdFromRangeGenerator();

const creatComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(0, AVATARS)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMAS),
});

const describePhoto = () => ({
  id: getRandomInteger(0, IDS),
  url: `photos/${getRandomInteger(0, URLS)}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(LIKE_MIN_COUNT, LIKE_MAX_COUNT),
  comments: creatComment(),
});

const getDescribePhoto = () => Array.from({length: PHOTO_COUNT}, describePhoto);

getDescribePhoto();
