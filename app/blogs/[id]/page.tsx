const fetchfromNotion = async (id: string) => {
  console.log(id);
  const res = await fetch(
    `http://localhost:3000/api/blogContent?pageId=${id}`,
    { next: { revalidate: 1 } }
  );
  const data = await res.json();
  return data.data;
};

export default async function BlogPost({ params }: { params: { id: string } }) {
  const data = await fetchfromNotion(params.id);

  return (
    <>
      <div className="w-full flex justify-center h-full">
        <div className="w-[50%] h-full">
          {data.length == 0 && "Loading..."}
          <div className="w-full border h-full">
            {data &&
              data.map((blog: any) => {
                return (
                  <div key={blog.id}>
                    {blog.type == "heading_1" && (
                      <h1 className="font-sans font-bold text-4xl ">
                        {blog.heading_1.rich_text[0]?.text.content}
                      </h1>
                    )}
                    {blog.type == "heading_2" && (
                      <h1 className="font-sans font-bold text-xl ">
                        {blog.heading_2.rich_text[0]?.text.content}
                      </h1>
                    )}
                    {blog.type == "bulleted_list_item" && (
                      <li className="font-sans text-xl ">
                        {blog.bulleted_list_item.rich_text.map((lines: any) => {
                          return (
                            <a
                              href={lines.text.link?.url || ""}
                              key={lines.text.content}
                              className={`font-sans text-xl 
                        ${lines.annotations.italic ? "italic" : ""}
                        ${lines.annotations.bold ? "font-bold" : ""}
                        ${
                          lines.annotations.underline || lines.text.link?.url
                            ? "underline"
                            : ""
                        }
                        ${lines.annotations.strikethrough ? "line-through" : ""}
                        ${
                          lines.annotations.color != "default"
                            ? `text-${lines.annotations.color}`
                            : ""
                        }
                        
                        
                        
                        `}
                            >
                              {lines.text.content}
                            </a>
                          );
                        })}
                      </li>
                    )}
                    {blog.type == "quote" && (
                      <blockquote className="p-4 my-4 border-s-4 border-gray-300 bg-gray-50">
                        <a
                          key={blog.quote.rich_text[0]}
                          className="text-xl italic font-medium leading-relaxed"
                        >
                          `{blog.quote.rich_text[0].text.content}`
                        </a>
                      </blockquote>
                    )}
                    {blog.type == "video" && (
                      <iframe
                        className="min-w-full w-full  aspect-[16/9] object-contain"
                        src={blog.video.external.url}
                      ></iframe>
                    )}
                    {blog.type == "image" && (
                      <img
                        className="min-w-full w-full  aspect-[16/9] object-contain"
                        src={blog.image.file?.url || blog.image.external?.url}
                      />
                    )}

                    {blog.type == "paragraph" &&
                    blog.paragraph.rich_text.length != 0 ? (
                      blog.paragraph.rich_text.map((lines: any) => {
                        return (
                          <a
                            href={lines.text.link?.url || ""}
                            key={lines.text.content}
                            className={`font-sans text-xl 
                        ${lines.annotations.italic ? "italic" : ""}
                        ${lines.annotations.bold ? "font-bold" : ""}
                        ${
                          lines.annotations.underline || lines.text.link?.url
                            ? "underline"
                            : ""
                        }
                        ${lines.annotations.strikethrough ? "line-through" : ""}
                        ${
                          lines.annotations.color != "default"
                            ? `text-${lines.annotations.color}-500`
                            : ""
                        }
                        
                        
                        
                        `}
                          >
                            {lines.text.content}
                          </a>
                        );
                      })
                    ) : (
                      <br />
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
