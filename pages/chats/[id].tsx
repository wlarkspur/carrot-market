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
}

interface Product {
  id: number;
  name: string;
  user: User;
}

interface GroupedChat {
  id: number;
  productId: number;
  chats: Chat[];
}

interface Chat {
  id: number;
  userId: number;
  chat: string;
  productId: number;
  user: User;
  product: Product;
  groupedChats: GroupedChat[];
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
    <Layout canGoBack title={"Steve"}>
      <div className="py-10 px-4 space-y-4">
        {/* {data?.chatGet.map((message) =>
          message.userId === user?.id ? (
            <Message reversed message={message.chat + ""} key={message.id} />
          ) : (
            <Message message={message.chat + ""} key={message.id} />
          )
        )} */}
        <p>현재 API 보수작업중 입니다.</p>
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
