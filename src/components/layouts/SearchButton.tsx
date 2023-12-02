import { useDebouncedValue } from '@mantine/hooks'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState, useTransition } from 'react'

import searchProducts from '@/actions/search-products'
import { Button } from '@/components/ui/Button'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/Command'
import { Skeleton } from '@/components/ui/Skeleton'
import { cn } from '@/lib/utils'
import { SearchProducts } from '@/types/search-products'

const SearchButton = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [query, setQuery] = useState<string>('')
  const [debounced] = useDebouncedValue(query, 300)
  const [data, setData] = useState<SearchProducts[] | null>(null)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (debounced.length <= 0) {
      setData(null)
      return
    }

    const fetchProducts = async () => {
      const response = await searchProducts(debounced)
      setData(response)
    }

    startTransition(fetchProducts)

    return () => setData(null)
  }, [debounced])

  useEffect(() => {
    if (!open) {
      setQuery('')
    }
  }, [open])

  const handleSelect = useCallback((callback: () => unknown) => {
    setOpen(false)
    callback()
  }, [])

  return (
    <>
      <Button
        onClick={() => setOpen((open) => !open)}
        variant='outline'
        className='relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2'
      >
        <Search className='h-4 w-4 xl:mr-2' aria-hidden='true' />
        <span className='hidden xl:inline-flex'>Search products...</span>
        <span className='sr-only'>Search products</span>
        <kbd className='pointer-events-none absolute right-2 top-2 hidden h-6 select-none items-center gap-1 rounded-full border bg-muted px-1.5 font-mono text-xs font-medium opacity-100 xl:flex'>
          <abbr title='Control' className='no-underline'>
            Ctrl
          </abbr>
          K
        </kbd>
      </Button>
      <CommandDialog position='top' open={open} onOpenChange={setOpen}>
        <CommandInput
          value={query}
          onValueChange={setQuery}
          placeholder='Search products...'
        />
        <CommandList>
          <CommandEmpty
            className={cn(isPending ? 'hidden' : 'py-6 text-center text-sm')}
          >
            No products found.
          </CommandEmpty>
          {isPending ? (
            <div className='space-y-1 overflow-hidden px-1 py-2'>
              <Skeleton className='h-4 w-10 rounded' />
              <Skeleton className='h-8 rounded-sm' />
              <Skeleton className='h-8 rounded-sm' />
            </div>
          ) : (
            data?.map((group) => (
              <CommandGroup
                key={group.category}
                className='capitalize'
                heading={group.category}
              >
                {group.products.map((item, index) => {
                  return (
                    <CommandItem
                      key={index}
                      value={item.name}
                      onSelect={() =>
                        handleSelect(() =>
                          router.push(
                            `/${item.storeId}/${item.slug}?productId=${item.id}`,
                          ),
                        )
                      }
                    >
                      <span className='truncate'>{item.name}</span>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            ))
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}

export default SearchButton
