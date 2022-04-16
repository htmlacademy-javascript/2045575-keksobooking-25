let ads = [];

const saveAds = (data) => {
  ads = data;
};

const getSavedAds = () => ads;

export {saveAds, getSavedAds};
