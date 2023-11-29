'use client'

import { useEffect, useState } from 'react'

import useCart from '@/hooks/useCart'

import CartItem from '@/components/cart/CartItem'
import Summary from '@/components/cart/Summary'
import CartSkeleton from '@/components/skeletons/CartSkeleton'

const CartPage = () => {
  const [isMounted, setIsMounted] = useState(false)

  const cart = useCart()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <CartSkeleton />
  }

  return (
    <div className='px-4 sm:px-6 lg:px-8 py-16'>
      <h1 className='text-3xl font-bold text-black'>Shopping Cart</h1>
      <div className='mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12'>
        <div className='lg:col-span-7'>
          {cart.items.length === 0 && (
            <p className='text-neutral-500'>No items added to cart</p>
          )}
          <ul>
            {cart.items.map((item) => (
              <CartItem key={item.id} data={item} />
            ))}
          </ul>
        </div>
        <Summary />
      </div>
    </div>
  )
}

export default CartPage
