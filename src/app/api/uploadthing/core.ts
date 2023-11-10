import { getAuthSession } from '@/lib/auth'
import { createUploadthing, type FileRouter } from 'uploadthing/next'

const f = createUploadthing()

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: '2MB' } })
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const session = await getAuthSession()

      // If you throw, the user will not be able to upload
      if (!session?.user) throw new Error('Unauthorized')

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: session?.user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log('Upload complete for userId:', metadata.userId)

      console.log('file url', file.url)
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
