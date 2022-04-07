import {putMarkerOnMap} from './map.js';
import { showAlert } from './util.js';
import { getData } from './server-api.js';

const MAX_ADS_AMOUNT = 10;

getData(((ads) => ads.slice(0, MAX_ADS_AMOUNT).forEach(({offer, author, location}) => {
  putMarkerOnMap({offer, author, location});
})), () => showAlert('Не удалось загрузить данные с сервера.'));
