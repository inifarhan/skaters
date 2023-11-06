import Link from 'next/link'

import { Heading } from '@/components/Heading'
import { StoreCard } from '@/components/cards/StoreCard'
import { buttonVariants } from '@/components/ui/Button'
import { Separator } from '@/components/ui/Separator'
import { getAuthSession } from '@/lib/auth'
import prisma from '@/lib/db'

const DashboardStoresPage = async () => {
  const session = await getAuthSession()

  const store = await prisma.store.findFirst({
    where: {
      userId: session?.user.id,
    },
  })

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading title='Stores' description='Manage your stores' />
        <Link className={buttonVariants()} href='/dashboard/stores/new'>
          Create store
        </Link>
      </div>
      <Separator className='my-4' />
      <section className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {store ? <StoreCard store={store!} /> : null}
      </section>
    </>
  )
}

export default DashboardStoresPage
