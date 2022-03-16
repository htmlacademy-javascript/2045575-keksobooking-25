import {getArrayOfAds} from './data.js';

const adTemplate = document.querySelector('#card').content.querySelector('.popup');
const mapCanvas = document.querySelector('#map-canvas');
const similarAds = getArrayOfAds(1);

const drawSimilarAds = () => {
  similarAds.forEach(({offer, author}) => {
    const typesDictionary = {
      'palace': 'Дворец',
      'flat': 'Квартира',
      'house': 'Дом',
      'bungalow': 'Бунгало',
      'hotel': 'Отель',
    };

    const adElement = adTemplate.cloneNode(true);
    adElement.querySelector('.popup__title').textContent = offer.title;
    adElement.querySelector('.popup__text--address').textContent = offer.address;
    adElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
    adElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
    adElement.querySelector('.popup__text--time').textContent =`Заезд после ${offer.checkout}, выезд до ${offer.checkout}`;
    adElement.querySelector('.popup__avatar').src = author.avatar;

    const popupDescription = adElement.querySelector('.popup__description');
    popupDescription.innerHTML = '';
    if (offer.description) {
      popupDescription.textContent = offer.description;
    }

    const featureContainer = adElement.querySelector('.popup__features');
    const featureList = featureContainer.querySelectorAll('.popup__feature');
    featureList.forEach((featureItem) => {
      const isNecessary = offer.features.some((offerFeature) =>
        featureItem.classList.contains(`popup__feature--${offerFeature}`),
      );
      if (!isNecessary) {
        featureItem.remove();
      }
    });

    const popupPhotos = adElement.querySelector('.popup__photos');
    const popupImg = popupPhotos.querySelector('img');
    popupImg.remove();
    if (offer.photos) {
      offer.photos.forEach((url) => {
        const cloneImgTemplate = popupImg.cloneNode(true);
        cloneImgTemplate.src = url;
        popupPhotos.append(cloneImgTemplate);
      });
    }

    const popupType = adElement.querySelector('.popup__type');
    for (const key in typesDictionary) {
      if (key === offer.type) {
        popupType.textContent = typesDictionary[key];
      }
    }
    mapCanvas.append(adElement);
  });
};

export {drawSimilarAds};
