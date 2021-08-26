/** Converts a language key to an Open Graph compatible locale string. */
export const getOpenGraphLocale = (language: string) => {
  const region = language === 'en' ? 'US' : language.toUpperCase();

  return language + '_' + region;
};
