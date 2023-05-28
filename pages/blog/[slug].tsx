import Layout from "@/components/layout";
import { readdirSync } from "fs";
import matter from "gray-matter";
import { GetStaticProps, NextPage } from "next";
import remarkHtml from "remark-html";
import remarkParse from "remark-parse";

import { unified } from "unified";

const Post: NextPage<{ post: string; data: any }> = ({ post, data }) => {
  return (
    <Layout title={data.title} seoTitle={data.title}>
      {" "}
      <div
        className="blog-post-content"
        dangerouslySetInnerHTML={{ __html: post }}
      ></div>
    </Layout>
  );
};
//getStaticPaths 함수는 Dynamic URL이 있는 페이지에서 getStaticProps를 쓸때 필요하다.

export function getStaticPaths() {
  /* const files = readdirSync("./posts").map((file) => {
    const [name, extenstion] = file.split(".");
    return { params: { slug: name } };
  }); */
  return {
    paths: [],
    fallback: "blocking",
  };
}
//NextJs ->  getStaticPaths(모든 slug)를 보고 getStaticProps를 호출한다. POINT** getStaticProps가 getStaticPaths 안에 있는 각각의 Paths들을
export const getStaticProps: GetStaticProps = async (ctx) => {
  const { content, data } = matter.read(`./posts/${ctx.params?.slug}.md`);
  const { value } = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(content);
  console.log(value);
  return {
    props: {
      data,
      post: value,
    },
  };
};

export default Post;
