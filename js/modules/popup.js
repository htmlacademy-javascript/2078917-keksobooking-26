import { getAd, TranslateIntoRussian} from './data.js';

const cardTemplate = document.getElementById('card')
  .content
  .querySelector('.popup');

const mapCanvas = document.getElementById('map-canvas');

const indexArray = [...Array(10).keys()];
//const indexArray = Array.from({ length: 10 }, (_, index) => index);
const ads = indexArray.map((index) => getAd(index+1));

ads.forEach((ad) => {
  const cardElement = cardTemplate.cloneNode(true);

  const titleElement = cardElement.querySelector('.popup__title');
  const title = ad.offer.title;
  if (title) {
    titleElement.textContent = title;
  }
  else {
    titleElement.classList.add('visually-hidden');
  }

  const addressElement = cardElement.querySelector('.popup__text--address');
  const address = ad.offer.address;
  if (address) {
    addressElement.textContent = address;
  }
  else {
    addressElement.classList.add('visually-hidden');
  }

  const priceElement = cardElement.querySelector('.popup__text--price');
  const price = ad.offer.price;
  if (price) {
    priceElement.textContent = `${price} ₽/ночь`;
  }
  else {
    priceElement.classList.add('visually-hidden');
  }

  const typeElement = cardElement.querySelector('.popup__type');
  const type = ad.offer.type;
  if (type) {
    typeElement.textContent = TranslateIntoRussian(type);
  }
  else {
    typeElement.classList.add('visually-hidden');
  }

  const capacityElement = cardElement.querySelector('.popup__text--capacity');
  const rooms = ad.offer.rooms;
  const guests = ad.offer.guests;
  if (rooms) {
    capacityElement.textContent = `${rooms} комнаты `;
    if (guests) {
      capacityElement.textContent += `для ${guests} гостей`;
    }
  }
  else if (guests) {
    capacityElement.textContent = `Для ${guests} гостей`;
  }
  else {
    capacityElement.classList.add('visually-hidden');
  }

  const checkElement = cardElement.querySelector('.popup__text--time');
  const checkIn = ad.offer.checkin;
  const checkOut = ad.offer.checkout;
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

  const features = ad.offer.features;
  cardElement.querySelectorAll('.popup__feature').forEach((feature) => {
    const result = [...feature.classList]
      .some((classItem) => {
        const temp = (/popup__feature--(?<gr>.*)/.exec(classItem));
        if (temp && !features.includes(temp.groups.gr)) {
          return true;
        }
      });
    if (result) {
      feature.remove();
    }
  });

  const descriptionElement = cardElement.querySelector('.popup__description');
  const description = ad.offer.description;
  if (description) {
    descriptionElement.textContent = description;
  }
  else {
    descriptionElement.classList.add('visually-hidden');
  }

  const photosContainer = cardElement.querySelector('.popup__photos');
  const photoElementTemplate = photosContainer.querySelector('img');
  photoElementTemplate.remove();
  const photos = ad.offer.photos;
  photos.forEach((photo)=> {
    const photoElement = photoElementTemplate.cloneNode(true);
    photoElement.attributes.src.textContent = photo;
    photosContainer.appendChild(photoElement);
  });

  const avatarElement = cardElement.querySelector('.popup__avatar');
  const avatar = ad.author.avatar;
  if (avatar) {
    avatarElement.attributes.src.textContent = avatar;
  }
  else {
    avatarElement.remove();
  }

  mapCanvas.appendChild(cardElement);
});
