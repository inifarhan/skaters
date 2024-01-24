'use client'

import type { OrderItem, Product, Store } from '@prisma/client'
import { useEffect, useState } from 'react'

import { formatPrice } from '@/lib/utils'

interface OrderItems extends OrderItem {
  store: Store
  product: Product
}

interface InvoiceTableProps {
  orderItems: OrderItems[]
}

const InvoiceTable: React.FC<InvoiceTableProps> = ({ orderItems }) => {
  const [isMounted, setIsMounted] = useState<boolean>(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <table className='text-left w-full'>
      <tr>
        <th className='py-2'>Product name</th>
        <th>Store Name</th>
        <th>Quantity</th>
        <th>Price</th>
      </tr>
      {orderItems.map((item) => (
        <tr key={item.id} className='border-t border-b'>
          <td className='py-2'>{item.product.name}</td>
          <td>{item.store.name}</td>
          <td>1</td>
          {/* @ts-expect-error Decimal type */}
          <td>{formatPrice  (parseFloat(item.product.price))} x 1</td>
        </tr>
      ))}
    </table>
  )
}
export default InvoiceTable
