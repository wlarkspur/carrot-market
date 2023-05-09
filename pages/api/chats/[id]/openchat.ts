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
    body: { productId },
    session: { user },
  } = req;

  const chatPost = await client.groupedChat.create({
    data: {
      chats: {
        connect: {
          id: productId,
        },
      },
      user: {
        connect: {
          id: user?.id,
        },
      },
      product: {
        connect: {
          id: +id!,
        },
      },
    },
  });

  res.json({
    ok: true,
    chatPost,
  });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);
