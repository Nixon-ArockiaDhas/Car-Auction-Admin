export const getSellerList = (community) => {
  return community.map((seller) => ({
    label: seller.seller_name,
    value: seller.id,
  }));
};

export const getStateList = (community, sellerId) => {
  if (!sellerId) {
    return [];
  }
  const selectedSeller = community.find((seller) => seller.id === sellerId);
  if (!selectedSeller || !selectedSeller.state_names) {
    return [];
  }

  return selectedSeller.state_names.map((state) => ({
    label: state.name,
    value: state.id,
  }));
};

export const getDistrictList = (community, sellerId, stateId) => {
  if (!sellerId || !stateId) {
    return [];
  }

  const selectedSeller = community.find((seller) => seller.id === sellerId);
  if (!selectedSeller || !selectedSeller.state_names) {
    return [];
  }

  const selectedState = selectedSeller.state_names.find(
    (state) => state.id === stateId
  );
  if (!selectedState || !selectedState.district_names) {
    return [];
  }

  return selectedState.district_names.map((district) => ({
    label: district.name,
    value: district.id,
  }));
};

export const getLocationList = (community, sellerId, stateId, districtId) => {
  if (!sellerId || !stateId || !districtId) {
    return [];
  }

  const selectedSeller = community.find((seller) => seller.id === sellerId);
  if (!selectedSeller || !selectedSeller.state_names) {
    return [];
  }

  const selectedState = selectedSeller.state_names.find(
    (state) => state.id === stateId
  );
  if (!selectedState || !selectedState.district_names) {
    return [];
  }

  const selectedDistrict = selectedState.district_names.find(
    (district) => district.id === districtId
  );
  if (!selectedDistrict || !selectedDistrict.locations) {
    return [];
  }

  return selectedDistrict.locations.map((location) => ({
    label: location.location_name,
    value: location.id,
  }));
};
