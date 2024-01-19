'use client'

import { Order, OrderItem, Product, Store } from '@prisma/client'
import { ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import getOrderItems from '@/actions/get-order-items'
import { OrderAction } from '@/components/actions/OrderAction'
import { Badge } from '@/components/ui/Badge'
import { Separator } from '@/components/ui/Separator'
import { formatPrice } from '@/lib/utils'
import { GetOrderItems } from '@/types/get-order-items'

interface OrderCardProps {
  order: Order
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const [orderItems, setOrderItems] = useState<GetOrderItems[] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getOrderItems(order.id)
        setOrderItems(response)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [order])

  return (
    <div className='p-3 sm:py-4 sm:px-6 shadow-md border hover:shadow-lg duration-300 transition-all rounded-xl space-y-4 h-full'>
      <div className='flex items-center justify-between'>
        <h3 className='flex items-center'>
          <ShoppingBag className='mr-2 h-4 w-4' aria-hidden='true' />
          <span>Shopping</span>
        </h3>
        <div className='flex items-center justify-center space-x-2'>
          {order.status === 'PENDING' ? (
            <Badge variant='pending' className='capitalize'>
              Pending
            </Badge>
          ) : order.status === 'PAID' ? (
            <Badge variant='success' className='capitalize'>
              Success
            </Badge>
          ) : (
            <Badge variant='destructive' className='capitalize'>
              Canceled
            </Badge>
          )}
          <OrderAction status={order.status} token={order.token} />
        </div>
      </div>
      <Separator className='mt-4' />
      <div>
        <ul>
          {!isLoading ? (
            <>
              {orderItems?.map((item, i) => (
                <li key={i} className='flex py-3 border-b'>
                  <div className='relative h-20 w-20 rounded-md overflow-hidden sm:h-40 sm:w-40'>
                    <Image
                      fill
                      src={item.product.images[0].url}
                      alt='fasfasd'
                      className='object-cover object-center'
                    />
                  </div>
                  <div className='ml-4 flex flex-1 flex-col justify-between sm:ml-6'>
                    <div className='relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0'>
                      <Link
                        href={`/${item.storeId}/${item.product.slug}?productId=${item.productId}`}
                        className='sm:text-lg font-semibold text-black line-clamp-2'
                      >
                        {item.product.name}
                      </Link>

                      <div className='text-orange-500 sm:text-right font-medium'>
                        {formatPrice(parseFloat(item.product.price))}
                      </div>

                      <p className='text-gray-500 text-sm sm:text-base capitalize'>
                        {item.store.name}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </>
          ) : (
            <h1>Loading...</h1>
          )}

          <Separator className='mb-4' />

          <div className='flex items-center justify-between py-3'>
            <p className='font-bold sm:text-xl mr-2'>Total :</p>
            <p className='text-right font-bold'>
              {/* @ts-expect-error Decimal type */}
              {formatPrice(parseFloat(order.totalPrice))}
            </p>
          </div>
        </ul>
      </div>
    </div>
  )
}
export default OrderCard
