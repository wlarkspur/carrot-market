import Layout from "@/components/layout";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Chats: NextPage = () => {
  return (
    <Layout title="chats" hasTabBar>
      <Head>
        <title>Chats</title>
      </Head>
      <div className="py-10 divide-y-[1px]">
        {[1, 2, 3, 4, 5, 6, 7].map((_, i) => (
          <Link href={`/chats/${i}`} key={i}>
            <div className="flex cursor-pointer py-3 px-4 items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-slate-300" />
              <div>
                <p className="text-memidum  text-gray-700">Steve Jebs</p>
                <p className="text-sm text-gray-500">
                  See you tommorrow in the corner at 2pm
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default Chats;
