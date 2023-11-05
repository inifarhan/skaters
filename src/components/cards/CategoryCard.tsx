import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/Card';
import { Icons } from '../Icons';

const CategoryCard = ({ category }: { category: string }) => {
  return (
    <Link key={category} href={`/categories/${category}`}>
      <span className='sr-only'>{category}</span>
      <Card className='relative h-full w-full overflow-hidden rounded-lg bg-transparent transition-colors hover:bg-muted/50'>
        <CardHeader>
          <Icons.logo className='h-8 w-8' />
        </CardHeader>
        <CardContent className='space-y-1.5'>
          <CardTitle className='capitalize text-zinc-200'>{category}</CardTitle>
          <CardDescription>10 products</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CategoryCard;
