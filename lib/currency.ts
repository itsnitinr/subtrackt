const localeToCurrency = {
  'en-AU': 'AUD',
  'en-CA': 'CAD',
  'en-GB': 'GBP',
  'en-IE': 'EUR',
  'en-IN': 'INR',
  'en-NZ': 'NZD',
  'en-US': 'USD',
  'en-ZA': 'ZAR',
  'es-AR': 'ARS',
  'es-CL': 'CLP',
  'es-CO': 'COP',
  'es-ES': 'EUR',
  'es-MX': 'MXN',
  'es-US': 'USD',
  'fr-BE': 'EUR',
  'fr-CA': 'CAD',
  'fr-CH': 'CHF',
  'fr-FR': 'EUR',
  'ar-SA': 'SAR',
  'bn-BD': 'BDT',
  'bn-IN': 'INR',
  'cs-CZ': 'CZK',
  'da-DK': 'DKK',
  'de-AT': 'EUR',
  'de-CH': 'CHF',
  'de-DE': 'EUR',
  'el-GR': 'EUR',
  'fi-FI': 'EUR',
  'he-IL': 'ILS',
  'hi-IN': 'INR',
  'hu-HU': 'HUF',
  'it-CH': 'CHF',
  'it-IT': 'EUR',
  'ja-JP': 'JPY',
  'ko-KR': 'KRW',
  'nl-BE': 'EUR',
  'nl-NL': 'EUR',
  'no-NO': 'NOK',
  'pl-PL': 'PLN',
  'pt-BR': 'BRL',
  'ro-RO': 'RON',
  'ru-RU': 'RUB',
  'sk-SK': 'EUR',
  'sv-SE': 'SEK',
  'ta-IN': 'INR',
  'ta-LK': 'LKR',
  'th-TH': 'THB',
  'tr-TR': 'TRY',
  'zh-CN': 'CNY',
  'zh-HK': 'HKD',
  'zh-TW': 'TWD',
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
