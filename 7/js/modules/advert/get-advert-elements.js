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
    element.textContent = strings.join(' ');
  }
  else {
    element.classList.add('visually-hidden');
  }
};

/**
 * Генерация массива елементов, где элемент массива - карточка с информацией о сдаче жилья
 *
 * @param {Array} number Количество генерируемых объектов.
 * @return {object} Массив объектов.
 */
export const getAdvertElements = (number) => {
  const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  //const indexArray = [...Array(number).keys()];
  //const indexArray = Array.from({ length: 10 }, (_, index) => index);
  const adverts = getAdvertObjects(number);
  const advertELements = Array(number);
  //const fragment = document.createDocumentFragment();
  adverts.forEach((advert, index) => {
    const cardElement = cardTemplate.cloneNode(true);

    const titleElement = cardElement.querySelector('.popup__title');
    const title = advert.offer.title;
    setTextOrHideElement(titleElement, title);

    const addressElement = cardElement.querySelector('.popup__text--address');
    const address = advert.offer.address;
    setTextOrHideElement(addressElement, address);

    const priceElement = cardElement.querySelector('.popup__text--price');
    const price = advert.offer.price;
    setTextOrHideElement(priceElement, price, ' ₽/ночь');

    const typeElement = cardElement.querySelector('.popup__type');
    const type = advert.offer.type;
    setTextOrHideElement(typeElement, HOUSING_TYPES_EN_RU[type]);

    const capacityElement = cardElement.querySelector('.popup__text--capacity');
    const rooms = advert.offer.rooms;
    const guests = advert.offer.guests;
    if (rooms || typeof (rooms) === 'number') {
      capacityElement.textContent = `${rooms} комнаты`;
      if (guests || typeof (guests) === 'number') {
        capacityElement.textContent += ` для ${guests} гостей`;
      }
    }
    else if (guests || typeof (guests) === 'number') {
      capacityElement.textContent = `Для ${guests} гостей`;
    }
    else {
      capacityElement.classList.add('visually-hidden');
    }

    const checkElement = cardElement.querySelector('.popup__text--time');
    const checkIn = advert.offer.checkin;
    const checkOut = advert.offer.checkout;
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

    const features = advert.offer.features;
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
    const description = advert.offer.description;
    setTextOrHideElement(descriptionElement, description);

    const photosContainer = cardElement.querySelector('.popup__photos');
    const photoElementTemplate = photosContainer.querySelector('img');
    photoElementTemplate.remove();
    const photos = advert.offer.photos;
    if (photos && Array.isArray(photos) && photos.length > 0) {
      photos.forEach((photo) => {
        const photoElement = photoElementTemplate.cloneNode(true);
        photoElement.attributes.src.textContent = photo;
        photosContainer.appendChild(photoElement);
      });
    }

    const avatarElement = cardElement.querySelector('.popup__avatar');
    const avatar = advert.author.avatar;
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
