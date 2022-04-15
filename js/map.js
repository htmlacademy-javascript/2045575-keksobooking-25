import {setMapFormActive, setAddressValue, setAdFormActive} from './form.js';
import {createAdElement} from './create-ad.js';
import { getData } from './server-api.js';
import { showRequestErrorMessage } from './dialogs.js';

const MAX_ADS_AMOUNT = 10;

const tokyoPosition = {
  lat: 35.68179,
  lng: 139.7499,
  zoom: 12
};
const {lat, lng, zoom} = tokyoPosition;

const map = L.map('map-canvas');

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// Создание главного маркера
const mainMarkerIcon = L.icon(
  {
    iconUrl: './img/main-pin.svg',
    iconSize: [52,52],
    iconAnchor: [26,52]
  }
);

const mainMarker = L.marker(
  {
    lat,
    lng
  },
  {
    draggable: true,
    icon: mainMarkerIcon
  }
);

mainMarker.addTo(map);

// Изменение значения поля адреса координатами главного маркера
mainMarker.on('moveend', (evt) => {
  const {target} = evt;
  const mainMarkerLat = parseFloat(target.getLatLng().lat.toFixed(5));
  const mainMarkerLng = parseFloat(target.getLatLng().lng.toFixed(5));

  setAddressValue(mainMarkerLat, mainMarkerLng);
});

// Создание маркеров для объявлений на карте
const adMarkerIcon = L.icon(
  {
    iconUrl: './img/pin.svg',
    iconSize: [40,40],
    iconAnchor: [20,40]
  }
);

const markerGroup = L.layerGroup().addTo(map);

const createMarker = ({location}) => {
  const adMarker = L.marker(
    {
      lat: location.lat,
      lng: location.lng

    },
    {
      adMarkerIcon
    }
  );

  return adMarker;
};

const putMarkerOnMap = ({offer, author, location}) => {
  createMarker({location})
    .addTo(markerGroup)
    .bindPopup(createAdElement({offer, author}));
};

const putMarkersListOnMap = (ads) => {
  ads.slice(0, MAX_ADS_AMOUNT)
    .forEach(({offer, author, location}) => {
      putMarkerOnMap({offer, author, location});
    });
};

const onRequestSuccess = (data) => {
  putMarkersListOnMap(data);
  setMapFormActive();
};

const onRequestError = () => {
  showRequestErrorMessage('Не удалось загрузить данные с сервера.');
};

const onMapLoad = () => {
  setAdFormActive();
  getData(onRequestSuccess, onRequestError);
};

map.on('load', onMapLoad)
  .setView({
    lat,
    lng
  }, zoom);

// Очистка карты
const resetMap = () => {
  mainMarker.setLatLng(
    {
      lat,
      lng
    }
  );
  map.setView(
    {
      lat,
      lng
    }, zoom);
  setAddressValue(lat, lng);
};

export {putMarkerOnMap, resetMap, tokyoPosition, putMarkersListOnMap, markerGroup};
