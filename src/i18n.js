import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HTTPApi from "i18next-http-backend";
// import HTTPApi from "../Languages/";


i18next.use(HTTPApi).use(LanguageDetector).use(initReactI18next).init({

        fallbackLng: 'en',
    interpolation: {
        escapeValue:false
    }}
);

export default i18next