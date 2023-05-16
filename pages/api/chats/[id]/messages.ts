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
    body: { chat },
    session: { user },
  } = req;

  const productId = Number(id);

  /* const groupedChatDepreciated = await client.groupedChat.create({
    data: {
      product: {
        connect: {
          id: Number(id),
        },
      },
      user: {
        connect: {
          id: user?.id,
        },
      },
    },
  }); */

  let existingGroupedChat = await client.groupedChat.findFirst({
    where: {
      product: {
        id: productId,
      },
    },
  });

  if (!existingGroupedChat) {
    existingGroupedChat = await client.groupedChat.create({
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
      },
    });
  }
  const chatPost = await client.chat.create({
    data: {
      chat: chat,
      user: {
        connect: {
          id: user?.id,
        },
      },
      product: {
        connect: {
          id: productId,
        },
      },
      groupedChat: {
        connect: {
          id: existingGroupedChat.id,
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
