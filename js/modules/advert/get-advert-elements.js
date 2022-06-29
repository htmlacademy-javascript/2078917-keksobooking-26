import { getAdvertObjects } from './get-advert-objects.js';
import { HOUSING_TYPES_EN_RU } from '../dictionary.js';

/**
 * Вспомогательная функция. Вписать текст в элемент или, в случае отсутствия данных, удалить элемент из DOM
 *
 * @param {Object} element DOM-элемент.
 * @param {String} string Данные для вставки в элемент.
 * @return {undefined} undefined
 */
const setTextOrHideElement = (element, ...strings) => {
  const isValid = strings.every((str) => !!str || typeof (str) === 'number');
  if (isValid) {
    //element.textContent = strings.join(' ');
    element.childNodes.forEach((node) => {
      if (node.nodeType === 3) {
        node.remove();
      }
    });
    element.prepend(`${strings.join(' ')} `);
  }
  else {
    element.classList.add('visually-hidden');
  }
};

/**
 * Выбор слова с корректным окончанием в зависимости от числа
 *
 * @param {Number} number Число.
 * @param {Array} Массив, состоящий из трех элементов, где:
 * Первый элемент - слово с корректным окончанием, если объект 1 (например 'комната')
 * Второй элемент - слово с корректным окончанием, если объектов 2 (например 'комнаты')
 * Третий элемент - слово с корректным окончанием, если объектов 5 (например 'комнат')
 * @return {object} Выбранное слово.
 */
const getEnding = (number, words) => {
  const oneDigitNumber = number % 10;
  const twoDigitNumber = number % 100;
  if (oneDigitNumber === 1 && twoDigitNumber !== 11) { return words[0]; }
  if ((oneDigitNumber === 2 && twoDigitNumber !== 12) ||
    (oneDigitNumber === 3 && twoDigitNumber !== 13) ||
    (oneDigitNumber === 4 && twoDigitNumber !== 14)) { return words[1]; }
  return words[2];
};

/**
 * Генерация массива елементов, где элемент массива - карточка с информацией о сдаче жилья
 *
 * @param {Number} number Количество генерируемых объектов.
 * @return {object} Массив объектов.
 */
export const getAdvertElements = (number) => {
  const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  //const indexArray = [...Array(number).keys()];
  //const indexArray = Array.from({ length: 10 }, (_, index) => index);
  const adverts = getAdvertObjects(number);
  const advertELements = Array(number);
  //const fragment = document.createDocumentFragment();
  adverts.forEach(({ author, offer }, index) => {
    const cardElement = cardTemplate.cloneNode(true);

    const { avatar } = author;
    const { title, address, price, type, rooms, guests, checkIn, checkOut, features, description, photos } = offer;

    const titleElement = cardElement.querySelector('.popup__title');
    setTextOrHideElement(titleElement, title);

    const addressElement = cardElement.querySelector('.popup__text--address');
    setTextOrHideElement(addressElement, address);

    const priceElement = cardElement.querySelector('.popup__text--price');
    setTextOrHideElement(priceElement, price);

    const typeElement = cardElement.querySelector('.popup__type');
    setTextOrHideElement(typeElement, HOUSING_TYPES_EN_RU[type]);

    const capacityElement = cardElement.querySelector('.popup__text--capacity');
    if (rooms || typeof (rooms) === 'number') {
      let wordWithCorrectEnding = getEnding(rooms, ['комната', 'комнаты', 'комнат']);
      capacityElement.textContent = `${rooms} ${wordWithCorrectEnding}`;
      if (guests || typeof (guests) === 'number') {
        wordWithCorrectEnding = getEnding(guests, ['гостя', 'гостей', 'гостей']);
        capacityElement.textContent += ` для ${guests} ${wordWithCorrectEnding}`;
      }
    }
    else if (guests || typeof (guests) === 'number') {
      const wordWithCorrectEnding = getEnding(guests, ['гостя', 'гостей', 'гостей']);
      capacityElement.textContent = `Для ${guests} ${wordWithCorrectEnding}`;
    }
    else {
      capacityElement.classList.add('visually-hidden');
    }

    const checkElement = cardElement.querySelector('.popup__text--time');
    if (checkIn) {
      checkElement.textContent = `Заезд после ${checkIn}`;
      if (checkOut) {
        checkElement.textContent += `, выезд до ${checkOut}`;
      }
    }
    else if (checkOut) {
      checkElement.textContent = `Выезд до ${checkOut}`;
    }
    else {
      checkElement.classList.add('visually-hidden');
    }

    if (features && Array.isArray(features) && features.length > 0) {
      cardElement.querySelectorAll('.popup__feature').forEach((feature) => {
        const result = [...feature.classList]
          .some((classItem) => {
            const temp = (/popup__feature--(?<gr>.*)/.exec(classItem));
            if (temp && features.includes(temp.groups.gr)) {
              return true;
            }
          });
        if (!result) {
          feature.classList.add('visually-hidden');
        }
      });
    }
    else {
      cardElement.querySelectorAll('.popup__feature').forEach((feature) => feature.classList.add('visually-hidden'));
      cardElement.querySelector('.popup__features').classList.add('visually-hidden');
    }

    const descriptionElement = cardElement.querySelector('.popup__description');
    setTextOrHideElement(descriptionElement, description);

    const photosContainer = cardElement.querySelector('.popup__photos');
    const photoElementTemplate = photosContainer.querySelector('img');
    photoElementTemplate.remove();
    if (photos && Array.isArray(photos) && photos.length > 0) {
      photos.forEach((photo) => {
        const photoElement = photoElementTemplate.cloneNode(true);
        photoElement.attributes.src.textContent = photo;
        photosContainer.appendChild(photoElement);
      });
    }

    const avatarElement = cardElement.querySelector('.popup__avatar');
    if (avatar) {
      avatarElement.attributes.src.textContent = avatar;
    }
    else {
      avatarElement.classList.add('visually-hidden');
    }

    advertELements[index] = cardElement;
    //fragment.appendChild(cardElement);
  });
  return advertELements;
};

//TEST
const mapCanvas = document.getElementById('map-canvas');
getAdvertElements(10).forEach((element) => mapCanvas.appendChild(element));
