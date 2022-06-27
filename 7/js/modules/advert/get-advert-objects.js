import { getRandomInt, getRandomFrac, getRandomSubarray, getRandomArray, GetRandomItem } from './get-random.js';
import { HOUSING_TYPES_EN_RU, FEATURES_EN_RU } from '../dictionary.js';

const LOCATION_LAT = {
  min: 35.65,
  max: 35.7
};

const LOCATION_LNG = {
  min: 139.7,
  max: 139.8
};

const CHECK_TIMES = ['12:00', '13:00', '14:00'];

const AVATAR_URLS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

const MAX_RENT_PRICE = 5000;
const MAX_ROOMS = 5;
const MAX_GUESTS = 5;

/**
 * Выборка времени регистрации
 *
 * @return {object} Случайное время регистрации.
 */
const getCheckTime = () => GetRandomItem(CHECK_TIMES);

/**
 * Выборка типа жилья
 *
 * @return {object} Случайный тип жилья.
 */
const getAddressType = () => GetRandomItem(Object.keys(HOUSING_TYPES_EN_RU));

/**
 * Получение массива url-путей к фото
 *
 * @return {object} Массив случайной длины с url-путями к фото.
 */
const getPhotosRandomly = () => getRandomArray(AVATAR_URLS);

/**
 * Получение массива удобств
 *
 * @return {object} Массив случайной длины с неповторяющимися элементами.
 */
const getSomeFeatures = () => getRandomSubarray(Object.keys(FEATURES_EN_RU));

/**
 * Добавление к объекту (предложение аренды) свойств title (заголовок) и description (описание)
 *
 * @param {Object} offer Предложение аренды жилья.
 * @return {object} Предложение аренды жилья с добавленными свойствами title и description.
 */
function generateTitleAndDescription() {
  this.title = (() => {
    const typeRussian = HOUSING_TYPES_EN_RU[this.type];
    if (typeRussian) {
      return `Сдается в аренду ${typeRussian}`;
    }
  })();
  this.description = (() => {
    let resultString = '';
    const typeRussian = HOUSING_TYPES_EN_RU[this.type];
    if (typeRussian) {
      if (this.guests || typeof (this.guests) === 'number') {
        resultString += `${typeRussian} вмещает не более ${this.guests} гостей.`;
      }
    }
    else if (this.guests || typeof (this.guests) === 'number') {
      resultString += `Жилье вмещает не более ${this.guests} гостей.`;
    }
    if (this.rooms || typeof (this.rooms) === 'number') {
      resultString += ` Общее число комнат - ${this.rooms}.`;
    }
    if (this.features && Array.isArray(this.features) && this.features.length > 0) {
      resultString += ` Среди удобств имеется: ${this.features.map((feature) => FEATURES_EN_RU[feature])}.`;
    }
    return resultString;
  })();
  delete this.generateTitleAndDescription;
}

/**
 * Генерация массива объектов, где элемент - информация о сдаче жилья
 *
 * @param {Array} number Количество генерируемых объектов.
 * @return {object} Массив объектов.
 */
export const getAdvertObjects = (number) => {
  const adverts = Array(number);
  for (let i = 1; i <= adverts.length; i++) {
    const lat = getRandomFrac(LOCATION_LAT.min, LOCATION_LAT.max, 5);
    const lng = getRandomFrac(LOCATION_LNG.min, LOCATION_LNG.max, 5);
    const advert = {
      author: {
        avatar: `img/avatars/user${(i < 10) ? `0${i}` : `${i}`}.png`
      },
      offer: {
        address: `${lat}, ${lng}`,
        price: getRandomInt(0, MAX_RENT_PRICE),
        type: getAddressType(),
        rooms: getRandomInt(0, MAX_ROOMS),
        guests: getRandomInt(0, MAX_GUESTS),
        checkin: getCheckTime(),
        checkout: getCheckTime(),
        features: getSomeFeatures(),
        photos: getPhotosRandomly(),
        generateTitleAndDescription: generateTitleAndDescription
      },
      location: {
        lat: lat,
        lng: lng,
      }
    };
    advert.offer.generateTitleAndDescription();
    adverts[i-1] = advert;
  }
  return adverts;
};
