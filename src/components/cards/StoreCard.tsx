import { Store } from '@prisma/client'
import Link from 'next/link'

import { AspectRatio } from '@/components/ui/AspectRatio'
import { buttonVariants } from '@/components/ui/Button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card'
import { getRandomPatternStyle } from '@/lib/generate-pattern'
import { cn } from '@/lib/utils'

interface StoreCardProps {
  store: Store
}

export function StoreCard({ store }: StoreCardProps) {
  return (
    <Link href={`/dashboard/stores/${store.id}`}>
      <Card className='h-full overflow-hidden'>
        <AspectRatio ratio={21 / 9}>
          <div className='absolute inset-0 bg-gradient-to-t from-transparent to-zinc-950/50' />
          <div
            className='h-full rounded-t-md border-b'
            style={getRandomPatternStyle(String(store.id))}
          />
        </AspectRatio>
        <CardHeader>
          <CardTitle className='line-clamp-1 text-lg'>{store.name}</CardTitle>
          <CardDescription className='line-clamp-2'>
            {store.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p
            className={cn(
              buttonVariants({
                className: 'w-full rounded-lg',
              }),
            )}
          >
            Add Product
          </p>
        </CardContent>
      </Card>
      <span className='sr-only'>{store.name}</span>
    </Link>
  )
}
