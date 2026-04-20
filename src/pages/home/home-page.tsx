import { useTranslation } from 'react-i18next'
import { useLanguageStore } from '@/shared/store/language'

export function HomePage() {
  const { t } = useTranslation()
  const { lang } = useLanguageStore()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('home.title')}</h1>
        <p className="mt-2 text-neutral-600">{t('home.description')}</p>
      </div>

      <div className="rounded-lg border bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold">
          {t('home.structureTitle')}
        </h2>
        <pre className="rounded-md bg-neutral-100 p-4 text-sm">
          {`src/
├── app/           # Entry, providers, router
├── pages/         # Page composition
├── features/      # Business logic modules
├── components/    # Shared UI
├── layouts/       # Layout components
└── shared/        # Infrastructure`}
        </pre>
      </div>

      <div className="rounded-lg border bg-white p-6">
        <h2 className="mb-2 text-lg font-semibold">{t('home.i18nTitle')}</h2>
        <p className="text-sm text-neutral-600">
          {t('home.currentLang')}:{' '}
          <span className="font-mono font-semibold">{lang}</span>
        </p>
        <p className="mt-1 text-sm text-neutral-600">
          {t('home.changeLangHint')}
        </p>
      </div>
    </div>
  )
}
