import Link from 'next/link'

import { Badge } from '@/components/ui/Badge'
import { Icons } from '@/components/Icons'

const GithubStars = async () => {
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
      )

      if (!response.ok) {
        return null
      }

      const data = (await response.json()) as { stargazers_count: number }

      return data.stargazers_count
    } catch (err) {
      console.error(err)
      return null
    }
  }

  const githubStars = await getGithubStars()

  return githubStars ? (
    <Link
      href='https://www.github.com/inifarhan/skaters'
      target='_blank'
      rel='noreferrer'
    >
      <Badge
        aria-hidden='true'
        className='rounded-md px-3.5 py-1.5'
        variant='secondary'
      >
        <Icons.gitHub className='mr-2 h-3.5 w-3.5' aria-hidden='true' />
        {githubStars} stars on GitHub
      </Badge>
      <span className='sr-only'>GitHub</span>
    </Link>
  ) : null
}

export default GithubStars
