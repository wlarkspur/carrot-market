import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@/libs/server/withHandlers";
import client from "@/libs/server/client";
import { withApiSession } from "@/libs/server/withSession";
import { parse } from "url";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    session: { user },
    body: { name, price, description },
  } = req;
  const { query } = parse(req.url || "", true);
  const skip = query.page ? (parseInt(query.page as string) - 1) * 10 : 0;
  console.log("쿼리", query.page, "스킵:", skip);
  if (req.method === "POST") {
    const stream = await client.stream.create({
      data: {
        name,
        price,
        description,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({ ok: true, stream });
  } else if (req.method === "GET") {
    if (!query.page) {
      const streams = await client.stream.findMany();
      res.json({ ok: true, streams });
    } else {
      const streams = await client.stream.findMany({
        take: 10,
        skip,
        orderBy: {
          createdAt: "asc",
        },
      });
      res.json({ ok: true, streams });
    }
  }
}

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);
