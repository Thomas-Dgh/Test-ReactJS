// EXPIRATION DATE
export const isMinimalExpirationDate = (value) => {
  var minimalExpirationDate = new Date();
  minimalExpirationDate.setDate(minimalExpirationDate.getDate() + 30); //NOW + 30
  return minimalExpirationDate < new Date(value);
};


export const isNameValid = (value) => {
	return value.trim().length > 0 && value.trim().length <= 200;
};

export const isCategoriesValid = (value) => {
	return value.length > 0 && value.length <= 5;
}

