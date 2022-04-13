import { mapForm } from './form.js';

const housingPrices = {
  low: 10000,
  middle: 50000,
};

const housingRooms = {
  1: 1,
  2: 2,
  3: 3
};

const housingGuests = {
  0: 100,
  1: 1,
  2: 2
};

const onFilterChange = (cb) => {
  mapForm.addEventListener('change', (evt) => {
    const {target} = evt;
    if (target.matches('.map__filter') || target.matches('.map__checkbox')) {
      cb();
    }
  });
};

const getFilteredType = ({offer}, formData) => {
  const housingTypeValue = formData.get('housing-type');
  if (housingTypeValue === 'any' || housingTypeValue === offer.type) {
    return offer.type;
  }
};

const getFilteredPrice = ({offer}, formData) => {
  const housingPriceValue = formData.get('housing-price');

  switch (housingPriceValue) {
    case 'low':
      return offer.price <= housingPrices[housingPriceValue];
    case 'middle':
      return offer.price >= housingPrices['low'] && offer.price <= housingPrices[housingPriceValue];
    case 'high':
      return offer.price >= housingPrices['middle'];
    default:
      return offer.price;
  }
};

const getFilteredRooms = ({offer}, formData) => {
  const housingRoomsValue = formData.get('housing-rooms');

  switch (housingRoomsValue) {
    case '1':
      return offer.rooms === housingRooms[housingRoomsValue];
    case '2':
      return offer.rooms === housingRooms[housingRoomsValue];
    case '3':
      return offer.rooms === housingRooms[housingRoomsValue];
    default:
      return offer.rooms;
  }
};

const getFilteredGuests = ({offer}, formData) => {
  const housingGuestsValue = formData.get('housing-guests');

  switch (housingGuestsValue) {
    case '0':
      return offer.rooms === housingGuests[housingGuestsValue];
    case '1':
      return offer.guests === housingGuests[housingGuestsValue];
    case '2':
      return offer.guests === housingGuests[housingGuestsValue];
    default:
      return offer.guests;
  }
};

const getFilteredFeatures = ({offer}, formData) => {
  const housingFeaturesValue = formData.getAll('features');

  let hitCounter = 0;

  for (let i = 0; i < housingFeaturesValue.length; i++) {
    if (offer.features !== undefined && offer.features.includes(housingFeaturesValue[i])) {
      hitCounter++;
    }
  }

  if (housingFeaturesValue.length === hitCounter) {
    return offer.features;
  }
};

const getFilteredAd = ({offer}) => {
  const mapFormData = new FormData(mapForm);

  const filteredType = getFilteredType({offer}, mapFormData);
  const filteredPrice = getFilteredPrice({offer}, mapFormData);
  const filteredRooms = getFilteredRooms({offer}, mapFormData);
  const filteredGuests = getFilteredGuests({offer}, mapFormData);
  const filteredFeatures = getFilteredFeatures({offer}, mapFormData);

  return filteredType && filteredPrice && filteredRooms && filteredGuests && filteredFeatures;
};

export {getFilteredAd, onFilterChange};
