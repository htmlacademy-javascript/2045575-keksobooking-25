import {debounce} from './util.js';
import {putMarkersListOnMap} from './map.js';
import { getSavedAds } from './ads.js';

const INSERT_DELAY = 500;

const HousingPriceRank = {
  LOW: 'low',
  MIDDLE: 'middle',
  HIGH: 'high'
};

const mapFilters = document.querySelector('.map__filters');

const housingType = mapFilters.querySelector('[name="housing-type"]');

const filterByType = ({offer}) => {
  const housingTypeValue = housingType.value;

  return housingTypeValue === offer.type || housingTypeValue === 'any';
};

const housingPriceValues = {
  low: 10000,
  middle: 50000,
  high: 100000,
};

const housingPrice = mapFilters.querySelector('[name="housing-price"]');

const filterByPrice = ({offer}) => {
  const housingPriceValue = housingPrice.value;
  const {LOW, MIDDLE, HIGH} = HousingPriceRank;

  switch (housingPriceValue) {
    case LOW:
      return offer.price <= housingPriceValues[housingPriceValue];
    case MIDDLE:
      return offer.price >= housingPriceValues[LOW] && offer.price <= housingPriceValues[housingPriceValue];
    case HIGH:
      return offer.price >= housingPriceValues[MIDDLE];
    default:
      return true;
  }
};

const housingRooms = mapFilters.querySelector('[name="housing-rooms"]');

const filterByRooms = ({offer}) => {
  const housingRoomsValue = housingRooms.value;

  return offer.rooms === +housingRoomsValue || housingRoomsValue === 'any';
};

const housingGuests = mapFilters.querySelector('[name="housing-guests"]');

const filterByGuests = ({offer}) => {
  const housingGuestsValue = housingGuests.value;

  return offer.guests === +housingGuestsValue || housingGuestsValue === 'any';
};

const filterByFeatures = ({offer}) => {
  const features = mapFilters.querySelectorAll('[name="features"]:checked');
  const featuresValues = Array.from(features, (elem) => elem.value);

  if (offer.features) {
    return featuresValues.every((value) => offer.features.includes(value));
  }
};

const onFiltersChange = () => {
  const filteredAds = getSavedAds().filter(({offer}) =>
    filterByType({offer}) &&
    filterByRooms({offer}) &&
    filterByPrice({offer}) &&
    filterByGuests({offer}) &&
    filterByFeatures({offer}));

  putMarkersListOnMap(filteredAds);
};

mapFilters.addEventListener('change', debounce(onFiltersChange, INSERT_DELAY));
