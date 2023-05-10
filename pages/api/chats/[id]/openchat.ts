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

  if (req.method === "POST") {
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
              id: Number(id),
            },
          },
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
