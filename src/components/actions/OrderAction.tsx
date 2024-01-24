'use client'

import type { Order } from '@prisma/client'
import axios, { AxiosError } from 'axios'
import { CreditCard, MoreVertical, ScanEye, XCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
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
  order: Order
}

export const OrderAction: React.FC<OrderActionProps> = ({ order }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)

  const router = useRouter()

  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/orders/${order.id}/cancel`)
      router.push('/dashboard/orders?status=CANCELED')
      toast.success('Order canceled.')
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError) {
        return toast.error(error.response?.data)
      }
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  const onPay = () => {
    if (order.token) {
      // @ts-expect-error
      window.snap.pay(order.token, {
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

  const onDetail = () => {
    router.push(`/invoice/${order.id}`)
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
          {order.status === 'PENDING' ? (
            <>
              <DropdownMenuItem onClick={onPay}>
                <CreditCard className='mr-2 h-4 w-4' />
                Pay
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onDetail}>
                <ScanEye className='mr-2 h-4 w-4' />
                Detail
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpen(true)}>
                <XCircle className='mr-2 h-4 w-4' />
                Cancel
              </DropdownMenuItem>
            </>
          ) : order.status === 'PAID' ? (
            <DropdownMenuItem onClick={onDetail}>
              <ScanEye className='mr-2 h-4 w-4' />
              Detail
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={onDetail}>
              <ScanEye className='mr-2 h-4 w-4' />
              Detail
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
