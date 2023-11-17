import Link from 'next/link';
import { Badge } from './ui/Badge';
import { Icons } from './Icons';
import { buttonVariants } from './ui/Button';
import { cn } from '@/lib/utils';

const Hero = async () => {
  async function getGithubStars(): Promise<number | null> {
    try {
      const response = await fetch(
        'https://api.github.com/repos/inifarhan/skaters',
        {
          headers: {
            Accept: 'application/vnd.github+json',
          },
          next: {
            revalidate: 60,
          },
        },
      );

      if (!response.ok) {
        return null;
      }

      const data = (await response.json()) as { stargazers_count: number };

      return data.stargazers_count;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  const githubStars = await getGithubStars();

  return (
    <div className='flex flex-col gap-y-4 items-center justify-center text-center max-w-5xl px-4 mx-auto pb-20 sm:pb-28'>
      {githubStars ? (
        <Link
          href='https://www.github.com/inifarhan/skaters'
          target='_blank'
          rel='noreferrer'>
          <Badge
            aria-hidden='true'
            className='rounded-md px-3.5 py-1.5'
            variant='secondary'>
            <Icons.gitHub className='mr-2 h-3.5 w-3.5' aria-hidden='true' />
            {githubStars} stars on GitHub
          </Badge>
          <span className='sr-only'>GitHub</span>
        </Link>
      ) : null}
      <h1 className='font-bold tracking-tighter text-3xl sm:text-5xl lg:text-6xl max-w-sm sm:max-w-4xl'>
        An open source e-commerce project built by inifarhan
      </h1>
      <h2 className='max-w-md sm:max-w-[42rem] leading-normal text-muted-foreground text-sm sm:text-xl sm:leading-8'>
        Buy and sell skateboarding gears from independent brands and stores
        around the world with ease
      </h2>
      <div className='flex flex-wrap items-center justify-center gap-4'>
        <Link href='/products' className={cn(buttonVariants())}>
          Buy now
          <span className='sr-only'>Buy now</span>
        </Link>
        <Link
          href='/dashboard/stores'
          className={cn(
            buttonVariants({
              variant: 'outline',
            }),
          )}>
          Sell now
          <span className='sr-only'>Sell now</span>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
