import { z } from "zod";

export const storeSchema = z.object({
  name: z.string().min(3).max(50),
  description: z.string().optional(),
})

export type storePayload = z.infer<typeof storeSchema>