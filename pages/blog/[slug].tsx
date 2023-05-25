import { readdirSync } from "fs";
import matter from "gray-matter";
import { GetStaticProps, NextPage } from "next";
import remarkHtml from "remark-html";
import remarkParse from "remark-parse";

import { unified } from "unified";

const Post: NextPage<{ post: string }> = ({ post }) => {
  return <h1>{post}</h1>;
};
//getStaticPaths 함수는 Dynamic URL이 있는 페이지에서 getStaticProps를 쓸때 필요하다.

export function getStaticPaths() {
  const files = readdirSync("./posts").map((file) => {
    const [name, extenstion] = file.split(".");
    return { params: { slug: name } };
  });
  return {
    paths: files,
    fallback: false,
  };
}
//NextJs ->  getStaticPaths(모든 slug)를 보고 getStaticProps를 호출한다. POINT** getStaticProps가 getStaticPaths 안에 있는 각각의 Paths들을
export const getStaticProps: GetStaticProps = async (ctx) => {
  const { content } = matter.read(`./posts/${ctx.params?.slug}.md`);
  console.log(content);
  const { value } = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(content);
  console.log(value);
  return {
    props: {
      post: value,
    },
  };
};

export default Post;
