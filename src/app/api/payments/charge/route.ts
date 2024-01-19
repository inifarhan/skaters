const midtransClient = require('midtrans-client')
import { z } from 'zod'
import { nanoid } from 'nanoid'

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

    const order_id = `TRX-${nanoid(4)}-${nanoid(8)}`

    let snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
      clientKey: process.env.MIDTRANS_CLIENT_KEY,
    })

    let parameter = {
      transaction_details: {
        order_id,
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
      callbacks: {
        finish: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/orders`,
        error: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/orders`,
        pending: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/orders`,
      },
    }

    const transaction = await snap.createTransaction(parameter)

    await prisma.order.create({
      data: {
        id: order_id,
        userId: session?.user.id,
        totalPrice: gross_amount,
        status: 'PENDING',
        token: transaction.token,
        orderItems: {
          create: products.map((product) => ({
            product: {
              connect: {
                id: product.id,
              },
            },
            store: {
              connect: {
                id: product.storeId,
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
