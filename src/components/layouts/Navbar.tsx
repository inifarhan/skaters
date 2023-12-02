'use client'

import type { User } from 'next-auth'
import Link from 'next/link'

import SearchButton from '@/components/layouts/SearchButton'
import UserAccountNav from '@/components/auth/UserAccountNav'
import CartButton from '@/components/cart/CartButton'
import DesktopNav from '@/components/layouts/DesktopNav'
import MobileNav from '@/components/layouts/MobileNav'
import { buttonVariants } from '@/components/ui/Button'

interface NavbarProps {
  user?: User & {
    id: string
  }
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background py-3'>
      <nav className='container px-2 sm:px-4 lg:px-6 flex items-center justify-between'>
        {/* Left */}
        <MobileNav />
        <DesktopNav />

        {/* Right */}
        <div className='flex items-center gap-x-2'>
          <SearchButton />
          <CartButton />
          {user ? (
            <UserAccountNav user={user} />
          ) : (
            <Link
              href='/sign-in'
              className={buttonVariants({
                size: 'sm',
              })}
            >
              Sign In
              <span className='sr-only'>Sign In</span>
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
