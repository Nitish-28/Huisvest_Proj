import React from 'react';

export default function MoneyFormat({ amount }) {
  // Function to format the number
  const formatMoney = (value) => {
    if (isNaN(value)) return 'Invalid amount';

    // Format the number with a fixed 2 decimal places
    return new Intl.NumberFormat('de-DE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  return <span>€{formatMoney(amount)}</span>;
}