import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import uz from '@/shared/locales/uz/translation.json'
import ru from '@/shared/locales/ru/translation.json'
import uz_cyr from '@/shared/locales/uz_cyr/translation.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      uz: { translation: uz },
      ru: { translation: ru },
      uz_cyr: { translation: uz_cyr },
    },
    fallbackLng: 'uz',
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'lang',
      caches: ['localStorage'],
    },
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
