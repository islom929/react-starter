import { create } from 'zustand'
import i18n from '@/shared/lib/i18n'

type Language = 'uz' | 'ru' | 'uz_cyr'

interface LanguageStore {
  lang: Language
  setLang: (lang: Language) => void
}

export const useLanguageStore = create<LanguageStore>((set) => ({
  lang: (localStorage.getItem('lang') as Language) || 'uz',
  setLang: (lang) => {
    localStorage.setItem('lang', lang)
    i18n.changeLanguage(lang)
    set({ lang })
  },
}))
