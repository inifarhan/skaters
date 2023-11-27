'use client'

import { Category, Product } from '@prisma/client'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { MouseEventHandler } from 'react'

import IconButton from '@/components/ui/IconButton'
import { formatPrice } from '@/lib/utils'
import useCart from '@/hooks/useCart'

interface ProductCardProps {
  product: Product & {
    Category: Category
  }
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const cart = useCart()

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()

    cart.addItem(product)
  }

  return (
    <div className='group/card shadow-lg border hover:shadow-2xl duration-300 transition-all rounded-2xl space-y-4 h-full'>
      <Link
        href={`/${product.storeId}/${product.slug}?productId=${product.id}`}
      >
        {/* Images and Actions */}
        <div className='aspect-square m-3 rounded-2xl bg-gray-100 relative'>
          <Image
            // @ts-ignore
            src={product.images?.[0].url}
            fill
            sizes='200'
            // @ts-ignore
            alt={product.name}
            className='aspect-square object-cover rounded-2xl'
          />
        </div>
        <div className='px-4 space-y-3 pb-6'>
          <div className='space-y-1'>
            {/* Product Name */}
            <p className='text-sm text-gray-500'>{product.Category?.name}</p>
            <p
              className='font-semibold group-hover/card:text-emerald-800 text-lg truncate'
              title={product.name}
            >
              {product.name}
            </p>
            <Image alt='Stars' src='/svg/stars.svg' width={100} height={100} />
          </div>
          <div className='flex items-center justify-between'>
            {/* Price */}
            <div className='font-semibold text-emerald-600'>
              {/* @ts-expect-error */}
              {formatPrice(parseFloat(product.price))}
            </div>
            <div className='flex justify-center group/icon'>
              <IconButton
                className='bg-emerald-50 group-hover/icon:bg-emerald-500'
                onClick={onAddToCart}
                icon={
                  <ShoppingCart
                    size={20}
                    className='text-emerald-600 group-hover/icon:text-emerald-50'
                  />
                }
              />
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard
