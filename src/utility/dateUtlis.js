export const checkAndUpdateDate = (inputDate) => {
  const currentDate = new Date().toISOString().split('T')[0]; 

  if (!inputDate || isNaN(new Date(inputDate).getTime())) {
      return currentDate; 
  }

  const inputDateObj = new Date(inputDate).toISOString().split('T')[0];

  if (inputDateObj < currentDate) {
      return currentDate; 
  }
  return inputDateObj; 
};