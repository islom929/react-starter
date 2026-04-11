import { useRoutes, type RouteObject } from 'react-router-dom'
import { MainLayout } from '@/layouts/main-layout'
import { HomePage } from '@/pages/home'
import { ProductsPage } from '@/pages/products'
import { ROUTES } from '@/shared/constants/routes'

const routes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      { path: ROUTES.HOME, element: <HomePage /> },
      { path: ROUTES.PRODUCTS, element: <ProductsPage /> },
    ],
  },
]

export function AppRouter() {
  return useRoutes(routes)
}
