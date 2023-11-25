const midtransClient = require('midtrans-client')
import { z } from 'zod'
import { randomUUID } from 'crypto'

import { getAuthSession } from '@/lib/auth'
import prisma from '@/lib/db'
import { checkoutSchema } from '@/lib/validators/checkout'

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const body = await req.json()

    const { productIds } = checkoutSchema.parse(body)

    if (!productIds || productIds.length === 0) {
      return new Response('Product ids are required.', { status: 400 })
    }

    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    })

    const gross_amount = products.reduce((total, item) => {
      return total + Number(item.price)
    }, 0)

    const uuid = randomUUID()

    let snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
      clientKey: process.env.MIDTRANS_CLIENT_KEY,
    })

    let parameter = {
      transaction_details: {
        order_id: uuid,
        gross_amount,
      },
      credit_card: {
        secure: true,
      },
      item_details: products.map((product) => ({
        id: product.id,
        price: Number(product.price),
        quantity: 1,
        name: product.name,
        category: product.categoryId,
        merchant_id: product.storeId,
      })),
      customer_details: {
        first_name: session.user.name,
        email: session.user.email,
      },
    }

    const transaction = await snap.createTransaction(parameter)

    await prisma.order.create({
      data: {
        id: uuid,
        userId: session?.user.id,
        transactionStatus: 'pending',
        token: transaction.token,
        orderItems: {
          create: productIds.map((productId: string) => ({
            product: {
              connect: {
                id: productId,
              },
            },
          })),
        },
      },
    })

    return Response.json(transaction)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response('Invalid request data passed', { status: 422 })
    }

    console.log(error)

    return new Response('Could not checkout, please try again later.', {
      status: 500,
    })
  }
}
