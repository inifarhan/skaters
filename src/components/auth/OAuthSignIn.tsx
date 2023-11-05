'use client'

import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/Button'
import { signIn } from 'next-auth/react'
import { useState } from 'react'

const OAuthSignIn = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const loginWithGoogle = async () => {
    setIsLoading(true)
    try {
      await signIn('google')
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={loginWithGoogle}
      aria-label='Sign in with google'
      variant='outline'
      className='w-full bg-background sm:w-auto'
      isLoading={isLoading}
    >
      <Icons.google className='mr-2 h-4 w-4' aria-hidden='true' />
      Google
    </Button>
  )
}

export default OAuthSignIn
