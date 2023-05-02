import { PrismaClient } from "@prisma/client";

declare global {
  var client: PrismaClient | undefined;
}

const client = global.client || new PrismaClient({});
//  log: [`query`]  백엔드에서 쿼리작업 현황을 볼 수 있음

if (process.env.NODE_ENV === "development") global.client = client;

export default client;
