import { z } from "zod";

import { getAuthSession } from "@/lib/auth";
import prisma from "@/lib/db";

export async function GET(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const url = new URL(req.url);

    const { limit, page, status } = z
      .object({
        limit: z.string(),
        page: z.string(),
        status: z.enum(["PENDING", "PAID", "CANCELED", "null"]),
      })
      .parse({
        limit: url.searchParams.get("limit"),
        page: url.searchParams.get("page"),
        status: url.searchParams.get("status"),
      });

    let result;

    if (status != "null") {
      const orders = await prisma.order.findMany({
        where: {
          status,
          userId: session.user.id,
        },
        take: parseInt(limit),
        skip: (parseInt(page) - 1) * parseInt(limit),
        orderBy: {
          createdAt: "desc",
        },
      });

      result = orders;
    } else {
      const orders = await prisma.order.findMany({
        where: {
          userId: session.user.id,
        },
        take: parseInt(limit),
        skip: (parseInt(page) - 1) * parseInt(limit),
        orderBy: {
          createdAt: "desc",
        },
      });

      result = orders;
    }

    return Response.json(result);
  } catch (error) {
    console.log(error);

    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }

    return new Response("Could not fetch more orders", { status: 500 });
  }
}
