import {getArrayOfAds, MAX_ADS_AMOUNT} from './data.js';
import {drawAd} from './draw-ads.js';
import {setPageActive} from './page-condition.js';
getArrayOfAds(MAX_ADS_AMOUNT);
drawAd();
setPageActive();
