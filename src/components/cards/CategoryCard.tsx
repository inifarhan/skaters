import { Category } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card'
import prisma from '@/lib/db'

interface CategoryCardProps {
  category: Category
}

const CategoryCard: React.FC<CategoryCardProps> = async ({ category }) => {
  const products = await prisma.product.count({
    where: {
      categoryId: category.slug,
    },
  })

  return (
    <Link href={`/products?category=${category.slug}`}>
      <Card className='relative h-full w-full overflow-hidden rounded-lg bg-transparent transition-colors group hover:bg-emerald-600'>
        <CardHeader>
          <Image
            src={`/svg/${category.slug}.svg`}
            alt='test'
            width={32}
            height={32}
          />
        </CardHeader>
        <CardContent className='space-y-1.5'>
          <CardTitle className='capitalize text-zinc-200'>
            {category.name}
          </CardTitle>
          <CardDescription className='group-hover:text-white'>
            {products} Products
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  )
}

export default CategoryCard
