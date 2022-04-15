let savedAdsData = [];

const saveData = (data) => {
  savedAdsData = data;
};

const getSavedData = () => savedAdsData;

export {saveData, getSavedData};
