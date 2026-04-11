import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLanguageStore } from '@/shared/store/language'
import { ROUTES } from '@/shared/constants/routes'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const languages = [
  { value: 'uz', label: "O'zbekcha" },
  { value: 'ru', label: 'Русский' },
  { value: 'uz_cyr', label: 'Ўзбекча' },
] as const

export function Header() {
  const { t } = useTranslation()
  const { lang, setLang } = useLanguageStore()

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <nav className="flex items-center gap-6">
          <Link to={ROUTES.HOME} className="text-lg font-semibold">
            React Starter
          </Link>
          <Link
            to={ROUTES.HOME}
            className="text-sm text-neutral-600 hover:text-neutral-900"
          >
            {t('nav.home')}
          </Link>
          <Link
            to={ROUTES.PRODUCTS}
            className="text-sm text-neutral-600 hover:text-neutral-900"
          >
            {t('nav.products')}
          </Link>
        </nav>

        <Select value={lang} onValueChange={setLang}>
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {languages.map((l) => (
              <SelectItem key={l.value} value={l.value}>
                {l.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </header>
  )
}
