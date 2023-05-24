import Layout from "@/components/layout";
import { Chat, Product, User } from "@prisma/client";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

interface UserDetail {
  id: number;
  phone: string;
  name: string;
  avatar: string;
}

interface userWithProduct {
  id: number;
  image: string;
  name: string;
  price: number;
  user: UserDetail;
}

interface Chatlist {
  id: number;
  createdAt: string;
  updatedAt: string;
  userId: number;
  chat: string;
  productId: number;
  groupedChatId: number;
}

interface chatResponse {
  ok: true;
  chatList: [
    {
      id: number;
      createdAt: string;
      updatedAt: string;
      productId: number;
      userId: number;
      chats: Chatlist[];
      product: userWithProduct;
      user: {
        id: number;
        name: string;
        avatar: string;
      };
    }
  ];
}

const Chats: NextPage = () => {
  const router = useRouter();
  const { data } = useSWR<chatResponse>(`/api/chats/chatlist/`);

  return (
    <Layout seoTitle="Chats" hasTabBar>
      {/* <Head>
        <title>Chats</title>
      </Head> */}
      <div className="py-10 divide-y-[1px]">
        {data &&
          data.chatList.map((list) => (
            <Link href={`/chats/${list.productId}`} key={list.id}>
              <div className="flex cursor-pointer py-3 px-4 items-center space-x-3">
                {list.user.avatar ? (
                  <Image
                    width={48}
                    height={48}
                    alt=""
                    src={`https://imagedelivery.net/vb1hJxSPrA50SRWhJFXABQ/${list.product.image}/avatar`}
                    className="w-12 h-12 rounded-full bg-slate-300"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-slate-300" />
                )}

                <div>
                  <p className="text-memidum  text-gray-700">
                    {list.product.user.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {list.chats[list.chats.length - 1].chat}
                  </p>
                  {/* {list.product.user.chats.map((chat) => (
                    <p key={chat.id} className="text-sm text-gray-500">
                      {chat.chat}
                    </p>
                  ))} */}
                </div>
              </div>
            </Link>
          ))}
      </div>
    </Layout>
  );
};

export default Chats;
