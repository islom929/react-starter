import { Routes, Route } from 'react-router-dom'
import { MainLayout } from '@/layouts/main-layout'
import { HomePage } from '@/pages/home'
import { ProductsPage } from '@/pages/products'

export function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
      </Route>
    </Routes>
  )
}
