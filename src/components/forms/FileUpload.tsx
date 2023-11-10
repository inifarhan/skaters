'use client'

import { X } from 'lucide-react'
import Image from 'next/image'

import { Button } from '@/components/ui/Button'
import { UploadButton } from '@/lib/uploadthing'
import toast from 'react-hot-toast'

interface FileUploadProps {
  onChange: (value: string[]) => void
  onRemove: (value: string) => void
  value?: string[]
  endpoint: 'imageUploader'
}

export const FileUpload = ({
  onChange,
  onRemove,
  value,
  endpoint,
}: FileUploadProps) => {
  return (
    <>
      {value ? (
        <div className='pb-5 flex flex-wrap gap-4'>
          {value?.map((img, index) => (
            <div key={index} className='relative w-[200px] h-[200px]'>
              <Button
                type='button'
                className='z-10 absolute -top-3 -right-3 hover:bg-destructive'
                onClick={() => onRemove(img)}
                variant='destructive'
                size='icon'
              >
                <X className='h-6 w-6' />
              </Button>
              <Image fill className='rounded-md object-cover' alt='Image' src={img} />
            </div>
          ))}
        </div>
      ) : null}
      <UploadButton
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          const imageUrl = res?.map((img) => img.url)!
          onChange(imageUrl)
        }}
        onUploadError={(error: Error) => {
          toast.error(error.message)
        }}
      />
    </>
  )
}
