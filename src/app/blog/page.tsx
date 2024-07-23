"use client"
import React from 'react';
import { useBlogs } from '@/hooks/useGetBlogOverview';
import Image from 'next/image';
import Link from 'next/link';
import LoadingSpinner from '@/components/Spinner';
import { toast, Toaster } from "react-hot-toast";

const BlogOverviewPage: React.FC = () => {
  const { data: blogs, isLoading, error } = useBlogs();

  const BASE_URL = process.env.BASE_URL;

  if (isLoading) {
    return <LoadingSpinner/>;
  }

  if (error) {
    toast.error("Error Fetching Blogs!")
    return <LoadingSpinner/>;
  }

  const highPriorityBlogs = blogs?.filter((blog: { priority: string; }) => blog.priority === "High") || [];
  const otherBlogs = blogs?.filter((blog: { priority: string; }) => blog.priority !== "High") || [];

  return (
    <>
      <section className="md:mx-[75px] mx-[30px] mt-36 bg-[#6743EEB2] rounded-3xl relative">
        <div className="absolute left-0 md:top-0 md:w-[0%] w-[40%] md:h-[100%] h-[22%] lg:w-[209px] lg:h-[170px] rounded-3xl overflow-hidden">
          <Image
            src="/GroupBlogLeft.svg"
            alt="Background Image Left"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>

        <div className="absolute right-0 bottom-0 md:top-0 w-[40%] md:h-[100%] h-[22%] md:w-[0%] lg:w-[209px] lg:h-[170px] rounded-3xl overflow-hidden">
          <Image
            src="/GroupRightBlog.svg"
            alt="Background Image Right"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="flex items-center justify-center md:py-[37px] py-20">
          <div className="relative lg:h-10 lg:w-10 w-6 h-6 lg:-top-6 -top-5 hidden lg:block">
            <Image
              fill
              style={{ objectFit: "contain" }}
              alt=""
              src="/VectorBlogLeft.png"
            />
          </div>
          <h1 className="text-center font-indie text-white px-10 lg:px-0 text-[64px] font-bold">
            Welcome to our Blog
          </h1>
          <div className="relative lg:h-10 lg:w-10 w-6 h-6 lg:-top-6 -top-5 hidden lg:block">
            <Image
              fill
              style={{ objectFit: "contain" }}
              alt=""
              src="/VectorBlogRight.png"
            />
          </div>
        </div>
      </section>

      {highPriorityBlogs[0] && (
        <section className="md:mx-[95px] mb-10 mx-[34px] mt-12 rounded-3xl relative">
          <div className="md:flex w-full gap-12">
            <div className="md:w-[50%]">
              <Image
                src={`${BASE_URL}${highPriorityBlogs[0].image}`}
                alt="Blog One"
                width={592}
                height={364}
                style={{ objectFit: "contain" }}
                className="rounded-3xl"
              />
            </div>
            <div className="md:w-[50%] flex flex-col justify-center text-center md:text-left">
              <h1 className="text-[34px] py-3 font-semibold">
                {highPriorityBlogs[0].title}
              </h1>
              <p className="text-[18px] text-[#1E1E1E] opacity-95">
                {highPriorityBlogs[0].content}
              </p>
              <div className="py-8 flex justify-between">
                <p className="text-[#000000] text-[10px] md:text-[15px] opacity-50">
                  Written By: {highPriorityBlogs[0].author} |{" "}
                  {new Date(highPriorityBlogs[0].date).toLocaleDateString()}
                </p>
                <div className="md:text-[16px] text-[10px] text-[#6743EE] font-semibold cursor-pointer">
                  <Link href={`/blogs/${highPriorityBlogs[0].id}`}>
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="md:mx-[95px] mb-64 mx-[34px] mt-12 rounded-3xl relative md:grid md:grid-cols-2 md:gap-20">
        {otherBlogs &&
          otherBlogs.length > 0 &&
          otherBlogs.map((blog: { image: any; title: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; content: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; author: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; date: string | number | Date; id: any; }, index: React.Key | null | undefined) => (
            <div key={index} className="">
              <section className="rounded-3xl w-full">
                <div className="w-full h-[364px] relative">
                  <Image
                    src={`${BASE_URL}${blog.image}`}
                    alt="Blog One"
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-3xl"
                  />
                </div>
                <div className="w-full flex flex-col justify-center text-center md:text-left">
                  <h1 className="text-[34px] py-3 font-semibold">
                    {blog.title}
                  </h1>
                  <p className="text-[18px] text-[#1E1E1E] opacity-95">
                    {blog.content}
                  </p>
                  <div className="py-8 flex justify-between">
                    <p className="text-[#000000] text-[10px] md:text-[15px] opacity-50">
                      Written By: {blog.author} |{" "}
                      {new Date(blog.date).toLocaleDateString()}
                    </p>
                    <div className="md:text-[16px] text-[10px] text-[#6743EE] font-semibold cursor-pointer">
                      <Link href={`/blogs/${blog.id}`}>Read More</Link>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          ))}
      </div>
      <Toaster/>
    </>
  );
};

export default BlogOverviewPage;
