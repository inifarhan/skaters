import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Skeleton } from '@/components/ui/Skeleton'

export default function ProductFormLoading() {
  return (
    <Card>
      <CardHeader className='space-y-2'>
        <Skeleton className='h-6 w-1/4' />
        <Skeleton className='h-4 w-2/4' />
      </CardHeader>
      <CardContent>
        <div className='grid w-full max-w-xl gap-5'>
          <div className='space-y-2.5'>
            <Skeleton className='h-4 w-32' />
            <Skeleton className='h-6' />
          </div>
          <div className='space-y-2.5'>
            <Skeleton className='h-4 w-32' />
            <Skeleton className='h-20' />
          </div>
          <div className='flex flex-col gap-2 xl:flex-row'>
            <Skeleton className='h-10 w-full xl:w-32' />
            <Skeleton className='h-10 w-full xl:w-32' />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
