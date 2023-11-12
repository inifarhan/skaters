import slugify from 'slugify'
import { z } from 'zod'

import { getAuthSession } from '@/lib/auth'
import prisma from '@/lib/db'
import { productSchema } from '@/lib/validators/product'

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; productId: string } },
) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const body = await req.json()

    const { name, description, category, price, images } =
      productSchema.parse(body)

    const slug = slugify(name, {
      lower: true,
    })

    const isProductExist = await prisma.product.findFirst({
      where: {
        id: params.productId,
        storeId: params.storeId,
      },
    })

    if (!isProductExist) {
      return new Response('Product not found.', {
        status: 404,
      })
    }

    await prisma.product.update({
      where: {
        storeId: params.storeId,
        id: params.productId,
      },
      data: {
        name,
        description,
        slug,
        categoryId: category,
        price,
        images,
      },
    })

    return new Response('OK')
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response('Invalid request data passed', { status: 422 })
    }

    console.log(error)

    return new Response('Could not update product, please try again later.', {
      status: 500,
    })
  }
}
