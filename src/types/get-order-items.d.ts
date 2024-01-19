import { OrderItem } from '@prisma/client'

export interface GetOrderItems extends OrderItem {
  product: Product
  store: Store
}
