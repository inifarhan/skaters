import ProductCard from '@/components/cards/ProductCard'
import prisma from '@/lib/db'

const PopularProducts = async () => {
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
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default PopularProducts
