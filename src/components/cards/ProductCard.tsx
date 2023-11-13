'use client'

import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Product, Category } from '@prisma/client'

import IconButton from '@/components/ui/IconButton'
import { formatPrice } from '@/lib/utils'

interface ProductCardProps {
  product: Product & {
    Category: Category
  }
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link
      href={`/${product.storeId}/${product.slug}?productId=${product.id}`}
      className='shadow-lg group hover:-translate-y-1 hover:shadow-2xl duration-300 transition-all rounded-xl space-y-4'
    >
      {/* Images and Actions */}
      <div className='aspect-square rounded-xl bg-gray-100 relative'>
        <Image
          // @ts-ignore
          src={product.images?.[0].url}
          fill
          // @ts-ignore
          alt={product.name}
          className='aspect-square object-cover rounded-md'
        />
        <div className='hidden group-hover:block transition absolute w-full px-6 bottom-5'>
          <div className='flex justify-center'>
            <IconButton
              onClick={(e) => {
                e.preventDefault()
                console.log('dipencet')
              }}
              icon={<ShoppingCart size={20} className='text-gray-600' />}
            />
          </div>
        </div>
      </div>
      <div className='px-4 space-y-4 pb-6'>
        {/* Descrription */}
        <div className='space-y-1'>
          <p
            className='font-semibold text-lg line-clamp-2'
            title={product.name}
          >
            {product.name}
          </p>
          <p className='text-sm text-gray-500'>{product.Category?.name}</p>
        </div>
        {/* Price */}
        <div className='flex items-center justify-between'>
          <div className='font-semibold'>
            {/* @ts-expect-error */}
            {formatPrice(parseFloat(product.price))}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
