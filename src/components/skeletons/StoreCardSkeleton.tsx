import { AspectRatio } from '@/components/ui/AspectRatio'
import { Card, CardHeader } from '@/components/ui/Card'
import { Skeleton } from '@/components/ui/Skeleton'

export function StoreCardSkeleton() {
  return (
    <Card className='h-full overflow-hidden'>
      <AspectRatio ratio={21 / 9}>
        <div className='absolute inset-0 bg-gradient-to-t from-transparent to-zinc-950/50' />
        <Skeleton className='h-full w-full rounded-b-none' />
      </AspectRatio>
      <CardHeader className='space-y-2'>
        <Skeleton className='h-4 w-1/2' />
        <Skeleton className='h-4 w-1/4' />
      </CardHeader>
    </Card>
  )
}
