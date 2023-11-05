'use client'

import * as React from 'react'
import { Button } from '@/components/ui/Button'
import { Icons } from '@/components/Icons'

const OAuthSignIn = async () => {
  return (
    <Button
      aria-label='Sign in with google'
      variant='outline'
      className='w-full bg-background sm:w-auto'
    >
      <Icons.google className='mr-2 h-4 w-4' aria-hidden='true' />
      Google
    </Button>
  )
}

export default OAuthSignIn
