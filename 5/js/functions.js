//Функция для проверки длины строки
const isCheckLength = (string, length) => string.length <= length;

isCheckLength('проверяемая строка', 20);

//Палиндром
const isPalindrom = (string) => {
  const tempString = string
    .toLowerCase()
    .replaceAll(' ', '');
  let reversString = '';
  for (let i = tempString.length - 1; i >= 0; i--) {
    reversString += tempString.at(i);
  }
  return tempString === reversString;
};

isPalindrom('ДовОд');

//Функция принимает строку и извлекает целые положительные числа
const extractNumber = (string) => {
  if (typeof string === 'number') {
    return string;
  }
  let result = '';
  for (let i = 0; i < string.length; i++) {
    if (!Number.isNaN(parseInt(string.at(i), 10))) {
      result += string.at(i);
    }
  }
  return parseInt(result, 10);
};

extractNumber('2023 год');

//Функция для формирования адресов
const myPadStart = (string, minLength, pad) => {
  const actualPad = minLength - string.length;
  if (actualPad <= 0) {
    return string;
  }
  return pad.slice(0, actualPad % pad.length) + pad.repeat(actualPad / pad.length) + string;
};

myPadStart('1', 2, '0');
