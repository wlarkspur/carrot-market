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
  const chatGet = await client.chat.findUnique({
    where: {
      id: +id!,
    },
    chat,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
      product: {
        select: {
          id: true,
          name: true,
          user: {
            select: {
              id: true,
              phone: true,
              name: true,
              avatar: true,
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
