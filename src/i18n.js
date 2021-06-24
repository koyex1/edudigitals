import i18n from 'i18next';
import {initReactI18next} from 'react-i18next'
import common_en from './translations/en.json'
import common_da from './translations/da.json'
import common_ar from './translations/ar.json'
import common_it from './translations/it.json'
import common_es from './translations/es.json'





const resources ={
    en:{
        translation: common_en
    },
    da:{
        translation: common_da
    },
    ar:{
        translation: common_ar
    },
    it:{
        translation: common_it
    },
    es:{
        translation: common_es
    }

}

i18n
.use(initReactI18next)
.init({
    resources,
    lng: "en",
    fallbackLng: "en",
    keySeparator: false,
    interpolation:{
        escapeValue: false
    }
})

export default i18n;
