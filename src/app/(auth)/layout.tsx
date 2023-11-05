import { Icons } from '@/components/Icons'
import { AspectRatio } from '@/components/ui/AspectRatio'
import Image from 'next/image'
import Link from 'next/link'

export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <div className='grid min-h-screen grid-cols-1 overflow-hidden md:grid-cols-3 lg:grid-cols-2'>
      <AspectRatio ratio={16 / 9}>
        <Image
          src='/images/auth-layout.webp'
          alt='A skateboarder doing a high drop'
          fill
          className='absolute inset-0 object-cover'
          priority
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-background to-background/60 md:to-background/40' />
        <Link
          href='/'
          className='absolute left-4 top-4 sm:left-8 sm:top-6 z-20 flex items-center text-lg font-bold tracking-tight'>
          <Icons.logo className='mr-2 h-6 w-6' aria-hidden='true' />
          <span>Skaters</span>
        </Link>
        <div className='absolute bottom-6 left-8 z-20 line-clamp-1 text-base'>
          Photo by{' '}
          <a
            href='https://unsplash.com/ja/@pixelperfektion?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'
            className='hover:underline'>
            pixelperfektion
          </a>
          {' on '}
          <a
            href='https://unsplash.com/photos/OS2WODdxy1A?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'
            className='hover:underline'>
            Unsplash
          </a>
        </div>
      </AspectRatio>
      <main className='container absolute top-1/2 col-span-1 flex -translate-y-1/2 items-center md:static md:top-0 md:col-span-2 md:flex md:translate-y-0 lg:col-span-1'>
        {children}
      </main>
    </div>
  )
}
