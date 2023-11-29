import { Heading } from '@/components/Heading'
import { StoreCardSkeleton } from '@/components/skeletons/StoreCardSkeleton'
import { Separator } from '@/components/ui/Separator'

export default function StoresLoading() {
  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading title='Stores' description='Manage your stores' />
      </div>
      <Separator className='my-4' />
      <section className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {Array.from({ length: 3 }).map((_, i) => (
          <StoreCardSkeleton key={i} />
        ))}
      </section>
    </>
  )
}
