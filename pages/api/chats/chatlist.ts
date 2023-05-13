import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@/libs/server/withHandlers";
import client from "@/libs/server/client";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    body: { userId },
    session: { user },
  } = req;
  const chatList = await client.groupedChat.findMany({
    where: {
      productId: {},
    },
    distinct: ["productId"],
    include: {
      product: {
        select: {
          name: true,
          image: true,
          price: true,
          user: {
            select: {
              chats: {
                select: {
                  chat: true,
                  id: true,
                  user: {
                    select: {
                      id: true,
                      name: true,
                      phone: true,
                      email: true,
                      avatar: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });

  res.json({
    ok: true,
    chatList,
  });
}
export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
