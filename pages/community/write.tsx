import Button from "@/components/button";
import Layout from "@/components/layout";
import type { NextPage } from "next";

const Write: NextPage = () => {
  return (
    <Layout canGoBack title="Write Post">
      <form className="p-4 space-y-4">
        <textarea
          className="mt-1 shadow-sm w-full focus:ring-orange-500 rounded-md border-gray-300 focus:border-orange-500"
          rows={4}
          placeholder="Ask a question!"
        />
        <Button text="Submit" />
      </form>
    </Layout>
  );
};

export default Write;
