import Info from '@/components/Info'
import Gallery from '@/components/gallery/Gallery'
import prisma from '@/lib/db'

const ProductDetails = async ({
  searchParams,
}: {
  searchParams: { productId: string }
}) => {
  const product = await prisma.product.findUnique({
    where: {
      id: searchParams.productId,
    },
    include: {
      Store: true,
    },
  })

  return (
    <div className='px-4 py-10 sm:px-6 lg:px-8'>
      <div className='lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8'>
        {/* @ts-expect-error */}
        <Gallery images={product?.images} />
        <div className='mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0'>
          <Info product={product!} />
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
