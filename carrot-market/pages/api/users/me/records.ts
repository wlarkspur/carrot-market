import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@/libs/server/withHandlers";
import client from "@/libs/server/client";
import { withApiSession } from "@/libs/server/withSession";
import { Kind } from "@prisma/client";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    session: { user },
    query: { kind },
  } = req;
  const records = await client.record.findMany({
    where: {
      userId: user?.id,
      kind: kind as Kind,
    },
    include: {
      product: true,
    },
  });
  res.json({
    ok: true,
    records,
  });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
