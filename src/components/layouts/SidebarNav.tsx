'use client'

import { ShoppingBag, Store } from 'lucide-react'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

import { cn } from '@/lib/utils'

export function SidebarNav() {
  const segment = useSelectedLayoutSegment()

  return (
    <nav>
      <ul className='space-y-4'>
        <li>
          <Link aria-label='Orders' href='/dashboard/orders'>
            <span
              className={cn(
                'font-medium flex w-full items-center rounded-md border border-transparent px-2 py-1',
                segment === 'orders'
                  ? 'bg-muted font-medium text-foreground'
                  : 'text-muted-foreground',
              )}
            >
              <ShoppingBag className='mr-2 h-4 w-4' aria-hidden='true' />
              <span>Orders</span>
            </span>
          </Link>
        </li>
        <li>
          <Link aria-label='Stores' href='/dashboard/stores'>
            <span
              className={cn(
                'font-medium flex w-full items-center rounded-md border border-transparent px-2 py-1',
                segment === 'stores'
                  ? 'bg-muted font-medium text-foreground'
                  : 'text-muted-foreground',
              )}
            >
              <Store className='mr-2 h-4 w-4' aria-hidden='true' />
              <span>Stores</span>
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
