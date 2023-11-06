import { Heading } from '@/components/Heading'
import { AddStoreForm } from '@/components/forms/AddStoreForm'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card'
import { Separator } from '@/components/ui/Separator'

const CreateStorePage = async () => {
  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title='New Store'
          description='Add a new store to your account'
        />
      </div>
      <Separator className='my-4' />
      <Card
        id='new-store-page-form-container'
        aria-labelledby='new-store-page-form-heading'
      >
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl'>Add store</CardTitle>
          <CardDescription>Add a new store to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <AddStoreForm />
        </CardContent>
      </Card>
    </>
  )
}

export default CreateStorePage
