"use client"

import Image from "next/image";
import { useEffect, useState } from "react";



export default function Home() {
  const [block, setBlock] = useState([]);
  useEffect(() => {
    async function fetchfromNotion() {
      const res = await fetch("http://localhost:3000/api/notion", {next: {revalidate: 1}});
      const data = await res.json();
      console.log(data);
      setBlock(data.data);
    }
    fetchfromNotion();
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      {!block && "Loading..."}
<div className="w-[60%] border h-full">
      {block.map((blog:any) => {
        return(
          <div key={blog.id}>
            {blog.type == "paragraph" && <p className="font-sans text-xl ">{blog.paragraph.rich_text[0]?.text.content}</p>}
            {blog.type == "image" && <img className="min-w-full"  src={blog.image.external.url}  alt={blog.image.external.url} />}
          </div>
        )
      })}
      </div>

    </main>
  );
}
