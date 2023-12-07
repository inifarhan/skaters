'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Product } from '@prisma/client'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button } from '@/components/ui/Button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { productPayload, productSchema } from '@/lib/validators/product'

import { FileUpload } from './FileUpload'

export function AddProductForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const params = useParams()
  const router = useRouter()

  const form = useForm<productPayload>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  })

  const onSubmit = async (values: productPayload) => {
    try {
      setIsLoading(true)
      const { data }: { data: Product } = await axios.post(
        `/api/stores/${params.storeId}/products`,
        values,
      )
      toast.success('Product is created.')
      router.push(`/${data.storeId}/${data.slug}?productId=${data.id}`)
    } catch (error: any) {
      toast.error(error.response.data)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form
        className='grid w-full max-w-xl gap-5'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder='Type product name here.'
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Type product description here.'
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex flex-col items-start gap-6 sm:flex-row'>
          <FormField
            control={form.control}
            name='category'
            render={({ field }) => (
              <FormItem className='flex-1 w-full'>
                <FormLabel>Category</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={(value: typeof field.value) =>
                    field.onChange(value)
                  }
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select a category' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='skateboards'>Skateboards</SelectItem>
                    <SelectItem value='clothing'>Clothing</SelectItem>
                    <SelectItem value='shoes'>Shoes</SelectItem>
                    <SelectItem value='accessories'>Accessories</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='price'
            render={({ field }) => (
              <FormItem className='flex-1 w-full'>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <p className='absolute text-sm left-0 w-8 inset-y-0 grid place-items-center'>
                      Rp
                    </p>
                    <Input
                      type='number'
                      className='pl-8'
                      placeholder='0'
                      disabled={isLoading}
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name='images'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Images</FormLabel>
              <FormControl>
                <FileUpload
                  endpoint='imageUploader'
                  value={field.value}
                  onChange={(file) =>
                    field.value
                      ? field.onChange([...field.value, ...file])
                      : field.onChange([...file])
                  }
                  onRemove={(url) =>
                    field.onChange([
                      ...field.value.filter((current) => current.url !== url),
                    ])
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button isLoading={isLoading}>
          Add Product
          <span className='sr-only'>Add Product</span>
        </Button>
      </form>
    </Form>
  )
}
