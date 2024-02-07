
// import React, { useEffect, useState } from 'react'

import BlogCard from "@/components/BlogCard";
import { Client } from "@notionhq/client";
import NotionBlocks from "notion-block-renderer";
import { json } from "stream/consumers";





const fetchfromNotion = async() => {
    const res = await fetch("http://localhost:3000/api/blogsHolder", {next: {revalidate: 1}});
    const data = await res.json();
    return data.data
  }


const Blogs = async() => {



    const data = await fetchfromNotion();



  return (
    <div className="w-full min-h-screen flex justify-center">
      <div className="md:w-[60%] border h-full p-12">

        <h1 className="text-center text-4xl py-6 capitalize font-bold">Find out awesome Blogs here!</h1>

      
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