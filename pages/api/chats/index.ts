import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@/libs/server/withHandlers";
import client from "@/libs/server/client";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
    const {
      session: { user },
    } = req;
    const chatsGet = await client.chat.findMany({
      where: {
        user: {
          id: user?.id,
        },
      },
      distinct: ["productId"],
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
            chats: {
              select: {
                chat: true,
                userId: true,
                productId: true,
              },
            },
          },
        },
        /* product: {
          select: {
            id: true,
            name: true,
            user: {
              select: {
                name: true,
                avatar: true,
              },
            },
          },
        }, */
      },
    });

    res.json({
      ok: true,
      chatsGet,
    });
  }
  /* if (req.method === "POST") {
    const {
      body: { productId },
      session: { user },
    } = req;
    const chat = await client.chat.create({
      data: {
        product: {
          connect: {
            id: productId,
          },
        },
        user: {
          connect: {
            id: user?.id,
          },
        },
        chat: user?.id + "",
      },
    });

    return res.json({
      ok: true,
      chat,
    });
  } */
}
export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
