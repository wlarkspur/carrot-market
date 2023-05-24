import FloatingButton from "@/components/floating-button";
import Item from "@/components/item";
import Layout from "@/components/layout";
import useUser from "@/libs/client/useUser";
import { Fav, Product } from "@prisma/client";
import type { NextPage } from "next";
import Head from "next/head";
import useSWR, { SWRConfig } from "swr";
import client from "@/libs/server/client";

//Home , index

export interface ProductWithCount extends Product {
  _count: {
    favs: number;
  };
}

interface ProductsResponse {
  ok: boolean;
  products: ProductWithCount[];
}

const Home: NextPage = () => {
  const { user, isLoading } = useUser();
  const { data } = useSWR<ProductsResponse>("/api/products");

  return (
    <Layout seoTitle="Home" title="Home" hasTabBar>
      <Head>
        <title>Home</title>
      </Head>
      <div className="flex flex-col space-y-5 pt-3">
        {data
          ? data?.products?.map((product) => (
              <Item
                key={product.id}
                id={product.id}
                title={product.name}
                price={product.price}
                hearts={product._count?.favs || 0}
                image={product.image}
              ></Item>
            ))
          : "Loading..."}
        <FloatingButton href="products/upload">
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  );
};

const Page: NextPage<{ products: ProductWithCount[] }> = ({ products }) => {
  return (
    <SWRConfig
      value={{
        fallback: {
          "/api/products": {
            ok: true,
            products,
          },
        },
      }}
    >
      <Home />
    </SWRConfig>
  );
};

//서버사이드 렌더링
//아래와 같이 서버에서 데이터를 불러오면 SWR 새로고침 기능을 쓸 수 없게 된다; 어떻게 서버단에서 rendering과 SWR을 합칠 수 있을까?

// useSWR 훅에서 가져온 데이터('data)와 'getServerSideProps' 함수에서 가져온 데이터는 서로 다른데, useSWR훅은 클라이언트 측에서 실행되며, getServerSideProps함수는 서버사이드에서 실행되기 때문에 데이터 소스가 다르다. 이런 방식으로 클라이언트 측과 서버 측의 데이터를 조합하여 사용자에게 최신 데이터를 제공하고, 페이지 로드 시 초기 데이터를 렌더링할 수 있습니다.

export async function getServerSideProps() {
  console.log("SSR");
  const products = await client.product.findMany({});
  console.log(products);
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}

export default Page;
