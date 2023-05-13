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
    body,
    session: { user },
  } = req;
  const chatGet = await client.chat.findMany({
    where: {
      OR: [
        {
          product: {
            id: +id!,
          },
          /* user: {
            id: user?.id,
          }, */
        },
      ],
    },
    distinct: ["productId"],
    select: {
      id: true,
      productId: true,
      product: {
        select: {
          image: true,
          name: true,
          price: true,
          user: {
            select: {
              phone: true,
              name: true,
              avatar: true,
            },
          },
        },
      },
      user: {
        select: {
          id: true,
          phone: true,
          email: true,
          name: true,
          avatar: true,
        },
      },
      groupedChat: {
        select: {
          id: true,
          chats: {
            select: {
              id: true,
              chat: true,
              user: {
                select: {
                  id: true,
                  name: true,
                  avatar: true,
                  createdAt: true,
                  updatedAt: true,
                },
              },
            },
          },
        },
      },
    },
  });

  res.json({
    ok: true,
    chatGet,
  });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
