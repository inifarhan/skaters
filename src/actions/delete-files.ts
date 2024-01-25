'use server'

import { UTApi } from 'uploadthing/server'

const deleteFiles = async (key: string) => {
  try {
    const utapi = new UTApi()
    await utapi.deleteFiles(key)
  } catch (error) {
    console.log(error)
  }
}

export default deleteFiles
