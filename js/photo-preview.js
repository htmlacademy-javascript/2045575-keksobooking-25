const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const DEFAULT_USER_IMG = 'img/muffin-grey.svg';

const userPhotoChooser = document.querySelector('.ad-form__field input[type=file]');
const userPhotoPreview = document.querySelector('.ad-form-header__preview img');

const housingPhotoChooser = document.querySelector('.ad-form__upload input[type=file]');
const housingPhotoPreviewContainer = document.querySelector('.ad-form__photo');
const housingPhotoPreview = document.createElement('img');

const onPhotoChoose = (photoChooser, preview) => {
  const file = photoChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
};

userPhotoChooser.addEventListener('change', (evt) => {
  const {target} = evt;

  onPhotoChoose(target, userPhotoPreview);
});

housingPhotoChooser.addEventListener('change', (evt) => {
  const {target} = evt;
  housingPhotoPreviewContainer.append(housingPhotoPreview);

  onPhotoChoose(target, housingPhotoPreview);
});

const clearPhotos = () => {
  userPhotoPreview.src = DEFAULT_USER_IMG;
  housingPhotoPreview.remove();
};

export {clearPhotos};
