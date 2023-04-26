import FloatingButton from "@/components/floating-button";
import Layout from "@/components/layout";
import Pagination from "@/components/pagination";
import { Stream } from "@prisma/client";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";

interface StreamsResponse {
  ok: boolean;
  streams: Stream[];
}

/* backendpage = frontpage - 1

pageSize = 25

take: 25
skip: backendpage * 25 */

const Streams: NextPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = useSWR<StreamsResponse>(`/api/streams`); // /api/streams?page=1

  return (
    <>
      <Layout title="Streams" hasTabBar>
        <Head>
          <title>Streams</title>
        </Head>
        <div className="py-10 divide-y-3 space-y-5">
          {data?.streams?.map((stream) => (
            <Link
              href={`/streams/${stream.id}`}
              className="pt-5 px-5"
              key={stream.id}
            >
              <div className="w-full rounded-md shadow-sm bg-slate-300 aspect-video  " />
              <h3 className=" text-gray-700 text-lg mt-2">{stream.name}</h3>
            </Link>
          ))}
          <Pagination />
          <FloatingButton href={`/streams/create`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </FloatingButton>
        </div>
      </Layout>
    </>
  );
};

export default Streams;
