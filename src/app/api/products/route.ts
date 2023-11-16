import prisma from '@/lib/db'
import { z } from 'zod'

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)

    const { limit, page } = z
      .object({
        limit: z.string(),
        page: z.string(),
      })
      .parse({
        limit: url.searchParams.get('limit'),
        page: url.searchParams.get('page'),
      })

    const products = await prisma.product.findMany({
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit),
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        Category: true,
      },
    })

    return Response.json(products)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response('Invalid request data passed', { status: 422 })
    }

    return new Response('Could not fetch more posts', { status: 500 })
  }
}
