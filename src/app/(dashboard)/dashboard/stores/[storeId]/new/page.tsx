import { AddProductForm } from '@/components/forms/AddProductForm'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card'

const NewProductPage = () => {
  return (
    <Card
      id='new-product-page-form-container'
      aria-labelledby='new-product-page-form-heading'
    >
      <CardHeader className='space-y-1'>
        <CardTitle className='text-2xl'>Add product</CardTitle>
        <CardDescription>Add a new product to your store</CardDescription>
      </CardHeader>
      <CardContent>
        <AddProductForm />
      </CardContent>
    </Card>
  )
}

export default NewProductPage
