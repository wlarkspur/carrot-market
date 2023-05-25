import { readdirSync } from "fs";
import { NextPage } from "next";

const Post: NextPage = () => {
  return <h1>hi</h1>;
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

export function getStaticProps() {
  return {
    props: {},
  };
}

export default Post;
