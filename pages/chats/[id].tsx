import Layout from "@/components/layout";
import Message from "@/components/messages";
import useMutation from "@/libs/client/useMutation";
import useUser from "@/libs/client/useUser";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import useSWR from "swr";

interface User {
  id: number;
  name: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
}

interface ChatList {
  id: number;
  chat: string;
  user: User;
}

interface GroupedChatWith {
  id: number;
  chats: ChatList[];
}

interface Seller {
  phone: number;
  name: string;
  avatar: string;
}

interface ProductList {
  image: string;
  name: string;
  price: number;
  user: Seller;
}

interface Chat {
  id: number;
  productId: number;
  product: ProductList;
  user: User;
  groupedChat: GroupedChatWith;
}

interface ChatResponse {
  ok: boolean;
  chatGet: Chat[];
}

interface MessageForm {
  chat: string;
}

const ChatDetail: NextPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const { data, mutate } = useSWR<ChatResponse>(
    router.query.id ? `/api/chats/${router.query.id}` : null
  );
  const { register, handleSubmit, reset } = useForm<MessageForm>();
  const [sendChat, { loading, data: sendChatData }] = useMutation(
    `/api/chats/${router.query.id}/messages`
  );
  const onValid = async (form: MessageForm) => {
    reset();
    sendChat(form);
  };

  console.log("API 데이터: ", data);
  return (
    <Layout canGoBack title={data?.chatGet[0].product.user.name}>
      <div className="py-10 px-4 space-y-4">
        {data?.chatGet[0] &&
          data?.chatGet[0].groupedChat.chats.map((message) =>
            message.user.id === user?.id ? (
              <Message
                avatarUrl={message.user.avatar}
                reversed
                message={message.chat}
                key={message.id}
              />
            ) : (
              <Message
                avatarUrl={message.user.avatar}
                message={message.chat}
                key={message.id}
              />
            )
          )}

        <p className="fixed bottom-40 left-16 font-extrabold text-red-700 bg-slate-100 rounded-sm">
          현재 SERVER & DB 구현 중 입니다.
        </p>

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
