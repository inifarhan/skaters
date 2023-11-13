import { ArrowRightIcon } from 'lucide-react'
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
      className='space-y-8 px-4 xl:px-0 py-8 md:pt-10 lg:pt-24'
    >
      <div className='mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center'>
        <h2 className='text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl'>
          Products
        </h2>
        <h3 className='max-w-[46rem] leading-normal text-muted-foreground sm:text-lg sm:leading-7'>
          Explore products from around the world
        </h3>
      </div>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Link
        href='/products'
        className={cn(
          buttonVariants({
            className: 'mx-auto flex w-fit',
          }),
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
