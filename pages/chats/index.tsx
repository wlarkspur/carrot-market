import Layout from "@/components/layout";
import { Chat, Product, User } from "@prisma/client";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

interface userWithProduct extends Product {
  name: string;
  price: number;
  user: {
    chats: [
      {
        chat: string;
        id: number;
        user: {
          id: number;
          name: string;
          phone: number;
          email: string;
          avatar: string;
        };
      }
    ];
  };
}

interface chatResponse {
  ok: true;
  chatList: [
    {
      id: number;
      createdAt: string;
      updatedAt: string;
      productId: number;
      chatId: number;
      userId: number;
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
    <Layout title="chats" hasTabBar>
      <Head>
        <title>Chats</title>
      </Head>
      <div className="py-10 divide-y-[1px]">
        {data &&
          data.chatList.map((list) => (
            <Link href={`/chats/${list.productId}`} key={list.id}>
              <div className="flex cursor-pointer py-3 px-4 items-center space-x-3">
                {data?.chatList[0].user.avatar ? (
                  <Image
                    width={48}
                    height={48}
                    alt=""
                    src={`https://imagedelivery.net/vb1hJxSPrA50SRWhJFXABQ/${data?.chatList[0]?.product.image}/avatar`}
                    className="w-12 h-12 rounded-full bg-slate-300"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-slate-300" />
                )}

                <div>
                  <p className="text-memidum  text-gray-700">
                    {list.product.user.chats[0]?.user.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {list.product.user.chats[0]?.chat}
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
