import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'

import GithubStars from '@/components/GithubStars'
import { GithubStarsSkeleton } from '@/components/skeletons/GithubStarsSkeleton'
import { buttonVariants } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const Hero = async () => {
  return (
    <div className='relative'>
      <svg
        className='absolute -z-10'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 1440 320'
      >
        <path
          fill='#10b981'
          fill-opacity='1'
          d='M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,122.7C672,96,768,96,864,122.7C960,149,1056,203,1152,213.3C1248,224,1344,192,1392,176L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z'
        ></path>
      </svg>
      <div className='max-w-7xl mx-auto grid grid-cols-1 gap-6 lg:gap-0 md:grid-cols-2 items-center justify-between px-4 sm:px-6 lg:px-8 pt-10 sm:pt-20 pb-20 sm:pb-28'>
        <div className='flex flex-col gap-y-4 justify-center items-center text-center sm:items-start sm:text-start'>
          <Suspense fallback={<GithubStarsSkeleton />}>
            <GithubStars />
          </Suspense>
          <h1 className='font-bold tracking-tighter text-3xl sm:text-5xl lg:text-6xl max-w-sm sm:max-w-4xl'>
            An open source e-commerce project built by{' '}
            <span className='text-emerald-600'>inifarhan</span>
          </h1>
          <h2 className='max-w-md sm:max-w-[42rem] leading-normal text-muted-foreground text-sm sm:text-xl sm:leading-8'>
            Buy and sell skateboarding gears from independent brands and stores
            around the world with ease
          </h2>
          <div className='flex flex-wrap items-center gap-4'>
            <a href='/products' className={cn(buttonVariants())}>
              Buy now
              <span className='sr-only'>Buy now</span>
            </a>
            <Link
              href='/dashboard/stores'
              className={cn(
                buttonVariants({
                  variant: 'outline',
                }),
              )}
            >
              Sell now
              <span className='sr-only'>Sell now</span>
            </Link>
          </div>
        </div>
        <div className='flex items-center justify-center md:justify-end'>
          <Image
            src='/images/hero.webp'
            className='rounded-full'
            alt='Hero image'
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  )
}

export default Hero
