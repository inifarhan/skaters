import { ArrowRight, ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'

import ProductCard from '@/components/cards/ProductCard'
import { buttonVariants } from '@/components/ui/Button'
import prisma from '@/lib/db'
import { cn } from '@/lib/utils'

const Products = async () => {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      Category: true,
    },
    take: 8,
  })

  return (
    <section
      id='products'
      aria-labelledby='product-heading'
      className='space-y-8 px-4 sm:px-6 lg:px-8 py-8 md:pt-10 lg:pt-24'
    >
      <div className='flex items-end justify-between'>
        <div className='flex flex-col space-y-4'>
          <h2 className='text-3xl md:text-5xl text-start text-emerald-600 font-bold leading-[1.1]'>
            Popular Products
          </h2>
          <h3 className='leading-normal text-muted-foreground sm:text-lg sm:leading-7'>
            Explore all products we offer from around the world
          </h3>
        </div>
        <a
          href='/products'
          className='hidden md:flex gap-1 text-emerald-700 hover:translate-x-1 hover:text-emerald-600 transition-all'
        >
          Shop the collection <ArrowRight />
        </a>
      </div>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Link
        href='/products'
        className={cn(
          buttonVariants(),
          'mx-auto flex w-fit hover:before:-translate-x-48',
        )}
      >
        View all products
        <ArrowRightIcon className='ml-2 h-4 w-4' aria-hidden='true' />
        <span className='sr-only'>View all products</span>
      </Link>
    </section>
  )
}

export default Products
