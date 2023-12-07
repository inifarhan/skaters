import { z } from 'zod'

export const storeSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: 'Name must contain at least 3 character(s)',
    })
    .max(50, {
      message: 'Name must contain at most 50 character(s)',
    }),
  description: z
    .string()
    .max(500, {
      message: 'Description must contain at most 500 character(s)',
    })
    .optional(),
})

export type storePayload = z.infer<typeof storeSchema>
