import { ProductCardSkeleton } from '@/components/skeletons/ProductCardSkeleton'
import { Skeleton } from '@/components/ui/Skeleton'

export default function ProductsLoading() {
  return (
    <div className='flex flex-col py-6 sm:py-10 px-4 sm:px-6 lg:px-8'>
      <div className='space-y-2'>
        <Skeleton className='h-10 w-52' />
        <Skeleton className='h-4 w-80' />
      </div>
      <Skeleton className='h-10 w-28 mt-8 sm:mt-10 mb-4 sm:mb-6 rounded-full' />
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}
