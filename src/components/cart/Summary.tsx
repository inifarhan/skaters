'use client'

import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
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
  const cart = useCart()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams.get('status_code') == '200') {
      toast.success('Payment completed.')
    } else if (searchParams.get('status_code') == '201') {
      toast('Waiting your payment..')
    } else if (searchParams.get('status_code')) {
      toast.error('Payment failed, something went wrong')
    }
  }, [searchParams])

  const totalPrice = cart.items.reduce((total, item) => {
    return total + Number(item.price)
  }, 0)

  const { mutate: onCheckout, isPending } = useMutation({
    mutationFn: async () => {
      if (!session.data?.user) {
        return router.push('/sign-in')
      }

      const productIds = cart.items.map((item) => item.id)
      const { data } = await axios.post('/api/payments/charge', { productIds })

      return data
    },
    onError(error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data)
      }
    },
    onSuccess(data) {
      setToken(data.token)
      cart.removeAll()
    },
  })

  useEffect(() => {
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
          disabled={cart.items.length === 0 || isPending}
          isLoading={isPending}
          onClick={() => onCheckout()}
          className='w-full mt-6 hover:before:-translate-x-[500px]'
        >
          Checkout
        </Button>
      </div>
    </div>
  )
}

export default Summary
