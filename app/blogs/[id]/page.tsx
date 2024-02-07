

const fetchfromNotion = async(id:string) => {
    console.log(id)
    const res = await fetch(`http://localhost:3000/api/blogContent?pageId=${id}`, {next: {revalidate: 1}});
    const data = await res.json();
    return data.data
  }


export default async function BlogPost({ params }: { params: { id: string } }) {

    const data = await fetchfromNotion(params.id);


    return (
    <>
    <div className="w-full flex justify-center h-full">
        <div className="w-[50%] h-full">
            My Post: {params.id}
            {data.length == 0 && "Loading..."}
<div className="w-full border h-full">
      {data && data.map((blog:any) => {
        return(
          <div key={blog.id}>
            {blog.type == "heading_1" && <h1 className="font-sans font-bold text-4xl ">{blog.heading_1.rich_text[0]?.text.content}</h1>}
            {blog.type == "heading_2" && <h1 className="font-sans font-bold text-xl ">{blog.heading_2.rich_text[0]?.text.content}</h1>}
            {blog.type == "bulleted_list_item" && 
            <li className="font-sans text-xl ">
                {/* {blog.bulleted_list_item.rich_text[0]?.text.content} */}
                {blog.bulleted_list_item.rich_text.map((lines:any) => {
                return(
                        <a
                        href={lines.text.link?.url || ''}
                        key={lines.text.content}
                        className={`font-sans text-xl 
                        ${lines.annotations.italic ? 'italic': ''}
                        ${lines.annotations.bold ? 'font-bold': ''}
                        ${lines.annotations.underline || lines.text.link?.url ? 'underline': ''}
                        ${lines.annotations.strikethrough ? 'line-through': ''}
                        ${lines.annotations.color != 'default' ? `text-${lines.annotations.color}`: ''}
                        
                        
                        
                        `}>
                            {lines.text.content}
                        </a>        

                )

            })}
                </li>}
            {blog.type == "quote" && 
            <blockquote  className="p-4 my-4 border-s-4 border-gray-300 bg-gray-50">
            {/* {blog.quote.rich_text.map((lines:any) => {
                return( */}
                    <a key={blog.quote.rich_text[0]} className="text-xl italic font-medium leading-relaxed">
                        `{blog.quote.rich_text[0].text.content}`
                    </a>
                {/* )
            })} */}

            </blockquote>}
            {blog.type == "video" && <iframe className="min-w-full w-full  aspect-[16/9] object-contain" src={blog.video.external.url}></iframe>}
            {blog.type == "image" && <img className="min-w-full w-full  aspect-[16/9] object-contain"   src={blog.image.file?.url || blog.image.external?.url} />}




            {blog.type == "paragraph" && blog.paragraph.rich_text.length != 0 ?
            blog.paragraph.rich_text.map((lines:any) => {
                return(
                        <a
                        href={lines.text.link?.url || ''}
                        key={lines.text.content}
                        className={`font-sans text-xl 
                        ${lines.annotations.italic ? 'italic': ''}
                        ${lines.annotations.bold ? 'font-bold': ''}
                        ${lines.annotations.underline || lines.text.link?.url ? 'underline': ''}
                        ${lines.annotations.strikethrough ? 'line-through': ''}
                        ${lines.annotations.color != 'default' ? `text-${lines.annotations.color}-500`: ''}
                        
                        
                        
                        `}>
                            {lines.text.content}
                        </a>        

                )

            })
        : <br />
        }


{/* {blog.type == "paragraph" && !blog.paragraph.rich_text.length ? "" */}
            
          </div>
        )
      })}
      </div>



            {/* {data && JSON.stringify(data, null, 2)} */}


        </div>
        </div>
    </>
    )
}




// \\\\\\\\\\\\\\\\\\\\\\\

































// "use client"





















// import { useEffect, useState } from "react"

// export default function BlogPost({ params }: { params: { id: string } }) {
//     const [data, setData] = useState([]);
//     useEffect(() => {

//         async function getBlog(){
//             const res = await fetch(`http://localhost:3000/api/blogContent?pageId=${params.id}`);
//             const data = await res.json();
//             setData(data.data)
//             console.log(data.data)
//         }
//         getBlog();

//     }, [])


//     return (
//     <>
//     <div className="w-full flex justify-center h-full">
//         <div className="w-[60%] h-full">
//             My Post: {params.id}
//             {data.length == 0 && "Loading..."}
// <div className="w-full border h-full">
//       {data && data.map((blog:any) => {
//         return(
//           <div key={blog.id}>
//             {blog.type == "heading_1" && <h1 className="font-sans font-bold text-3xl ">{blog.heading_1.rich_text[0]?.text.content}</h1>}
//             {blog.type == "heading_2" && <h1 className="font-sans text-xl ">{blog.heading_2.rich_text[0]?.text.content}</h1>}
//             {blog.type == "bulleted_list_item" && <li className="font-sans text-xl ">{blog.bulleted_list_item.rich_text[0]?.text.content}</li>}
//             {blog.type == "quote" && 
//             <blockquote className="p-4 my-4 border-s-4 border-gray-300 bg-gray-50">
//                 <p className="text-xl italic font-medium leading-relaxed text-gray-900 dark:text-white">"{blog.quote.rich_text[0]?.text.content}"</p>
//             </blockquote>}
//             {blog.type == "video" && <iframe src={blog.video.external.url}></iframe>}
//             {/* {blog.type == "image" && <img className="min-w-full"  src={blog.image.file.url} />} */}




//             {blog.type == "paragraph" && <p className="font-sans text-xl ">{blog.paragraph.rich_text[0]?.text.content}</p>}
//           </div>
//         )
//       })}
//       </div>



//             {data && JSON.stringify(data, null, 2)}


//         </div>
//         </div>
//     </>
//     )
// }