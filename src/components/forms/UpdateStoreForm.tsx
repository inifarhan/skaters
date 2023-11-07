'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Store } from '@prisma/client'
import axios from 'axios'
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
import { Textarea } from '@/components/ui/Textarea'
import { storePayload, storeSchema } from '@/lib/validators/store'
import { AlertModal } from '@/components/modals/AlertModal'

interface UpdateStoreFormProps {
  store: Store
}

export const UpdateStoreForm: React.FC<UpdateStoreFormProps> = ({ store }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)

  const form = useForm<storePayload>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      name: store.name,
      description: store.description!,
    },
  })

  const onSubmit = async (values: storePayload) => {
    try {
      setIsLoading(true)
      await axios.patch(`/api/stores/${store.id}`, values)
      toast.success('Store is updated.')
      window.location.assign('/dashboard/stores')
    } catch (error: any) {
      toast.error(error.response.data)
    } finally {
      setIsLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setIsLoading(true)
      await axios.delete(`/api/stores/${store.id}`)
      window.location.assign('/dashboard/stores')
      toast.success('Store is deleted.')
    } catch (error: any) {
      toast.error(error.response.data)
    } finally {
      setIsLoading(false)
      setOpen(false)
    }
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={isLoading}
      />
      <Form {...form}>
        <form
          className='grid w-full max-w-xl gap-5'
          onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Type store name here.'
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
                    placeholder='Type store description here.'
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex flex-col gap-2 xl:flex-row'>
            <Button isLoading={isLoading}>
              Update store
              <span className='sr-only'>Update store</span>
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault()
                setOpen(true)
              }}
              variant='destructive'>
              Delete store
              <span className='sr-only'>Delete store</span>
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}
