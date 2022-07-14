const AVATAR_TYPES = [
  'image/jpeg',
  'image/png'
];

const LIVING_TYPE_MIN_PRICE = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

export const isImage = (element) => AVATAR_TYPES.some((validType) => element.type === validType);

export const getPriceFromType = (price) => LIVING_TYPE_MIN_PRICE[price];
