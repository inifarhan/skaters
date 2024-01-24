import crypto from 'crypto'

import prisma from '@/lib/db'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const hash = crypto
      .createHash('sha512')
      .update(
        `${body.order_id}${body.status_code}${body.gross_amount}${process.env.MIDTRANS_SERVER_KEY}`,
      )
      .digest('hex')

    if (body.signature_key !== hash) {
      return new Response('Invalid signature key', {
        status: 403,
      })
    }

    let orderId = body.order_id
    let transactionStatus = body.transaction_status
    let fraudStatus = body.fraud_status

    console.log(
      `Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`,
    )

    // Sample transactionStatus handling logic

    if (transactionStatus == 'capture') {
      if (fraudStatus == 'accept') {
        // TODO set transaction status on your database to 'success'
        // and response with 200 OK
        await prisma.order.update({
          where: {
            id: body.order_id,
          },
          data: {
            status: 'PAID',
          },
        })

        return new Response('OK')
      }
    } else if (transactionStatus == 'settlement') {
      // TODO set transaction status on your database to 'success'
      // and response with 200 OK
      await prisma.order.update({
        where: {
          id: body.order_id,
        },
        data: {
          status: 'PAID',
        },
      })

      return new Response('OK')
    } else if (
      transactionStatus == 'cancel' ||
      transactionStatus == 'deny' ||
      transactionStatus == 'expire'
    ) {
      // TODO set transaction status on your database to 'failure'
      // and response with 200 OK

      await prisma.order.update({
        where: {
          id: body.order_id,
        },
        data: {
          status: 'CANCELED',
        },
      })

      return new Response('OK')
    } else if (transactionStatus == 'pending') {
      // TODO set transaction status on your database to 'pending' / waiting payment
      // and response with 200 OK

      await prisma.order.update({
        where: {
          id: body.order_id,
        },
        data: {
          status: 'PENDING',
        },
      })

      return new Response('OK')
    }
  } catch (error) {
    console.log(error)
    return new Response(
      'Could not handle notification, please try again later.',
      {
        status: 500,
      },
    )
  }
}
