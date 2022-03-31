import {createMarker} from './map.js';
import { similarAds } from './draw-ads.js';

similarAds.forEach(({offer, author, location}) => {
  createMarker({offer, author, location});
});
