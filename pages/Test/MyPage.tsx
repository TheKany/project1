import { GetServerSideProps } from "next";
import React from "react";

interface Post {
  id: number;
  title: string;
}

interface IndexPageProps {
  name: string;
  posts: Post[];
}

const MyPage = (props: IndexPageProps) => {
  const { name, posts } = props;
  return (
    <div>
      <h1>Hello {name}!</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<
  IndexPageProps
> = async () => {
  const url = "https://jsonplaceholder.typicode.com/posts";
  const posts: Post[] = await fetch(url).then((res) => res.json());
  return {
    props: {
      name: "Next",
      posts: posts,
    },
  };
};

export default MyPage;
