const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.querySelectorAll('.ad-form__element');
const adFormSlider = adForm.querySelector('.ad-form__slider');

const mapForm = document.querySelector('.map__filters');
const mapFormFilters = document.querySelectorAll('.map__filter');
const mapFormFeatures = document.querySelector('.map__features');

const setPageInactive = () => {
  adForm.classList.add('ad-form--disabled');
  adFormElements.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
  adFormSlider.setAttribute('disabled', 'disabled');

  mapForm.classList.add('map__filters--disabled');
  mapFormFilters.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
  mapFormFeatures.setAttribute('disabled', 'disabled');

};

const setPageActive = () => {
  adForm.classList.remove('ad-form--disabled');
  adFormElements.forEach((element) => {
    element.removeAttribute('disabled', 'disabled');
  });
  adFormSlider.removeAttribute('disabled', 'disabled');

  mapForm.classList.remove('map__filters--disabled');
  mapFormFilters.forEach((element) => {
    element.removeAttribute('disabled', 'disabled');
  });
  mapFormFeatures.removeAttribute('disabled', 'disabled');

};

setPageInactive();
export {setPageActive};
