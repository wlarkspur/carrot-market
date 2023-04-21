import Item from "@/components/item";
import Layout from "@/components/layout";
import type { NextPage } from "next";

const Sold: NextPage = () => {
  return (
    <Layout canGoBack title="판매내역">
      <div className="flex flex-col space-y-5 py-10">
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
          <Item
            key={i}
            id={i}
            title={"iPhone 14"}
            price={99}
            hearts={1}
            comments={1}
          ></Item>
        ))}
      </div>
    </Layout>
  );
};

export default Sold;
