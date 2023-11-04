'use client';

import { Search, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { Button, buttonVariants } from '../ui/Button';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

const Navbar = () => {
  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background p-3 lg:px-4'>
      <nav className='max-w-7xl mx-auto flex items-center justify-between'>
        {/* Left */}
        <MobileNav />
        <DesktopNav />

        {/* Right */}
        <div className='flex items-center gap-x-2'>
          <Button variant='outline' className='relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2'>
            <Search className='h-4 w-4 xl:mr-2' aria-hidden='true' />
            <span className='hidden xl:inline-flex'>Search products...</span>
            <span className='sr-only'>Search products</span>
            <kbd className='pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium opacity-100 xl:flex'>
              <abbr title='Control' className='no-underline'>
                Ctrl
              </abbr>
              K
            </kbd>
          </Button>
          {/* Cart */}
          <Button size='sm' className='gap-x-1' variant='outline'>
            <ShoppingCart className='w-4 h-4' />0
          </Button>
          <Link
            href='/signin'
            className={buttonVariants({
              size: 'sm',
            })}>
            Sign In
            <span className='sr-only'>Sign In</span>
          </Link>
        </div>
      </nav>
    </header>
  );
};



export default Navbar;
