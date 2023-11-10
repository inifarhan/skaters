import { redirect } from 'next/navigation'

import { Heading } from '@/components/Heading'
import { StoreTabs } from '@/components/pagers/StoreTabs'
import { getAuthSession } from '@/lib/auth'

export default async function DashboardLayout({
  children,
  params: { storeId },
}: {
  children: React.ReactNode
  params: { storeId: string }
}) {
  const session = await getAuthSession()

  const store = await prisma.store.findFirst({
    where: {
      id: storeId,
      userId: session?.user.id,
    },
  })

  if (!store) {
    return redirect('/dashboard/stores')
  }
  return (
    <>
      <Heading
        className='mb-8'
        title='Dashboard'
        description='Manage your store'
      />
      <section className='space-y-8 overflow-auto'>
        <StoreTabs storeId={storeId} />
        {children}
      </section>
    </>
  )
}
