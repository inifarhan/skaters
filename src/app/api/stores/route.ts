import slugify from 'slugify'
import { z } from 'zod'

import { getAuthSession } from '@/lib/auth'
import prisma from '@/lib/db'
import { storeSchema } from '@/lib/validators/store'

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const body = await req.json()

    const { name, description } = storeSchema.parse(body)

    const slug = slugify(name, {
      lower: true
    })

    const isSlugExist = await prisma.store.findUnique({
      where: {
        slug,
      },
    })

    if (isSlugExist) {
      return new Response('Store name is already exist', { status: 409 })
    }

    await prisma.store.create({
      data: {
        name,
        description,
        slug,
        userId: session.user.id,
      },
    })

    return new Response('OK')
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response('Invalid request data passed', { status: 422 })
    }

    return new Response('Could not create store, please try again later.', {
      status: 500,
    })
  }
}
