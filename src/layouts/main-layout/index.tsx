import { Outlet } from 'react-router-dom'
import { Header } from './header'
import { Footer } from './footer'

export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-50">
      <Header />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
