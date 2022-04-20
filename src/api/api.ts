export const request = async (options = {}) => {
  const response = await fetch(`https://v6.exchangerate-api.com/v6/0095bfcac34e3d0db736d450/latest/UAH`, options);

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  return response.json();
};
