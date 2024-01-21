import { ShoppingBag } from 'lucide-react'

import OrderItemSkeleton from '@/components/skeletons/OrderItemSkeleton'
import { Badge } from '@/components/ui/Badge'
import { Separator } from '@/components/ui/Separator'
import { Skeleton } from '@/components/ui/Skeleton'

const OrderCardSkeleton = () => {
  return (
    <div className='p-3 sm:py-4 sm:px-6 shadow-md border hover:shadow-lg duration-300 transition-all rounded-xl space-y-4 h-full'>
      <div className='flex items-center justify-between'>
        <h3 className='flex items-center'>
          <ShoppingBag className='mr-2 h-4 w-4' aria-hidden='true' />
          <span>Shopping</span>
        </h3>
        <div className='flex items-center justify-center space-x-2'>
          <Badge variant='secondary' className='capitalize'>
            Loading...
          </Badge>
        </div>
      </div>
      <Separator className='mt-4' />
      <div>
        <ul>
          <OrderItemSkeleton />

          <Separator className='mb-4' />

          <div className='flex items-center justify-between py-3'>
            <p className='font-bold sm:text-xl mr-2'>Total :</p>
            <Skeleton className='w-[200px] h-5' />
          </div>
        </ul>
      </div>
    </div>
  )
}
export default OrderCardSkeleton
