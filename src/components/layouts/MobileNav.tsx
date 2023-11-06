import { Menu } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Icons } from '../Icons';
import { Button } from '../ui/Button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/Sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/Accordion';

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className='flex lg:hidden'>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant='ghost' size='icon'>
            <Menu />
            <span className='sr-only'>Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side='left'>
          <div className='px-2 flex flex-col gap-4'>
            <Link href='/' className='flex items-center' onClick={() => setIsOpen(false)}>
              <Icons.logo className='mr-2 h-4 w-4' aria-hidden='true' />
              <span className='font-bold'>Skaters</span>
              <span className='sr-only'>Home</span>
            </Link>
            <div className='text-sm'>
              <Accordion type='multiple' defaultValue={['item-1', 'item-2', 'item-3']} className='w-full'>
                <AccordionItem value='item-1'>
                  <AccordionTrigger>My Dashboard</AccordionTrigger>
                  <AccordionContent>
                    <div className='flex flex-col gap-y-2 text-muted-foreground'>
                      <Link onClick={() => setIsOpen(false)} href='/dashboard/stores'>
                        Stores
                      </Link>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value='item-2'>
                  <AccordionTrigger>Lobby</AccordionTrigger>
                  <AccordionContent>
                    <div className='flex flex-col gap-y-2 text-muted-foreground'>
                      <Link onClick={() => setIsOpen(false)} href='/products'>
                        Products
                      </Link>
                      <Link onClick={() => setIsOpen(false)} href='/categories'>
                        Categories
                      </Link>
                      <Link onClick={() => setIsOpen(false)} href='/dashboard'>
                        Create store
                      </Link>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value='item-3'>
                  <AccordionTrigger>Categories</AccordionTrigger>
                  <AccordionContent>
                    <div className='flex flex-col gap-y-2 text-muted-foreground'>
                      <Link onClick={() => setIsOpen(false)} href='/products?category=skateboards'>
                        Skateboards
                      </Link>
                      <Link onClick={() => setIsOpen(false)} href='/products?category=clothing'>
                        Clothing
                      </Link>
                      <Link onClick={() => setIsOpen(false)} href='/products?category=shoes'>
                        Shoes
                      </Link>
                      <Link onClick={() => setIsOpen(false)} href='/products?category=accessories'>
                        Accessories
                      </Link>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
