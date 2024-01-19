import { Category } from '@prisma/client'

export const INFINITE_SCROLL_LIMIT = 8

export const ORDER_INFINITE_SCROLL_LIMIT = 3

export const categories: Category[] = [
  {
    name: 'Skateboards',
    slug: 'skateboards',
  },
  {
    name: 'Clothing',
    slug: 'clothing',
  },
  {
    name: 'Shoes',
    slug: 'shoes',
  },
  {
    name: 'Accessories',
    slug: 'accessories',
  },
]
