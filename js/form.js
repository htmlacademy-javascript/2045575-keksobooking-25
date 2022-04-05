import {resetMap} from './map.js';

const adForm = document.querySelector('.ad-form');
const mapForm = document.querySelector('.map__filters');

// Настройки Pristine
const pristine = new Pristine(adForm, {
  classTo: 'form__item',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'form__item',
  errorTextTag: 'span',
  errorTextClass: 'form__error',
});

const clearErrors = () => {
  const errors = adForm.querySelectorAll('.form__error');

  if (errors) {
    for (const error of errors) {
      error.innerText = '';
    }
  }
};

// Валидация для заголовка объявления
const titleField = adForm.querySelector('[name="title"]');
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const titleFieldError = `От ${MIN_TITLE_LENGTH} до ${MAX_TITLE_LENGTH} символов`;

const validateTitle = (value) => value.length >= MIN_TITLE_LENGTH && value.length <= MAX_TITLE_LENGTH;

pristine.addValidator(titleField, validateTitle, titleFieldError);

// Валидация влияния типа жилья на цену за ночь
const priceField = adForm.querySelector('[name="price"]');
const typeOfHousing = adForm.querySelector('[name="type"]');
const minPrices = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};
const MIN_RPICE = 0;
const MAX_PRICE = 100000;

const getPriceErrorMessage = () => `Число от ${minPrices[typeOfHousing.value]} до ${MAX_PRICE}`;

const validatePrice = (value) => value >= minPrices[typeOfHousing.value] && value <= MAX_PRICE;

typeOfHousing.addEventListener('change', () => {
  priceField.placeholder = `${minPrices[typeOfHousing.value]}`;
  pristine.validate(priceField);
});

pristine.addValidator(priceField, validatePrice, getPriceErrorMessage);

// Слайдер для цены за ночь
const priceSliderElement = document.querySelector('.ad-form__slider');
const PRICE_SLIDER_STEP = 100;

noUiSlider.create(priceSliderElement, {
  range: {
    min: MIN_RPICE,
    max: MAX_PRICE
  },
  start: MIN_RPICE,
  step: PRICE_SLIDER_STEP,
  connect: 'lower',
  format: {
    to: (value) => value.toFixed(0),
    from: (value) => parseFloat(value)
  }
});

priceField.addEventListener('input', () => {
  priceField.value = priceField.value.substr(0, 6);
  priceField.value = parseFloat(priceField.value);
  priceSliderElement.noUiSlider.set(priceField.value);
});

priceSliderElement.noUiSlider.on('slide', () => {
  priceField.value = priceSliderElement.noUiSlider.get();
  pristine.validate(priceField);
});

// Установление значений координат адреса по умолчанию
const DEFAULT_LAT = 35.68958;
const DEFAULT_LNG = 139.69207;
const addressField = document.querySelector('[name="address"]');

const setAddressValue = (latValue, lngValue) => {
  addressField.value = `${latValue}, ${lngValue}`;
};

// Синхронизация времени заезда и выезда
const timeIn = adForm.querySelector('[name="timein"]');
const timeOut = adForm.querySelector('[name="timeout"]');

timeIn.addEventListener('change', () => {
  timeOut.value = timeIn.value;
});

timeOut.addEventListener('change', () => {
  timeIn.value = timeOut.value;
});

// Валидация для количества комнат и мест
const roomsOption = {
  '1': '1',
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': '0'
};

const roomsField = adForm.querySelector('[name="rooms"]');
const capacityField = adForm.querySelector('[name="capacity"]');

const validateRooms = () => roomsOption[roomsField.value].includes(capacityField.value);

const getRoomsErrorMessage = () => {
  switch (roomsField.value) {
    case '1':
      return '1 комната только для 1 гостя';
    case '2':
      return '2 комнаты только от 1 до 2 гостей';
    case '3':
      return '3 комнаты только от 1 до 3 гостей';
    case '100':
      return '100 комнат не для гостей';
  }
};

capacityField.addEventListener('change', () => {
  pristine.validate(roomsField);
});

pristine.addValidator(roomsField, validateRooms, getRoomsErrorMessage);

// Смена состояния формы
const setFormInactive = () => {
  adForm.classList.add('ad-form--disabled');
  mapForm.classList.add('map__filters--disabled');
};

const setFormActive = () => {
  adForm.classList.remove('ad-form--disabled');
  mapForm.classList.remove('map__filters--disabled');
  setAddressValue(DEFAULT_LAT, DEFAULT_LNG);
};

// Очистка формы
const PLACEHOLDER_DEFAULT = 0;

const resetForm = () => {
  clearErrors();
  priceField.placeholder = PLACEHOLDER_DEFAULT;
  resetMap();
};

adForm.addEventListener('reset', resetForm);

// Отправка формы
adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

setFormInactive();
export {setFormActive, setAddressValue};
