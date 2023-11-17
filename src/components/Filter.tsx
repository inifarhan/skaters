'use client'

import { Category } from '@prisma/client'
import { Plus } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/components/ui/Button'
import { Separator } from '@/components/ui/Separator'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/Sheet'
import { cn } from '@/lib/utils'

interface FilterProps extends React.HTMLAttributes<HTMLDivElement> {
  categories: Category[]
}

const Filter: React.FC<FilterProps> = ({ categories, className, ...props }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const selectedCategory = searchParams.get('category')

  const changeCategory = (categorySlug: string) => {
    setIsOpen(false)

    if (categorySlug === selectedCategory) {
      return router.push(pathname)
    }

    router.replace(`${pathname}?category=${categorySlug}`)
  }

  return (
    <div className={cn('flex', className)} {...props}>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button className='flex items-center gap-x-2'>
            Filters
            <Plus />
          </Button>
        </SheetTrigger>
        <SheetContent side='right'>
          <div className='px-2 flex flex-col gap-4'>
            <h3 className='text-lg font-semibold'>Categories</h3>
            <Separator />
            <div className='flex flex-wrap gap-2'>
              {categories.map((category) => (
                <div
                  key={category.slug}
                  onClick={() => changeCategory(category.slug)}
                  className='flex items-center'
                >
                  <Button
                    variant={
                      selectedCategory === category.slug ? 'default' : 'outline'
                    }
                  >
                    {category.name}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default Filter
