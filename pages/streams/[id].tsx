import Layout from "@/components/layout";
import Message from "@/components/messages";
import useMutation from "@/libs/client/useMutation";
import useUser from "@/libs/client/useUser";
import { Stream } from "@prisma/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { Stream as CloudflareStream } from "@cloudflare/stream-react";

type StreamProps = {
  src: string;
};

interface StreamMessage {
  message: string;
  id: number;
  user: {
    avatar?: string;
    id: number;
  };
}

interface StreamWithMessages extends Stream {
  messages: StreamMessage[];
}

interface StreamResponse {
  ok: true;
  stream: StreamWithMessages;
}

interface MessageForm {
  message: string;
}

const StreamMessage: NextPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<MessageForm>();
  const { data, mutate } = useSWR<StreamResponse>(
    router.query.id ? `/api/streams/${router.query.id}` : null,
    {
      refreshInterval: 1000,
    }
  );
  const [sendMessage, { loading, data: sendMessageData }] = useMutation(
    `/api/streams/${router.query.id}/messages`
  );

  const onValid = (form: MessageForm) => {
    if (loading) return;
    reset();
    mutate(
      (prev) =>
        prev &&
        ({
          ...prev,
          stream: {
            ...prev.stream,
            messages: [
              ...prev.stream.messages,
              { id: Date.now(), message: form.message, user: { ...user } },
            ],
          },
        } as any),
      false
    );
    sendMessage(form);
  };

  /* useEffect(() => {
    if (sendMessageData && sendMessageData.ok) {
      mutate(); //사용자가 메세지를 보낼 때마다 한번 더 fetch를 하게 됨.
    }
  }, [sendMessageData, mutate]);
  //스크롤 맨 아래로 당기기 */
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, []);
  console.log(data?.stream?.cloudflareId);
  const videoId = `${data?.stream.cloudflareId}`;
  return (
    <Layout canGoBack>
      <div className="py-10 px-4 space-y-4">
        {/* <div className="w-full aspect-video rounded-md shadow-sm">
          <CloudflareStream controls src={videoId} />
        </div> */}
        {data?.stream?.cloudflareId ? (
          <iframe
            className="w-full aspect-video rounded-md shadow-sm"
            /* src={`https:/iframe.videodelivery.net/${data.stream.cloudflareId}`} */
            src={`https://iframe.videodelivery.net/${data?.stream.cloudflareId}`}
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
            allowFullScreen={true}
          ></iframe>
        ) : null}

        <div className="mt-5">
          <h1 className=" text-gray-800 font-semibold text-3xl mt-2">
            {data?.stream?.name}
          </h1>
          <span className="text-2xl mt-2 text-gray-900">
            ${data?.stream?.price}
          </span>
          <p className="my-6 text-gray-700">{data?.stream?.description}</p>
          <div className="bg-orange-400 p-2 rounded-md flex flex-col space-y-2 overflow-scroll">
            <span className="font-bold text-gray-700">
              Stream Keys<span className="text-red-500">(secret)</span>
            </span>
            <span className="font-semibold text-md text-gray-700 flex items-center  ">
              <div className="flex felx-col">
                <div>
                  <span className="flex items-center">URL:</span>
                  <span className="flex items-center">Key:</span>
                </div>
                <div className="flex flex-col items-start  ml-2 text-gray-100 font-bold text-[13px]">
                  <span className="flex items-center ml">
                    {data?.stream?.cloudflareUrl}
                  </span>
                  <span className="flex items-center mt-1.5">
                    {data?.stream?.cloudflareKey}
                  </span>
                </div>
              </div>
            </span>
          </div>
        </div>
        <div>
          <p className="font-bold text-3xl mb-2">Live Chat</p>
          <div className="py-10 pb-16 h-[50vh] overflow-y-scroll space-y-4 border-[3px] border-orange-400 rounded-md p-1">
            {data?.stream?.messages.map((message) => (
              <Message
                key={message.id}
                message={message.message}
                reversed={message.user.id === user?.id}
              />
            ))}
            <div ref={scrollRef} />
          </div>
          <div className="fixed py-2 w-full mx-auto max-w-md bottom-2 inset-x-0">
            <form
              onSubmit={handleSubmit(onValid)}
              className="flex relative items-center"
            >
              <input
                type="text"
                {...register("message", { required: true })}
                className="shadow-sm rounded-full w-full border-gray-300 focus:ring-orange-500 focus:outline-none pr-12 focus:border-orange-500"
              />
              <div className="absolute inset-y-0 flex py-1.5 pr-1.5 right-0">
                <button className="flex focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 items-center bg-orange-500 rounded-full px-3 hover:bg-orange-600 cursor-pointer text-sm font-bold text-white">
                  &rarr;
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StreamMessage;
