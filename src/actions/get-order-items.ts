'use server'

import prisma from '@/lib/db'
import { GetOrderItems } from '@/types/get-order-items'

const getOrderItems = async (
  orderId: string,
): Promise<GetOrderItems[] | null> => {
  const orderItems = await prisma.orderItem.findMany({
    where: {
      orderId,
    },
    include: {
      product: true,
      store: true,
    },
  })

  return orderItems
}

export default getOrderItems
