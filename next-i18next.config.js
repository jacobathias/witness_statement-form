/**
 * @type {import('next-i18next').UserConfig}
 */
module.exports = {
    i18n: {
      defaultLocale: "en", //default locale
      locales: ["en", "es", "ht"], // list of supported locales
      react: {
        ssr: false,
      },
    },  
    reloadOnPrerender: process.env.NODE_ENV === 'development',

  };

// next-i18next.config.js
// module.exports = {
//   i18n: {
//     defaultLocale: "en", //default locale
//     locales: ["en", "es", "ht"], // list of supported locales
//   },
// };