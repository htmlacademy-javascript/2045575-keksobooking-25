const MAX_ADS_AMOUNT = 10;

let ads = [];

const saveAds = (data) => {
  ads = data;
};

const getSavedAds = () => ads;

const getMaxAdsAmount = () => ads.slice(0, MAX_ADS_AMOUNT);

export {saveAds, getSavedAds, getMaxAdsAmount, MAX_ADS_AMOUNT};
