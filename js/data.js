import {createIdGenerator, getRandomInteger, createRandomIdFromRangeGenerator} from './util.js';

const MIN_ID = 1;
const MAX_ID = 25;
const MIN_URL = 1;
const MAX_URL = 25;
const MIN_COUNT_AVATAR = 1;
const MAX_COUNT_AVATAR = 6;
const LIKE_MIN_COUNT = 15;
const LIKE_MAX_COUNT = 200;
const PHOTO_COUNT = 25;
const COMMENT_COUNT_MIN = 1;
const COMMENT_COUNT_MAX = 15;

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

const generateCommentId = createIdGenerator();
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];
const generatePhotoId = createRandomIdFromRangeGenerator(MIN_ID, MAX_ID);
const generatePhotoUrl = createRandomIdFromRangeGenerator(MIN_URL, MAX_URL);

const creatComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(MIN_COUNT_AVATAR, MAX_COUNT_AVATAR)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMAS),
});

const describePhoto = () => ({
  id: generatePhotoId(),
  url: `photos/${generatePhotoUrl()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(LIKE_MIN_COUNT, LIKE_MAX_COUNT),
  comments: Array.from({length: getRandomInteger(COMMENT_COUNT_MIN, COMMENT_COUNT_MAX)
  }, creatComment),
});

const getDescribePhoto = () => Array.from({length: PHOTO_COUNT}, describePhoto);

export {getDescribePhoto};
