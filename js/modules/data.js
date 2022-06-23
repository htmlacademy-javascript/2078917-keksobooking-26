import { getRandomInt, getRandomFrac, getRandomSubarray, getRandomArray, GetRandomItem} from './utils.js';

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
 * Выборка времени регистрации
 *
 * @return {object} Случайное время регистрации.
 */
const getCheckTime = () => GetRandomItem(['12:00', '13:00', '14:00']);

/**
 * Выборка типа жилья
 *
 * @return {object} Случайный тип жилья.
 */
const getAddressType = () => GetRandomItem(['palace', 'flat', 'house', 'bungalow', 'hotel']);

/**
 * Получение массива url-путей к фото
 *
 * @return {object} Массив случайной длины с url-путями к фото.
 */
const getPhotosRandomly = () =>
  getRandomArray(['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg']);

/**
 * Получение массива удобств
 *
 * @return {object} Массив случайной длины с неповторяющимися удобствами.
 */
const getSomeFeatures = () => getRandomSubarray(['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']);

const TranslateIntoRussian = (word) => {
  const wordsToMatch = {
    'flat': 'Квартира',
    'bungalow': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец',
    'hotel': 'Отель',
    'wifi' : 'вай-фай',
    'dishwasher' : 'посудомоечная машина',
    'parking' : 'паркинг',
    'washer' : 'стиральная машина',
    'elevator' : 'лифт',
    'conditioner' : 'кондиционер'
  };
  return wordsToMatch[word];
};

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
  features: getSomeFeatures(),
  photos: getPhotosRandomly(),
  generateTitleAndDescription: function () {
    this.title = `Сдается в аренду ${TranslateIntoRussian(this.type)}`;
    this.description = `${TranslateIntoRussian(this.type)} вмещает не более ${this.guests} гостей. Общее число комнат - ${this.rooms}. Среди удобств имеется: ${this.features.map((feature) => TranslateIntoRussian(feature))}.`;
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

export { getAd, TranslateIntoRussian};
