import {resetMap} from './map.js';
import { sendData } from './server-api.js';
import { successMessage, errorMessage, showDialog } from './dialogs.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MIN_RPICE = 0;
const MAX_PRICE = 100000;
const PRICE_SLIDER_STEP = 100;
const PRICE_PLACEHOLDER_DEFAULT = 1000;

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

// Валидация для заголовка объявления
const titleField = adForm.querySelector('[name="title"]');
const titleFieldError = `От ${MIN_TITLE_LENGTH} до ${MAX_TITLE_LENGTH} символов`;

const validateTitle = (value) => value.length >= MIN_TITLE_LENGTH && value.length <= MAX_TITLE_LENGTH;

pristine.addValidator(titleField, validateTitle, titleFieldError);

// Валидация влияния типа жилья на цену за ночь
const priceField = adForm.querySelector('[name="price"]');
const typeOfHousing = adForm.querySelector('[name="type"]');

const minPriceStart = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const getPriceErrorMessage = () => `Число от ${minPriceStart[typeOfHousing.value]} до ${MAX_PRICE}`;

const validatePrice = (value) => value >= minPriceStart[typeOfHousing.value] && value <= MAX_PRICE;

typeOfHousing.addEventListener('change', () => {
  priceField.placeholder = `${minPriceStart[typeOfHousing.value]}`;
  pristine.validate(priceField);
});

pristine.addValidator(priceField, validatePrice, getPriceErrorMessage);

// Слайдер для цены за ночь
const priceSliderElement = document.querySelector('.ad-form__slider');

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
const roomsField = adForm.querySelector('[name="rooms"]');
const capacityField = adForm.querySelector('[name="capacity"]');

const roomOptions = {
  1: '1',
  2: ['2', '1'],
  3: ['3', '2', '1'],
  100: '0'
};

const validateRooms = () => roomOptions[roomsField.value].includes(capacityField.value);

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

// Смена состояния форм
const setFormsInactive = () => {
  adForm.classList.add('ad-form--disabled');
  mapForm.classList.add('map__filters--disabled');
};

setFormsInactive();

const setAdFormActive = () => {
  adForm.classList.remove('ad-form--disabled');
};

const setMapFormActive = () => {
  mapForm.classList.remove('map__filters--disabled');
};

// Очистка формы
const resetButton = adForm.querySelector('.ad-form__reset');

const onFormReset = () => {
  mapForm.reset();
  adForm.reset();
  priceField.placeholder = PRICE_PLACEHOLDER_DEFAULT;
  priceSliderElement.noUiSlider.set(PRICE_PLACEHOLDER_DEFAULT);
  resetMap();
};

resetButton.addEventListener('click', onFormReset);

// Отправка формы
const submitButton = adForm.querySelector('.ad-form__submit');

const blockSubmitButton = () => {
  submitButton.disabled = 'true';
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = 'false';
  submitButton.textContent = 'Опубликовать';
};

const onSubmitSuccess = () => {
  unblockSubmitButton();
  onFormReset();
  showDialog(successMessage);
};

const onSubmitError = () => {
  unblockSubmitButton();
  showDialog(errorMessage);
};

const onAdFormSubmit = (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    blockSubmitButton();
    sendData(onSubmitSuccess, onSubmitError, new FormData(evt.target));
  }
};

adForm.addEventListener('submit', onAdFormSubmit);

export {setAdFormActive, setMapFormActive, setFormsInactive, setAddressValue, mapForm};
