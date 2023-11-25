'use client'

import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

import { Button } from '@/components/ui/Button'
import useCart from '@/hooks/useCart'
import { formatPrice } from '@/lib/utils'
import { useSession } from 'next-auth/react'

const Summary = () => {
  const [token, setToken] = useState<string>('')

  const session = useSession()
  const router = useRouter()

  const searchParams = useSearchParams()
  const items = useCart((state) => state.items)
  const removeAll = useCart((state) => state.removeAll)

  useEffect(() => {
    if (searchParams.get('success')) {
      toast.success('Payment completed.')
      removeAll()
    }

    if (searchParams.get('canceled')) {
      toast.error('Something went wrong.')
    }
  }, [searchParams, removeAll])

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price)
  }, 0)

  const onCheckout = async () => {
    if (!session.data?.user) {
      return router.push('/sign-in')
    }

    try {
      const productIds = items.map((item) => item.id)
      const { data } = await axios.post('/api/payments/charge', { productIds })

      setToken(data.token)
    } catch (error: any) {
      toast.error(error.response.data)
    }
  }

  useEffect(() => {
    if (token) {
      // @ts-expect-error
      window.snap.pay(token, {
        onSuccess: (result: any) => {
          toast.success('Payment success!')
          console.log(result)
        },
        onPending: (result: any) => {
          toast('Waiting your payment..')
          console.log(result)
        },
        onError: (result: any) => {
          console.log(result)
          toast.error('Payment failed, something went wrong')
        },
        onClose: () => {
          toast.error('You have not completed the payment.')
        },
      })
    }
  }, [token])

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
    <div
      className='
        mt-16
        rounded-lg
        bg-gray-50
        px-4
        py-6
        sm:p-6
        lg:col-span-5
        lg:mt-0
        lg:p-8
      '
    >
      <h2 className='text-lg font-medium text-gray-900'>Order Summary</h2>
      <div className='mt-6 space-y-4'>
        <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
          <div className='text-base font-medium text-gray-900'>Order total</div>
          {formatPrice(totalPrice)}
        </div>
        <Button
          disabled={items.length === 0}
          onClick={onCheckout}
          className='w-full mt-6'
        >
          Checkout
        </Button>
      </div>
    </div>
  )
}

export default Summary
