import { Skeleton } from '@/components/ui/Skeleton'

const OrderItemSkeleton = () => {
  return (
    <li className='flex py-3 border-b'>
      <div className='relative h-20 w-20 rounded-md overflow-hidden sm:h-40 sm:w-40'>
        <Skeleton className='w-full h-full' />
      </div>
      <div className='flex-1 ml-4 sm:ml-6 space-y-2 sm:space-y-0 sm:flex items-start justify-between'>
        <div className='space-y-2'>
          <Skeleton className='w-full sm:w-[200px] h-5' />
          <Skeleton className='w-full sm:w-[120px] h-5' />
        </div>
        <div>
          <Skeleton className='w-full sm:w-[100px] h-5' />
        </div>
      </div>
    </li>
  )
}

export default OrderItemSkeleton
