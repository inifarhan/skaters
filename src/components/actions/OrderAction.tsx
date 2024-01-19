'use client'

import { CreditCard, MoreVertical, ScanEye, XCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

import { AlertModal } from '@/components/modals/AlertModal'
import { Button } from '@/components/ui/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu'

interface OrderActionProps {
  token: string
  status: 'PENDING' | 'PAID' | 'CANCELED'
}

export const OrderAction: React.FC<OrderActionProps> = ({ token, status }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)

  const onDelete = async () => {
    try {
      setLoading(true)
      toast.success('Product deleted.')
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  const onPay = () => {
    if (token) {
      // @ts-expect-error
      window.snap.pay(token, {
        onSuccess: () => {
          toast.success('Payment success!')
        },
        onPending: () => {
          toast('Waiting your payment..')
        },
        onError: () => {
          toast.error('Payment failed, something went wrong')
        },
        onClose: () => {
          toast.error('You have not completed the payment.')
        },
      })
    }
  }

  useEffect(() => {
    const midtransUrl = 'https://app.sandbox.midtrans.com/snap/snap.js'

    let scriptTag = document.createElement('script')
    scriptTag.src = midtransUrl
    scriptTag.setAttribute('data-client-key', process.env.MIDTRANS_CLIENT_KEY!)

    document.body.appendChild(scriptTag)

    return () => {
      document.body.removeChild(scriptTag)
    }
  }, [])

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Actions</span>
            <MoreVertical className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          {status === 'PENDING' ? (
            <>
              <DropdownMenuItem onClick={onPay}>
                <CreditCard className='mr-2 h-4 w-4' />
                Pay
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ScanEye className='mr-2 h-4 w-4' />
                Detail
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpen(true)}>
                <XCircle className='mr-2 h-4 w-4' />
                Cancel
              </DropdownMenuItem>
            </>
          ) : status === 'PAID' ? (
            <DropdownMenuItem>
              <ScanEye className='mr-2 h-4 w-4' />
              Detail
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem>
              <ScanEye className='mr-2 h-4 w-4' />
              Detail
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
