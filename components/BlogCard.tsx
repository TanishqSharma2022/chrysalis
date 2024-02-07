import Link from 'next/link';
import React from 'react'


const BlogCard = (blogCard: any) => {

  return (
    <>
    <Link href={`/blogs/${blogCard.blogCard.id}`}>
    <div className='cursor-pointer hover:shadow-lg py-12 md:p-6 relative border rounded-xl mt-12' >
        <div className='absolute right-12 -top-6 shadow-lg bg-black text-white font-bold p-2 '>
        <h1 className='font-mono uppercase text-sm'>{blogCard.blogCard.properties?.Category.multi_select[0].name}</h1>
        </div>
        <div className='grid grid-cols-1  md:grid-cols-3 gap-6'>
        <div className='col-span-2'>
                <h1 className='font-bold text-xl hover:underline'>
                { blogCard.blogCard.properties?.Blog.title[0]?.text.content}
                </h1>
                <br />
    <h4 className='font-light text-md'>{blogCard.blogCard.properties.Blog_subTitle.rich_text[0]?.text.content}</h4>
        </div>
        <img src={blogCard.blogCard.properties?.ThumbnailImage?.files[0].name} />
        </div>
    </div>
    </Link>
    </>
  )
}


export default BlogCard;