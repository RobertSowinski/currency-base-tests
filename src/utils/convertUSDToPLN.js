export const convertUSDToPLN = (USD) => {
  if (typeof USD === 'string') {
    return NaN;
  }
  if (typeof USD === 'undefined') {
    return NaN;
  }
  if (typeof USD !== 'number') {
    return 'Error';
  }
  if (USD < 0) {
    return '$0.00';
  }
  const USDtoPLN = USD * 3.5;
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PLN'
  });

  return formatter.format(USDtoPLN).replace(/\u00a0/g, ' ');
}