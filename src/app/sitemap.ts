import { type MetadataRoute } from 'next'

import { categories } from '@/config'
import prisma from '@/lib/db'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allProducts = await prisma.product.findMany({
    select: {
      id: true,
      storeId: true,
      slug: true,
    },
  })

  const productsRoutes = allProducts.map((product) => ({
    url: `${process.env.NEXT_PUBLIC_APP_URL}/${product.storeId}/${product.slug}?productId=${product.id}`,
    lastModified: new Date().toISOString(),
  }))

  const categoriesRoutes = categories.map((category) => ({
    url: `${process.env.NEXT_PUBLIC_APP_URL}/products?category=${category.slug}`,
    lastModified: new Date().toISOString(),
  }))

  const routes = ['', 'products', 'dashboard/stores'].map((route) => ({
    url: `${process.env.NEXT_PUBLIC_APP_URL}/${route}`,
    lastModified: new Date().toISOString(),
  }))

  return [...routes, ...productsRoutes, ...categoriesRoutes]
}
