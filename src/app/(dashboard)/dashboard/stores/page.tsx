import { Heading } from '@/components/Heading'
import { Button } from '@/components/ui/Button'
import { Separator } from '@/components/ui/Separator'

const DashboardStoresPage = () => {
  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading title='Stores' description='Manage your stores' />
        <Button>Create store</Button>
      </div>
      <Separator className='my-2' />
    </>
  )
}

export default DashboardStoresPage
