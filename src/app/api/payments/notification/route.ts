import prisma from '@/lib/db'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    await prisma.order.update({
      where: {
        id: body.order_id,
      },
      data: {
        midtransResponse: body,
        transactionStatus: body.transaction_status,
      },
    })

    return new Response('OK')
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
