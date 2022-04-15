import {debounce} from './util.js';
import {markerGroup, putMarkersListOnMap} from './map.js';
import {savedAdsData} from './server-api.js';

const INSERT_DELAY = 500;

const HousingPriceRank = {
  LOW: 'low',
  MIDDLE: 'middle',
  HIGH: 'high'
};
const {LOW, MIDDLE, HIGH} = HousingPriceRank;

const mapFilters = document.querySelector('.map__filters');

const getFilteredType = ({offer}) => {
  const housingTypeValue = mapFilters.querySelector('[name="housing-type"]').value;

  if (housingTypeValue === offer.type || housingTypeValue === 'any') {
    return true;
  }
};

const housingPriceStart = {
  low: 10000,
  middle: 50000,
  high: 100000,
};

const getFilteredPrice = ({offer}) => {
  const housingPriceValue = mapFilters.querySelector('[name="housing-price"]').value;

  switch (housingPriceValue) {
    case LOW:
      return offer.price <= housingPriceStart[housingPriceValue];
    case MIDDLE:
      return offer.price >= housingPriceStart[LOW] && offer.price <= housingPriceStart[housingPriceValue];
    case HIGH:
      return offer.price >= housingPriceStart[MIDDLE];
    default:
      return true;
  }
};

const getFilteredRooms = ({offer}) => {
  const housingRoomsValue = mapFilters.querySelector('[name="housing-rooms"]').value;

  if (offer.rooms === parseInt(housingRoomsValue, 10) || housingRoomsValue === 'any') {
    return true;
  }
};

const getFilteredGuests = ({offer}) => {
  const housingGuestsValue = mapFilters.querySelector('[name="housing-guests"]').value;

  if (offer.guests === parseInt(housingGuestsValue, 10) || housingGuestsValue === 'any') {
    return true;
  }
};

const getFilteredFeatures = ({offer}) => {
  const housingFeatures = mapFilters.querySelectorAll('[name="features"]:checked');
  const housingFeaturesValue = Array.from(housingFeatures, (elem) => elem.value);

  let hitCounter = 0;

  if (offer.features !== undefined) {
    for (let i = 0; i < housingFeaturesValue.length; i++) {
      if (offer.features.includes(housingFeaturesValue[i])) {
        hitCounter++;
      }
    }
  }

  if (housingFeaturesValue.length === hitCounter) {
    return true;
  }
};

const getFilteredAd = ({offer}) => {
  const type = getFilteredType({offer});
  const price = getFilteredPrice({offer});
  const rooms = getFilteredRooms({offer});
  const guests = getFilteredGuests({offer});
  const features = getFilteredFeatures({offer});

  return type && price && rooms && guests && features;
};

const onFiltersChange = () => {
  markerGroup.clearLayers();

  const filteredAdsData = savedAdsData.filter(({offer}) => getFilteredAd({offer}));
  putMarkersListOnMap(filteredAdsData);
};

mapFilters.addEventListener('change', debounce(onFiltersChange, INSERT_DELAY));

export {onFiltersChange};
