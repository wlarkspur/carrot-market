import Layout from "@/components/layout";
import Message from "@/components/messages";
import { Stream } from "@prisma/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";

interface StreamResponse {
  ok: true;
  stream: Stream;
}

const Stream: NextPage = () => {
  const router = useRouter();
  const { data } = useSWR<StreamResponse>(
    router.query.id ? `/api/streams/${router.query.id}` : null
  );
  return (
    <Layout canGoBack>
      <div className="py-10 px-4 space-y-4">
        <div className="w-full rounded-md shadow-sm bg-slate-300 aspect-video  " />
        <h1 className=" text-gray-800 font-semibold text-3xl mt-2">
          {data?.stream?.name}
        </h1>
        <span className="text-2xl mt-2 text-gray-900">
          ${data?.stream?.price}
        </span>
        <p className="my-6 text-gray-700">{data?.stream?.description}</p>
        <div className="py-10 pb-16 h-[50vh] overflow-y-scroll space-y-4">
          <Message message="Hi how much are you selling them for?" />
          <Message reversed message="I want ￦20,000" />
        </div>
        <div className="fixed py-2 w-full mx-auto max-w-md bottom-2 inset-x-0">
          <div className="flex relative items-center">
            <input
              type="text"
              className="shadow-sm rounded-full w-full border-gray-300 focus:ring-orange-500 focus:outline-none pr-12 focus:border-orange-500"
            />
            <div className="absolute inset-y-0 flex py-1.5 pr-1.5 right-0">
              <button className="flex focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 items-center bg-orange-500 rounded-full px-3 hover:bg-orange-600 cursor-pointer text-sm font-bold text-white">
                &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Stream;
