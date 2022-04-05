import {putMarkerOnMap} from './map.js';
import { similarAds } from './draw-ads.js';

similarAds.forEach(({offer, author, location}) => {
  putMarkerOnMap({offer, author, location});
});
