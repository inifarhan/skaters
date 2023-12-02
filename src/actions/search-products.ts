'use server'

import { categories } from '@/config'
import prisma from '@/lib/db'
import { SearchProducts } from '@/types/search-products'

const searchProducts = async (query: string): Promise<SearchProducts[]> => {
  const filteredProducts = await prisma.product.findMany({
    where: {
      name: {
        contains: query,
      },
    },
    select: {
      id: true,
      storeId: true,
      name: true,
      slug: true,
      categoryId: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 10,
  })

  const productsByCategory = categories.map((category) => ({
    category: category.name,
    products: filteredProducts.filter(
      (product) => product.categoryId === category.slug,
    ),
  }))

  return productsByCategory
}

export default searchProducts
