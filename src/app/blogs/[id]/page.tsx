"use client"

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import parse, { DOMNode, domToReact, Element } from 'html-react-parser';
import { useBlogById } from '@/hooks/useGetBlogs';
import LoadingSpinner from '@/components/Spinner';



const FullPage: React.FC = () => {
  const { id } = useParams();
  const Id = Number(id);
  const { data: blog, isLoading, error } = useBlogById(Id);
  const [parsedContent, setParsedContent] = useState<React.ReactNode>("");
  const BASE_URL = process.env.BASE_URL

  useEffect(() => {
    if (blog) {
      const options = {
        replace: ({ name, attribs, children }: any) => {
          if (name === 'a') {
            return (
              <a href={attribs.href} className="text-blue-500 underline">
                {domToReact(children, options)}
              </a>
            );
          }
        },
      };

      setParsedContent(parse(blog.content, options));
    }
  }, [blog]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !blog) {
    return <div>Error fetching blog post</div>;
  }

  return (
    <>
      <section
        className="md:mx-[95px] mt-36 h-[322px] mx-[34px] rounded-3xl overflow-hidden"
        style={{
          backgroundImage: `url('${BASE_URL}${blog.image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="md:mx-[95px] mx-[34px] rounded-3xl flex items-center justify-center md:py-[15px] py-5">
        <h1 className="text-[34px] text-left pt-3 font-semibold">
          {blog.title}
        </h1>
      </div>
      <div className="md:mx-[95px] pb-10 text-left mx-[34px] rounded-3xl">
        <div className="text-[18px] inline font-normal text-[#1E1E1E] opacity-90">
          {Array.isArray(parsedContent)
            ? parsedContent.map((element, index) => (
                <div key={index} className="mb-5">
                  {element}
                </div>
              ))
            : parsedContent}
        </div>
        <div className="pt-5 flex justify-center">
          <p className="text-[#000000] text-[10px] md:text-[15px] opacity-50">
            Written By: {blog.author} |{" "}
            {new Date(blog.date).toLocaleDateString()}
          </p>
        </div>
      </div>
    </>
  );
};

export default FullPage;
