import { z } from 'zod'

export const checkoutSchema = z.object({
  productIds: z.string().array(),
})

export type checkoutPayload = z.infer<typeof checkoutSchema>
