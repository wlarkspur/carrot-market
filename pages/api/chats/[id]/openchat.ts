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

  const existingChat = await client.groupedChat.findFirst({
    where: {
      productId: Number(productId),
    },
  });
  console.log("중복 DB", existingChat);
  //update 통해서 groupedChat이 존재할 경우 update, 존재하지 않으면 create.
  if (existingChat) {
    res.status(400).json({
      ok: false,
      message: "Chatting for this product already exists",
    });
    return;
  }
  if (req.method === "POST" && !existingChat) {
    try {
      const chatPost = await client.groupedChat.create({
        data: {
          user: {
            connect: {
              id: user?.id,
            },
          },
          product: {
            connect: {
              id: Number(productId),
            },
          },
          /* chats: {
            connect: {
              id: Number(productId),
            },
          }, */
        },
      });
      console.log("POST 결과 값:", chatPost);
      res.json({
        ok: true,
        chatPost,
      });
    } catch (error) {
      console.error("POST 요청 오류:", error);
      res.status(500).json({
        ok: false,
        message: "Internal server error",
      });
    }
  } else {
    res.status(405).send({
      message: "Only POST requests allowed",
      ok: false,
    });
  }
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);
