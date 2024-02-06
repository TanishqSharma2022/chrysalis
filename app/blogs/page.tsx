
// import React, { useEffect, useState } from 'react'

import BlogCard from "@/components/BlogCard";
import { Client } from "@notionhq/client";
import NotionBlocks from "notion-block-renderer";
import { json } from "stream/consumers";


const notionSecret = process.env.NOTION_SECRET;
const notionDBID = process.env.NOTION_DATABASE_ID;

const notion = new Client({ auth: notionSecret });


const fetchfromNotion = async() => {
    const res = await fetch("http://localhost:3000/api/blogsHolder", {next: {revalidate: 1}});
    const data = await res.json();
    return data.data
  }


const Blogs = async() => {

    // useEffect(() => {

    const data = await fetchfromNotion();
    // console.log(data);

    // }, []);


  return (
    <div className="w-full min-h-screen flex justify-center">
      <div className="md:w-[60%] border h-full p-12">

        Blogs

        {/* {JSON.stringify(data, null, 2)} */}
      
        {data && data.map((blogCard:any) => {
          return(
            <div key={blogCard.id}>
                <BlogCard blogCard={blogCard} />
            </div>
          )
        })}


</div>



    </div>

  )
}


export default Blogs;