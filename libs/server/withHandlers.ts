import { NextApiResponse } from "next";
import { NextApiRequest } from "next";

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

export default function withHandler(
  method: "GET" | "POST" | "DELETE",
  fn: (req: NextApiRequest, res: NextApiResponse) => void
) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== method) {
      return res.status(405).end();
    }
    try {
      await fn(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}

//동기 함수는 코드의 실행 순서가 중요한 경우에 사용되며, 비동기 함수는 네트워크 요청, 파일 입출력 등과 같이 시간이 오래 걸리는 작업을 수행할 때 사용된다.
