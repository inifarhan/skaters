import { getAuthSession } from '@/lib/auth'
import prisma from '@/lib/db'

export async function DELETE(
  req: Request,
  { params }: { params: { orderId: string } },
) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const order = await prisma.order.findUnique({
      where: {
        id: params.orderId,
      },
    })

    if (!order) {
      return new Response('Order not found', { status: 404 })
    }

    if (order.userId !== session.user.id) {
      return new Response('Forbidden', { status: 403 })
    }

    await prisma.order.update({
      where: {
        id: params.orderId,
      },
      data: {
        status: 'CANCELED',
      },
    })

    const url = `https://api.sandbox.midtrans.com/v2/${order.id}/cancel`
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        authorization:
          'Basic U0ItTWlkLXNlcnZlci1sRElUNmpNVDhYSl82c29KeGlNQnhCeXc6',
      },
    }

    await fetch(url, options)

    return new Response('OK')
  } catch (error) {
    console.log(error)
  }
}
