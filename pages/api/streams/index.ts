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

  if (req.method === "POST") {
    const {
      result: {
        uid,
        rtmps: { streamKey, url },
      },
    } = await (
      await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ID}/stream/live_inputs`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.CF_STREAM_TOKEN}`,
            "X-Auth-Email": "",
          },
          body: `{"meta": {"name":"${name}"},"recording": { "mode": "automatic", "timeoutSeconds": 10 }}`,
        }
      )
    ).json();

    const {
      result: { uid: videoUID },
    } = await (
      await fetch(
        `https:////dash.cloudflare.com/api/v4/accounts/${process.env.CF_ID}/stream/live_inputs/${uid}/videos`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.CF_STREAM_TOKEN}`,
            "X-Auth-Email": "",
          },
        }
      )
    ).json();
    //dash.cloudflare.com/api/v4/accounts/<ACCOUNT_ID>/stream/live_inputs/<LIVE_INPUT_UID>/videos
    console.log("video UID:", videoUID);
    const stream = await client.stream.create({
      data: {
        cloudflareId: uid,
        cloudflareKey: streamKey,
        cloudflareUrl: url,
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
    res.json({ ok: true, stream, videoUID });
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
