import { redirect } from 'next/navigation'

import { UpdateStoreForm } from '@/components/forms/UpdateStoreForm'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card'
import { getAuthSession } from '@/lib/auth'
import prisma from '@/lib/db'

const UpdateStorePage = async ({
  params: { storeId },
}: {
  params: { storeId: string }
}) => {
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
    <Card aria-labelledby='update-store-page-form-heading'>
      <CardHeader className='space-y-1'>
        <CardTitle className='text-2xl'>Update your store</CardTitle>
        <CardDescription>
          Update your store name and description, or delete it
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UpdateStoreForm store={store!} />
      </CardContent>
    </Card>
  )
}

export default UpdateStorePage
