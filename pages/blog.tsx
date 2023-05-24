import Layout from "@/components/layout";
import matter from "gray-matter";
import { readFileSync, readdirSync } from "fs";
import { NextPage } from "next";

interface Post {
  title: string;
  date: string;
  category: string;
}

const Blog: NextPage<{ posts: Post[] }> = ({ posts }) => {
  return (
    <Layout seoTitle="Blog" title="Blog">
      <h1 className="font-semibold text-center text-lg mt-5 my-10">
        Latest Posts:
      </h1>
      <ul>
        {posts.map((post, index) => (
          <div key={index} className="mb-5">
            <span className="text-lg text-red-500">{post.title}</span>
            <div>
              <span>
                {post.date} / {post.category}
              </span>
            </div>
          </div>
        ))}
      </ul>
    </Layout>
  );
};

export async function getStaticProps() {
  const blogPosts = readdirSync("./posts").map((file) => {
    const content = readFileSync(`./posts/${file}`, "utf-8");
    return matter(content).data;
  });
  console.log(blogPosts);
  return {
    props: {
      posts: blogPosts,
    },
  };
}

export default Blog;
