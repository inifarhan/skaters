import { Heading } from '@/components/Heading'
import { StoreTabs } from '@/components/pagers/StoreTabs'

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { storeId: string }
}) {
  const { storeId } = params

  return (
    <>
      <Heading className='mb-8' title='Dashboard' description='Manage your store' />
      <section className='space-y-8 overflow-auto'>
        <StoreTabs storeId={storeId} />
        {children}
      </section>
    </>
  )
}
