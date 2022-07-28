import { HousingTypeTranslation } from '../dictionary.js';
import { getEnding } from '../utils.js';
import { removeTextFromElement } from '../utils.js';

/**
 * Вспомогательная функция. Вписать текст в элемент или, в случае отсутствия данных, удалить элемент из DOM
 *
 * @param {Object} element DOM-элемент.
 * @param {String} string Текст для вставки в элемент.
 * @return {undefined} undefined
 */
const setTextOrRemoveElement = (element, ...strings) => {
  const isDefined = strings.every((str) => !!str || typeof (str) === 'number');
  if (isDefined) {
    removeTextFromElement(element);
    element.prepend(`${strings.join(' ')} `);
  }
  else {
    element.remove();
  }
};

/**
 * Генерация массива елементов, где элемент массива - карточка с информацией о сдаче жилья
 *
 * @param {Array} objects Генерируемый объект.
 * @return {object} Массив объектов.
 */
export const getAdvertElement = (object) => {
  const { author, offer } = object;
  const { avatar } = author;
  const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  const cardElement = cardTemplate.cloneNode(true);
  const { title, address, price, type, rooms, guests, checkIn, checkOut, features, description, photos } = offer;
  const titleElement = cardElement.querySelector('.popup__title');
  const addressElement = cardElement.querySelector('.popup__text--address');
  const priceElement = cardElement.querySelector('.popup__text--price');
  const typeElement = cardElement.querySelector('.popup__type');
  const capacityElement = cardElement.querySelector('.popup__text--capacity');
  const checkElement = cardElement.querySelector('.popup__text--time');
  const featureElements = cardElement.querySelectorAll('.popup__feature');
  const featureContainerElement = cardElement.querySelector('.popup__features');
  const descriptionElement = cardElement.querySelector('.popup__description');
  const photoContainerElement = cardElement.querySelector('.popup__photos');
  const photoElementTemplate = photoContainerElement.querySelector('img');
  const avatarElement = cardElement.querySelector('.popup__avatar');

  setTextOrRemoveElement(titleElement, title);
  setTextOrRemoveElement(addressElement, address);
  setTextOrRemoveElement(priceElement, price);
  setTextOrRemoveElement(typeElement, HousingTypeTranslation[type.toUpperCase()]);
  setTextOrRemoveElement(descriptionElement, description);

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
    capacityElement.remove();
  }

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
    checkElement.remove();
  }

  if (features && Array.isArray(features) && features.length > 0) {
    featureElements.forEach((feature) => {
      const result = [...feature.classList]
        .some((classItem) => {
          const regex = (/popup__feature--(?<featureType>.*)/.exec(classItem));
          if (regex && features.includes(regex.groups.featureType)) {
            return true;
          }
        });
      if (!result) {
        feature.remove();
      }
    });
  }
  else {
    featureContainerElement.remove();
  }

  photoElementTemplate.remove();
  if (photos && Array.isArray(photos) && photos.length > 0) {
    photos.forEach((photo) => {
      const photoElement = photoElementTemplate.cloneNode(true);
      photoElement.src = photo;
      photoContainerElement.appendChild(photoElement);
    });
  }

  if (avatar) {
    avatarElement.src = avatar;
  }
  else {
    avatarElement.remove();
  }

  return cardElement;
};
