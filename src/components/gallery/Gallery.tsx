'use client'

import Image from 'next/image'
import { Tab } from '@headlessui/react'

import { Image as ImageType } from '@/types/images'

import GalleryTab from './GalleryTab'

interface GalleryProps {
  images: ImageType[]
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  return (
    <Tab.Group as='div' className='flex flex-col-reverse'>
      <div className='mt-6 w-full'>
        <Tab.List className='grid grid-cols-4 gap-6'>
          {images.map((image) => (
            <GalleryTab key={image.key} image={image} />
          ))}
        </Tab.List>
      </div>
      <Tab.Panels className='aspect-square w-full'>
        {images.map((image) => (
          <Tab.Panel key={image.name}>
            <div className='aspect-square relative h-full w-full rounded-lg overflow-hidden'>
              <Image
                fill
                src={image.url}
                alt='Image'
                className='object-cover object-center'
              />
            </div>
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  )
}

export default Gallery
