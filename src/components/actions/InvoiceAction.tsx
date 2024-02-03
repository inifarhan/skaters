'use client'

import { Download } from 'lucide-react'

import { Button } from '@/components/ui/Button'

export const InvoiceAction = () => {
  return (
    <div className='flex justify-end mb-4'>
      <Button
        title='Download'
        variant='secondary'
        size='icon'
        onClick={() => window.print()}
      >
        <Download />
      </Button>
    </div>
  )
}