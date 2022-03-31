import {fillAd} from './draw-ads.js';
import {setFormActive} from './form.js';

const tokyoPosition = {
  lat: 35.68958,
  lng: 139.69207,
  zoom: 12
};

const map = L.map('map-canvas').on('load', setFormActive)
  .setView({
    lat: tokyoPosition.lat,
    lng: tokyoPosition.lng
  }, tokyoPosition.zoom);

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
    lat: tokyoPosition.lat,
    lng: tokyoPosition.lng
  },
  {
    draggable: true,
    icon: mainMarkerIcon
  }
);

mainMarker.addTo(map);

// Заполнение значения поля адреса координатами главного маркера
const addressField = document.querySelector('[name="address"]');
addressField.value = `${tokyoPosition.lat}, ${tokyoPosition.lng}`;

mainMarker.on('moveend', (evt) => {
  const mainMarkerLat = parseFloat(evt.target.getLatLng().lat.toFixed(5));
  const mainMarkerLng = parseFloat(evt.target.getLatLng().lng.toFixed(5));
  addressField.value = `${mainMarkerLat}, ${mainMarkerLng}`;
});

// Создание маркеров для объявлений
const adMarkerIcon = L.icon(
  {
    iconUrl: './img/pin.svg',
    iconSize: [40,40],
    iconAnchor: [20,40]
  }
);

const createMarker = ({offer, author, location}) => {
  const adMarker = L.marker(
    {
      lat: location.lat,
      lng: location.lng

    },
    {
      adMarkerIcon
    }
  );

  adMarker.addTo(map).bindPopup(fillAd({offer, author}));

  return adMarker;
};

export {map, mainMarker, addressField, tokyoPosition, createMarker};
