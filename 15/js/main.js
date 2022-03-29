import {getArrayOfAds, MAX_ADS_AMOUNT} from './data.js';
import {drawAd} from './draw-ads.js';
import {setFormActive} from './form.js';
getArrayOfAds(MAX_ADS_AMOUNT);
drawAd();
setFormActive();
