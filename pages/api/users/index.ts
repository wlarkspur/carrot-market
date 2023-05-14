import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@/libs/server/withHandlers";
import client from "@/libs/server/client";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    session: { user },
  } = req;

  const userList = await client.user.findMany({
    where: {},
    include: {
      products: true,
    },
  });
  res.json({
    ok: true,
    userList,
  });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
