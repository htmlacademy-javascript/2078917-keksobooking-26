/**
 * Возвращает случайное целое число из [start, end]
 *
 * @param {number} start Начало отрезка. Целое положительное число.
 * @param {number} end Конец отрезка. Целое положительное число.
 * @return {number} Случайное целое число из отрезка.
 */
function getRandomInt(start, end) {
  if (isNaN(start) || isNaN(end) ||
    typeof start !== 'number' || typeof end !== 'number' ||
    start < 0 || end < 0 ||
    start % 1 !== 0 || end % 1 !== 0 ||
    start > end) {
    /*console.log(`Параметр 1 (начало диапазона) - положительное число.
Параметр 2 (конец диапазона)- положительныое число.
Параметр 3 (число знаков после запятой) - целое положительное число.`);*/
    return NaN;
  }
  return Math.round((end - start) * Math.random() + start);
}

/**
 * Возвращает случайное число из отрезка [start, end] с fractionLen количеством цифр после запятой
 *
 * @param {number} start Начало отрезка. Положительное число.
 * @param {number} end Конец отрезка. Положительное число.
 * @param {number} fractionLen Цифр после запятой у сгенерированного числа.
 * @return {number} Случайное число.
 */
function getRandomFrac(start, end, fractionLength) {
  if (!isFinite(start) || !isFinite(end) || !isFinite(fractionLength) ||
    typeof start !== 'number' || typeof end !== 'number' || typeof fractionLength !== 'number' ||
    start < 0 || end < 0 || fractionLength < 0 ||
    fractionLength % 1 !== 0 ||
    start > end) {
    /*console.log(`Параметр 1 (начало диапазона) - положительное число.
Параметр 2 (конец диапазона)- положительныое число.
Параметр 3 (число знаков после запятой) - целое положительное число.`);*/
    return NaN;
  }
  const randomNum = (end - start) * Math.random() + start;
  return +randomNum.toFixed(fractionLength);
}

/**
 * 'Истина', если длина строки string меньше или равно maxLength
 *
 * @param {string} string Строка
 * @param {number} maxLength Количество символов для сравнения с количеством символов строки string
 * @return {boolean} 'Истина', если длина строки string меньше или равно maxLength. В остальных случаях - 'Ложь'
 */
function IsFitted(string, maxLength) {
  if (isNaN(maxLength) ||
    typeof maxLength !== 'number' ||
    maxLength < 0 ||
    maxLength % 1 !== 0 ||
    typeof string !== 'string') {
    /*console.log(`Первый параметр - строка.
Второй параметр (максимальная длина) - целое положительное число`);*/
    return false;
  }
  return string.length <= maxLength;
}

IsFitted('qwerty', 6);

/**
 * Создание объекта - автор
 *
 * @param {number} imageNumber Уникальный номер для формирования пути к изображению
 * @return {object} Объект - автор
 */
const getAuthor = (imageNumber) => ({
  avatar: `img/avatars/user${(imageNumber < 10) ? `0${imageNumber}` : `${imageNumber}`}.png`
});

/**
 * Создание объекта - местонахождение по ширине и долготе
 *
 * @return {object} Объект - местонахождение со свойствами "ширина" и "долгота"
 */
const getLocation = () => ({
  lat: getRandomFrac(35.65, 35.7, 5),
  lng: getRandomFrac(139.7, 139.8, 5),
  toString: function () {
    return `${this.lat}, ${this.lng}`;
  }
});

/**
 * Случайный отбор элемента из массива.
 *
 * @param {Array} items Массив
 * @return {object} Случайный элемент массива
 */
const GetRandomItem = (items) => items[getRandomInt(0, items.length - 1)];

/**
 * Создание подмассива случайной длины из неповторяющихся элементов исходного массива.
 *
 * @param {Array} items Исходный массив.
 * @return {object} Массив случайной длины, состоящий из неповторяющихся элементов исходного массива.
 */
const getRandomSubarray = (items) => {
  const itemsIndexes = [];
  items.forEach((item, index) => itemsIndexes.push(index));
  const subarrayLength = getRandomInt(1, items.length);
  const subarray = Array(subarrayLength);
  for (let i = 0; i < subarray.length; i++) {
    const randomIndex = getRandomInt(0, itemsIndexes.length - 1);
    subarray[i] = items[itemsIndexes[randomIndex]];
    itemsIndexes.splice(randomIndex, 1);
  }
  return subarray;
};

/**
 * Создание массива случайной длины из элементов исходного массива.
 *
 * @param {Array} items Исходный массив.
 * @return {object} Массив случайной длины, состоящий из элементов исходного массива.
 */
const getRandomArray = (items) => {
  const randomArrayLength = getRandomInt(1, 12);
  const randomArray = Array(randomArrayLength);
  for (let i = 0; i < randomArray.length; i++) {
    randomArray[i] = GetRandomItem(items);
  }
  return randomArray;
};

/**
 * Выборка времени регистрации
 *
 * @param {Array} items Часы регистрации.
 * @return {object} Случайный элемент массива items.
 */
const getCheckTime = () => GetRandomItem(['12: 00', '13: 00', '14: 00']);

/**
 * Выборка типа жилья
 *
 * @param {Array} items Типы жилья.
 * @return {object} Случайный элемент массива items.
 */
const getAddressType = () => GetRandomItem(['palace', 'flat', 'house', 'bungalow', 'hotel']);

/**
 * Создание объекта - предложение жилья
 *
 * @return {object} Объект - предложение жилья.
 */
const getOffer = () => ({
  address: getLocation().toString(),
  price: getRandomInt(100, 10000),
  type: getAddressType(),
  rooms: getRandomInt(1, 4),
  guests: getRandomInt(1, 6),
  checkin: getCheckTime(),
  checkout: getCheckTime(),
  features: getRandomSubarray(['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']),
  photos: getRandomArray(['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg']),
  generateTitleAndDescription : function() {
    this.title = `The ${this.type} is rented`;
    this.description = `We rent out a ${this.type}. It is allowed to accommodate up to ${this.guests} person(-s). The accomodation contains ${this.rooms} room(-s). The features presented there are: ${this.features} and others`;
    delete this.generateTitleAndDescription;
    return this;
  }
}).generateTitleAndDescription();

/**
 * Создание объекта - информация о сдаче жилья
 *
 * @param {Array} avatarNumber Уникальный номер для формирования пути к изображению автора обяъвления.
 * @return {object} Объект - информация о сдаче жилья.
 */
const getAd = (avatarNumber) => ({
  author: getAuthor(avatarNumber),
  offer: getOffer(),
  location: getLocation()
});

const Ads = [];
for (let i = 1; i <= 10; i++) {
  Ads.push(getAd(i));
}
