const adForm = document.querySelector('.ad-form');
const mapForm = document.querySelector('.map__filters');

// Смена состояния формы
const setFormInactive = () => {
  adForm.classList.add('ad-form--disabled');
  mapForm.classList.add('map__filters--disabled');
};

const setFormActive = () => {
  adForm.classList.remove('ad-form--disabled');
  mapForm.classList.remove('map__filters--disabled');
};

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
const titleForm = adForm.querySelector('[name="title"]');

function validateTitle (value) {
  return value.length >= 30 && value.length <= 100;
}

pristine.addValidator(titleForm, validateTitle, 'От 30 до 100 символов');

// Валидация для цены объявления
const priceForm = adForm.querySelector('[name="price"]');

function validatePrice (value) {
  return value>= 1 && value <= 100000;
}

pristine.addValidator(priceForm, validatePrice, 'Значение от 1 до 100 000');

// Валидация для количества комнат и мест
const roomsOption = {
  '1': '1',
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': '0'
};

const roomsField = adForm.querySelector('[name="rooms"]');
const capacityField = adForm.querySelector('[name="capacity"]');

function validateRooms () {
  return roomsOption[roomsField.value].includes(capacityField.value);
}

function getRoomsErrorMessage () {
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
}

capacityField.addEventListener('change', () => {
  pristine.validate(roomsField);
});

pristine.addValidator(roomsField, validateRooms, getRoomsErrorMessage);

// Отправка формы
adForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});

setFormInactive();
export {setFormActive};
