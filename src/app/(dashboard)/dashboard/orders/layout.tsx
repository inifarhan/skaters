import { Heading } from '@/components/Heading'
import { OrderTabs } from '@/components/pagers/OrdersTabs'

export default async function OrdersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Heading
        title='Orders'
        description='See Your Transaction History'
        className='mb-8'
      />
      <section className='space-y-8 overflow-auto'>
        <OrderTabs />
        {children}
      </section>
    </>
  )
}
