'use client'

import { Store } from 'lucide-react'
import Link from 'next/link'

export function SidebarNav() {
  return (
    <Link aria-label='Stores' href='/dashboard/stores'>
      <span className='font-medium flex w-full items-center rounded-md border border-transparent px-2 py-1 bg-muted hover:text-foreground'>
        <Store className='mr-2 h-4 w-4' aria-hidden='true' />
        <span>Stores</span>
      </span>
    </Link>
  )
}
