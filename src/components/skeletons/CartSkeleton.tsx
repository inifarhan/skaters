import { Skeleton } from '@/components/ui/Skeleton'

const CartSkeleton = () => {
  return (
    <div className='px-4 sm:px-6 lg:px-8 py-16'>
      <h1 className='text-3xl font-bold text-black'>Shopping Cart</h1>
      <div className='mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12'>
        <ul className='lg:col-span-7'>
          {Array.from({ length: 2 }).map((_, i) => (
            <li key={i} className='w-full flex gap-4 py-6 border-b'>
              <div>
                <Skeleton className='h-24 w-24 sm:h-48 sm:w-48' />
              </div>
              <div className='flex gap-y-2 flex-col'>
                <Skeleton className='w-[150px] h-[20px]' />
                <Skeleton className='w-[100px] h-[20px]' />
              </div>
            </li>
          ))}
        </ul>
        <Skeleton className='w-full lg:col-span-5 h-[212px] rounded-lg mt-16 lg:mt-0' />
      </div>
    </div>
  )
}

export default CartSkeleton
