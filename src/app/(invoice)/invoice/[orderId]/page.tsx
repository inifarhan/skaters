import { redirect } from 'next/navigation'

import InvoiceTable from '@/components/InvoiceTable'
import { getAuthSession } from '@/lib/auth'
import prisma from '@/lib/db'
import { formatDate, formatPrice } from '@/lib/utils'
import { InvoiceAction } from '@/components/actions/InvoiceAction'

export default async function InvoicePage({
  params,
}: {
  params: { orderId: string }
}) {
  const session = await getAuthSession()

  if (!session?.user) {
    redirect('/sign-in')
  }

  const order = await prisma.order.findUnique({
    where: {
      id: params.orderId,
      userId: session.user.id,
    },
  })

  if (!order) {
    return <h1>Not found</h1>
  }

  const orderItems = await prisma.orderItem.findMany({
    where: {
      orderId: order.id,
    },
    include: {
      product: true,
      store: true,
    },
  })

  return (
    <div className='m-4'>
      <InvoiceAction />
      <main className='p-4 border rounded-lg'>
        <h1 className='text-2xl font-semibold mb-4'>Detail payment</h1>
        <h2>
          <span className='font-semibold'>Order ID:</span> {order.id}
        </h2>
        <h2>
          <span className='font-semibold'>Order Date:</span>{' '}
          {formatDate(order.createdAt)}
        </h2>
        <div className='my-8'>
          <h2 className='font-semibold text-xl mb-4 sm:mb-8'>
            Purchased Products
          </h2>
          <div className='mb-6'>
            <InvoiceTable orderItems={orderItems} />
          </div>
          <div className='flex items-center justify-between text-orange-500'>
            <p className='font-bold sm:text-xl mr-2'>Total :</p>
            <p className='text-right font-bold'>
              {/* @ts-expect-error Decimal type */}
              {formatPrice(parseFloat(order.totalPrice))}
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
