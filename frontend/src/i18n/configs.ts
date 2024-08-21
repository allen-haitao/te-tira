import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translation_en from "./en.json";
import translation_mi from "./mi.json";
import translation_zh_cn from "./zh_cn.json";
import translation_zh_tw from "./zh_tw.json";

const resources = {
  en: {
    translation: translation_en,
  },
  mi: {
    translation: translation_mi,
  },
  zh_cn: {
    translation: translation_zh_cn,
  },
  zh_tw: {
    translation: translation_zh_tw,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",
    // keySeparator: false, // we do not use keys in form messages.welcome
    // header.slogan
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;