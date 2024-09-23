const localeToCurrency = {
  'en-US': 'USD',
  'en-GB': 'GBP',
  'en-CA': 'CAD',
  'en-AU': 'AUD',
  'en-NZ': 'NZD',
  'en-IN': 'INR',
  'en-ZA': 'ZAR',
  'en-NG': 'NGN',
  'en-GH': 'GHS',
  'en-KE': 'KES',
  'en-TZ': 'TZS',
  'en-UG': 'UGX',
  'en-ZM': 'ZMW',
  'en-ZW': 'ZWL',
  'en-MW': 'MWK',
  'ja-JP': 'JPY',
  'zh-CN': 'CNY',
  'zh-TW': 'TWD',
  'zh-HK': 'HKD',
  'zh-SG': 'SGD',
  'zh-MY': 'MYR',
  'zh-TH': 'THB',
  'zh-VN': 'VND',
  'zh-PH': 'PHP',
  'zh-ID': 'IDR',
};

export const getCurrency = () => {
  let locale = 'en-US';
  if (typeof window !== 'undefined') {
    locale = window.navigator.language as keyof typeof localeToCurrency;
  }
  if (!localeToCurrency[locale as keyof typeof localeToCurrency]) {
    return 'USD';
  }
  return localeToCurrency[locale as keyof typeof localeToCurrency];
};

export const getCurrencySymbol = () => {
  let locale = 'en-US';
  if (typeof window !== 'undefined') {
    locale = window.navigator.language as keyof typeof localeToCurrency;
  }
  if (!localeToCurrency[locale as keyof typeof localeToCurrency]) {
    return 'USD';
  }
  const currencyCode =
    localeToCurrency[locale as keyof typeof localeToCurrency] || 'USD';
  return Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    currencyDisplay: 'narrowSymbol',
  }).format(0)[0];
};
