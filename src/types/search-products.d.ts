export interface SearchProducts {
  category: string
  products: {
    id: string
    name: string
    slug: string
    storeId: string
    categoryId: string
  }[]
}
