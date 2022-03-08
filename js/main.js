function getRandomInt(firstNum, lastNum) {
  if (firstNum >= lastNum || firstNum < 0) {
    return null;
  }

  return Math.floor(Math.random() * (lastNum - firstNum + 1)) + firstNum;
}

function getRandomFloat(firstNum, lastNum, floatingPointNumber) {
  if (firstNum >= lastNum || firstNum < 0) {
    return null;
  }

  return (Math.random() * (lastNum - firstNum) + firstNum).toFixed(floatingPointNumber);
}

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];
const CHECKIN = [
  '12:00',
  '13:00',
  '14:00',
];
const CHECKOUT = [
  '12:00',
  '13:00',
  '14:00',
];
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const MAX_ADS_AMOUNT = 10;

const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];

const getRandomArrayLength = (array) => {
  const randomIndex = getRandomInt(0, array.length - 1);

  return array.splice(randomIndex);
};

const createAd = (id) => {
  const location = {
    lat: getRandomFloat(35.65000, 35.70000, 5),
    lng: getRandomFloat(139.70000, 139.80000, 5),
  };

  const uniqueId = String(++id).padStart(2, 0);

  const objectAd = {
    author: {
      avatar: `img/avatars/user${uniqueId}.png`,
    },
    offer: {
      title: 'Новое объявление',
      address: `${location.lat}, ${location.lng}`,
      price: getRandomInt(1500, 4500),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomInt(1, 5),
      guests: getRandomInt(1, 8),
      checkin: getRandomArrayElement(CHECKIN),
      checkout: getRandomArrayElement(CHECKOUT),
      features: getRandomArrayLength(FEATURES),
      description: 'На подоконнике лежит бумажка с колбасными шкурками',
      photos: getRandomArrayLength(PHOTOS)
    },
    location,
  };

  return objectAd;
};

const getArrayOfAds = (amount) => Array.from({length: amount}, (v, id) => createAd(id));
getArrayOfAds(MAX_ADS_AMOUNT);
