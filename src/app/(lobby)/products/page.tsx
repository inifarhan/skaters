import { Heading } from '@/components/Heading'
import ProductsList from '@/components/ProductsList'
import { INFINITE_SCROLL_LIMIT } from '@/config'
import prisma from '@/lib/db'

const Products = async () => {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      Category: true,
    },
    take: INFINITE_SCROLL_LIMIT,
  })

  const totalData = await prisma.product.count()

  return (
    <div className='flex flex-col space-y-10 py-10 px-4 xl:px-0'>
      <Heading
        title='Products'
        description='Explore all products from around the world'
      />
      <ProductsList initialProducts={products} totalData={totalData} />
    </div>
  )
}

export default Products
