const createFeatures = (featureList) => {
  const featureListFragment = document.createDocumentFragment();

  featureList.forEach((featureItem) => {
    const featureElement = document.createElement('li');
    featureElement.classList.add('popup__feature');
    featureElement.classList.add(`popup__feature--${featureItem}`);

    featureListFragment.append(featureElement);
  });

  return featureListFragment;
};

const createPhotos = (photosList) => {
  const photosListFragment = document.createDocumentFragment();

  photosList.forEach((url) => {
    const photoElement = document.createElement('img');
    photoElement.src = url;
    photoElement.width = '45';
    photoElement.height = '40';
    photoElement.alt = 'Фотография жилья';

    photosListFragment.append(photoElement);
  });

  return photosListFragment;
};

const housingTypes = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const createAdElement = ({offer, author}) => {
  const adElement = cardTemplate.cloneNode(true);

  adElement.querySelector('.popup__title').textContent = offer.title;
  adElement.querySelector('.popup__text--address').textContent = offer.address;
  adElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  adElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  adElement.querySelector('.popup__text--time').textContent =`Заезд после ${offer.checkout}, выезд до ${offer.checkout}`;
  adElement.querySelector('.popup__avatar').src = author.avatar;
  adElement.querySelector('.popup__type').textContent = housingTypes[offer.type];

  const popupDescription = adElement.querySelector('.popup__description');

  if (offer.description) {
    popupDescription.textContent = offer.description;
  }

  const featureContainer = adElement.querySelector('.popup__features');

  if (offer.features) {
    featureContainer.append(createFeatures(offer.features));
  }

  const photosContainer = adElement.querySelector('.popup__photos');

  if (offer.photos) {
    photosContainer.append(createPhotos(offer.photos));
  }

  return adElement;
};

export {createAdElement};
