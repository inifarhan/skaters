import { Category } from '@prisma/client'

import CategoryCard from '@/components/cards/CategoryCard'

const Categories = async () => {
  const categories: Category[] = [
    {
      name: 'Skateboards',
      slug: 'skateboards',
    },
    {
      name: 'Clothing',
      slug: 'clothing',
    },
    {
      name: 'Shoes',
      slug: 'shoes',
    },
    {
      name: 'Accessories',
      slug: 'accessories',
    },
  ]

  return (
    <section
      id='categories'
      aria-labelledby='categories-heading'
      className='space-y-8 px-4 sm:px-6 lg:px-8 py-8 md:pt-10 lg:pt-24 sm:pb-28'
    >
      <div className='mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center'>
        <h2 className='text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl'>
          Categories
        </h2>
        <h3 className='max-w-[46rem] leading-normal text-muted-foreground sm:text-lg sm:leading-7'>
          Find the best skateboarding gears from stores around the world
        </h3>
      </div>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {categories.map((category) => (
          <CategoryCard key={category.slug} category={category} />
        ))}
      </div>
    </section>
  )
}

export default Categories
