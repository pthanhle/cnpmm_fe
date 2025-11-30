import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import commonEN from '../locales/en/common.json';
import studentsEN from '../locales/en/students.json';

import commonVI from '../locales/vi/common.json';
import studentsVI from '../locales/vi/students.json';

const resources = {
    en: {
        common: commonEN,
        students: studentsEN,
        // thêm projects, orders...
    },
    vi: {
        common: commonVI,
        students: studentsVI,
        // ...
    },
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'vi',
        defaultNS: 'common',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;