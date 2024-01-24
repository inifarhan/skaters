'use client'

import { Tabs, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { useRouter, useSearchParams } from 'next/navigation'

import { Separator } from '@/components/ui/Separator'
import { cn } from '@/lib/utils'

export function OrderTabs() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const status = searchParams.get('status')

  const tabs = [
    {
      title: 'All',
      href: `/dashboard/orders`,
      isActive: status === null,
    },
    {
      title: 'Pending',
      href: `/dashboard/orders?status=PENDING`,
      isActive: status === 'PENDING',
    },
    {
      title: 'Paid',
      href: `/dashboard/orders?status=PAID`,
      isActive: status === 'PAID',
    },
    {
      title: 'Canceled',
      href: `/dashboard/orders?status=CANCELED`,
      isActive: status === 'CANCELED',
    },
  ]

  return (
    <Tabs
      defaultValue={tabs.find((tab) => tab.isActive)?.href ?? tabs[0]?.href}
      className='sticky top-0 z-30 w-full overflow-auto bg-background px-1'
      onValueChange={(value) => router.push(value)}
    >
      <TabsList className='inline-flex w-full items-center justify-between space-x-1.5 text-muted-foreground'>
        {tabs.map((tab) => (
          <div
            role='none'
            key={tab.href}
            className={cn(
              'w-full border-b-2 border-transparent py-1.5',
              tab.isActive && 'border-emerald-600',
            )}
          >
            <TabsTrigger
              value={tab.href}
              className={cn(
                'w-full inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium text-muted-foreground ring-offset-background transition-all hover:bg-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
                tab.isActive && 'text-emerald-600',
              )}
            >
              {tab.title}
            </TabsTrigger>
          </div>
        ))}
      </TabsList>
      <Separator />
    </Tabs>
  )
}
