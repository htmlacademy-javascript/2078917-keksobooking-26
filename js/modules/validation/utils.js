const AVATAR_TYPES = [
  'image/jpeg',
  'image/png'
];

const livingTypeMinPrice = {
  BUNGALOW: 0,
  FLAT: 1000,
  HOTEL: 3000,
  HOUSE: 5000,
  PALACE: 10000
};

export const isImage = (element) => AVATAR_TYPES.some((validType) => element.type === validType);

export const getHousingTypePrice = (price) => livingTypeMinPrice[price.toUpperCase()];
