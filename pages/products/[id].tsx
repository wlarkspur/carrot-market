import Layout from "@/components/layout";
import { Product, User } from "@prisma/client";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import useMutation from "@/libs/client/useMutation";
import { cls } from "@/libs/client/utils";
import Image from "next/image";
import Button from "@/components/button";

interface ProductWithUser extends Product {
  user: User;
}

interface ItemDetailResponse {
  ok: boolean;
  product: ProductWithUser; //Product에는 user항목이 typescript에 없기때문에 ProductWithUser 에 Product를 extends하여 Prisma User 데이터를 가지는 user는 넣어줌
  relatedProducts: Product[];
  isLiked: boolean;
}

interface postDataForm {
  postData: string;
}

const ItemDetail: NextPage = () => {
  const router = useRouter();
  const { data, mutate: boundMutate } = useSWR<ItemDetailResponse>(
    router.query.id ? `/api/products/${router.query.id}` : null
  );

  const [toggleFav] = useMutation(`/api/products/${router.query.id}/fav`);
  //---------------------------------------------------------
  const [chatOpen, { loading, data: chatOpenData }] = useMutation(
    `/api/chats/${router.query.id}/openchat`
  );
  const chatOpenClick = async () => {
    chatOpen({ productId: router.query.id });
  };

  console.log("챗오픈 로그:", { data });

  //-----------------------------------------------------------

  const onFavClick = () => {
    if (!data) return;
    boundMutate((prev) => prev && { ...prev, isLiked: !prev.isLiked }, false);
    //mutate("/api/users/me", (prev: any) => ({ ok: !prev.ok }), false);
    toggleFav({});
  };

  return (
    <Layout canGoBack seoTitle="Product Detail">
      <div className="px-4 py-10">
        <div className="mb-8">
          <div className="relative pb-80">
            {data?.product.image ? (
              <Image
                src={`https://imagedelivery.net/vb1hJxSPrA50SRWhJFXABQ/${data?.product?.image}/public`}
                className=" bg-slate-300 object-cover"
                priority={true}
                fill
                sizes=""
                alt=""
              />
            ) : (
              <div className=" bg-slate-300 object-cover"></div>
            )}
          </div>
          <div className=" flex cursor-pointer py-3 border-t border-b items-center space-x-3">
            {data?.product.user.avatar ? (
              <Image
                width={48}
                height={48}
                alt=""
                src={`https://imagedelivery.net/vb1hJxSPrA50SRWhJFXABQ/${data?.product.user.avatar}/avatar`}
                className="w-12 h-12 rounded-full bg-slate-300"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-slate-300" />
            )}
            <div>
              <p className="text-sm font-medium text-gray-700">
                {data?.product?.user?.name}
              </p>
              <Link href={`/profile/${data?.product?.user?.id}`} legacyBehavior>
                <a className="text-xs- font-medium text-gray-500">
                  View profile &rarr;
                </a>
              </Link>
            </div>
          </div>
          <div className="mt-5">
            <h1 className="text-3xl font-bold text-gray-900">
              {data ? data?.product?.name : "???"}
            </h1>
            <span className="text-3xl block mt-3 text-gray-900">
              ${data ? data?.product?.price : "???"}
            </span>
            <p className="text-base my-6 text-gray-700">
              {data ? data?.product?.description : "???"}
            </p>
            <div className="flex items-center justify-between space-x-2">
              <Button
                onClick={chatOpenClick}
                href={`/chats/${data?.product.id}`}
                text="Talk to seller"
              ></Button>

              <button
                onClick={onFavClick}
                className={cls(
                  "p-3 rounded-md flex items-center justify-center hover:bg-gray-100",
                  data?.isLiked
                    ? "text-red-500  hover:text-red-600"
                    : "text-gray-400  hover:text-gray-500"
                )}
              >
                {data?.isLiked ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6 "
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
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Similar items</h2>
          <div className="grid mt-6 grid-cols-2 gap-4">
            {data?.relatedProducts.map((product) => (
              <Link href={`/products/${product.id}`} key={product.id}>
                {product ? (
                  <div style={{ height: "200px" }}>
                    <Image
                      alt=""
                      src={`https://imagedelivery.net/vb1hJxSPrA50SRWhJFXABQ/${product.image}/public`}
                      width={400}
                      height={200}
                      style={{
                        objectFit: "cover",
                        height: "100%",
                      }}
                    />
                  </div>
                ) : (
                  <div className="h-56 w-full mb-4 bg-slate-300" />
                )}

                <h3 className=" text-gray-700 -mb-1">{product.name}</h3>
                <span className="text-sm font-medium text-gray-900">
                  ${product.price}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetail;
