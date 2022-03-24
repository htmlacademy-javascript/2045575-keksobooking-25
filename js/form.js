const adForm = document.querySelector('.ad-form');
const mapForm = document.querySelector('.map__filters');

const setFormInactive = () => {
  adForm.classList.add('ad-form--disabled');
  mapForm.classList.add('map__filters--disabled');
};

const setFormActive = () => {
  adForm.classList.remove('ad-form--disabled');
  mapForm.classList.remove('map__filters--disabled');
};

setFormInactive();
export {setFormActive};
