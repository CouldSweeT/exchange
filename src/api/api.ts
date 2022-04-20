export const request = async (options = {}) => {
  const response = await fetch(`https://api.currencyapi.com/v3/latest?apikey=07wkwCQt5WCZ0RjGfRwI1QOyFecCodssH52bwdRt&base_currency=UAH`, options);

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  return response.json();
};
