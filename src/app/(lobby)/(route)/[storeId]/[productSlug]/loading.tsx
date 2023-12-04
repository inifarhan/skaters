import { Separator } from "@/components/ui/Separator"
import { Skeleton } from "@/components/ui/Skeleton"

export default function ProductViewLoading() {
  return (
    <main className='p-4 sm:p-6 lg:px-8'>
      <div className='grid grid-cols-1 gap-y-6 lg:grid-cols-2 lg:items-start lg:gap-x-8'>
        <div>
          <Skeleton className='aspect-square w-full' />
          <div className='mt-6 w-full'>
            <div className='grid grid-cols-4 gap-6'>
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className='aspect-square w-full' />
              ))}
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-y-5'>
          <Skeleton className='w-full h-[50px]' />
          <Skeleton className='w-[200px] h-[32px]' />
          <Skeleton className='w-[150px] h-[20px]' />
          <Separator />
          <Skeleton className='w-[100px] h-[20px]' />
          <Skeleton className='w-full h-[100px]' />
          <Skeleton className='w-[150px] h-[40px] rounded-full' />
        </div>
      </div>
    </main>
  )
}
