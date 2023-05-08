import Layout from "@/components/layout";
import Message from "@/components/messages";
import useMutation from "@/libs/client/useMutation";
import useUser from "@/libs/client/useUser";
import { Product, User } from "@prisma/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import useSWR from "swr";

interface chatResponse {
  ok: boolean;
  chatGet: {
    id: string;
    userId: number;
    chat: string;
    productId: number;
    user: User;
    product: Product;
  }[];
}

interface messageForm {
  chat: string;
}

const ChatDetail: NextPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const { data, mutate } = useSWR<chatResponse>(
    `/api/chats/${router.query.id}`
  );
  const { register, handleSubmit, reset } = useForm<messageForm>();
  const [sendChat, { loading, data: sendChatData }] = useMutation(
    `/api/chats/${router.query.id}/messages`
  );
  const onValid = (form: messageForm) => {
    if (loading) return;
    reset();

    sendChat(form);
  };
  console.log("API 데이터: ", data);
  return (
    <Layout canGoBack title={"Steve"}>
      <div className="py-10 px-4 space-y-4">
        {data?.chatGet.map((message) =>
          message.userId === user?.id ? (
            <Message reversed message={message.chat + ""} key={message.id} />
          ) : (
            <Message message={message.chat + ""} key={message.id} />
          )
        )}
        <form
          onSubmit={handleSubmit(onValid)}
          className="fixed w-full mx-auto max-w-md bottom-2 inset-x-0"
        >
          <input
            {...register("chat")}
            type="text"
            className="shadow-sm rounded-full w-full border-gray-300 focus:ring-orange-500 focus:outline-none pr-12 focus:border-orange-500"
          />
          <div className="absolute inset-y-0 flex py-1.5 pr-1.5 right-0">
            <button className="flex focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 items-center bg-orange-500 rounded-full px-3 hover:bg-orange-600 cursor-pointer text-sm font-bold text-white">
              &rarr;
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ChatDetail;
