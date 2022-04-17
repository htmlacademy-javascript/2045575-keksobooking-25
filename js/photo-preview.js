const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const DEFAULT_USER_IMG = 'img/muffin-grey.svg';
const MAX_HOUSING_IMG_AMOUNT = 3;

const userPhotoChooser = document.querySelector('.ad-form__field input[type=file]');
const userPhotoPreview = document.querySelector('.ad-form-header__preview img');

const housingPhotoChooser = document.querySelector('.ad-form__upload input[type=file]');
const housingPhotoPreviewContainer = document.querySelector('.ad-form__photo');

const getPhotoUrl = (photoChooser) => {
  const file = photoChooser.files[0];
  let fileName = '';

  if (file) {
    fileName = file.name.toLowerCase();
  }

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    return URL.createObjectURL(file);
  }
};

userPhotoChooser.addEventListener('change', (evt) => {
  const {target} = evt;
  const url = getPhotoUrl(target);

  if (url) {
    userPhotoPreview.src = url;
  }
});

let imgCounter = 0;

housingPhotoChooser.addEventListener('change', (evt) => {
  const {target} = evt;
  const url = getPhotoUrl(target);

  if (url && imgCounter < MAX_HOUSING_IMG_AMOUNT) {
    const preview = document.createElement('img');
    preview.src = url;
    housingPhotoPreviewContainer.append(preview);
  }

  imgCounter++;
});

const clearPhotos = () => {
  userPhotoPreview.src = DEFAULT_USER_IMG;
  const housingPhotoPreviews = housingPhotoPreviewContainer.querySelectorAll('img');
  imgCounter = 0;

  for (const preview of housingPhotoPreviews) {
    preview.remove();
  }
};

export {clearPhotos};
