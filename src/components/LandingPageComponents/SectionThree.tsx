"use client";

import { useDictionary } from "@/hooks/useDictionary";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

const SectionThree = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = searchParams.get("locale") || "en";
  const dictionary = useDictionary(locale);

  const { getNestedValue, getDictionaryString } = useDictionary(locale);

  return (
    <section className="max-w-screen-2xl mt-16 mx-auto max-[1600px]:px-16">
      <div className="flex md:flex-row-reverse md:justify-between flex-col w-full my-10 md:h-96 items-center">
        <div className="mb-5 md:mb-0 md:w-1/2 w-full">
          <div className="flex flex-col justify-center">
            <h3 className="font-indie font-extrabold text-4xl md:w-1/2 z-10">
              {getDictionaryString("sectionTwoComponents_pl_title")}
            </h3>
            <div className="relative h-5 md:w-1/2 w-1/2 -mt-2">
              <Image
                fill
                style={{ objectFit: "fill" }}
                alt=""
                src="/Vector (2).png"
              />
            </div>
            <p className="text-lg text-[#333333] mt-10">
              {getDictionaryString("sectionTwoComponents_pl_desc")}
            </p>
            <div className="flex w-full justify-center mb-2  mt-7">
              <button
                type="button"
                onClick={() => {
                  router.push("/register");
                }}
                className="sm:py-3 py-2 px-9 sm:w-auto w-full font-semibold rounded bg-purple text-white cursor-pointer mr-2"
              >
                {getDictionaryString("getStarted")}
              </button>
            </div>
          </div>
        </div>
        <div className="flex">
          <img
            className="w-full max-h-96 object-contain self-start"
            alt=""
            src="/Group 108.png"
          />
        </div>
      </div>

      <div className="flex md:flex-row flex-col md:justify-between w-full my-10 md:h-96 items-center ">
        <div className="mb-5 md:mb-0 md:w-1/2">
          <div className="flex flex-col justify-center">
            <h3 className="font-indie font-extrabold text-4xl md:w-1/2 z-10">
              {getDictionaryString("sectionTwoComponents_sc_title")}
            </h3>
            <div className="relative h-5 md:w-1/2 w-1/2 -mt-2">
              <Image
                fill
                style={{ objectFit: "fill" }}
                alt=""
                src="/Vector (2).png"
              />
            </div>
            <p className="text-lg text-[#333333] mt-10">
              {getDictionaryString("sectionTwoComponents_sc_desc")}
            </p>
          </div>
        </div>
        <div className="flex">
          <img
            className="w-full max-h-96 object-contain self-end"
            alt=""
            src="/Group 159.png"
          />
        </div>
      </div>

      <div className="flex md:flex-row-reverse flex-col md:justify-between w-full my-10 md:h-96 items-center">
        <div className="mb-5 md:mb-0 md:w-1/2 w-full">
          <div className="flex flex-col justify-center">
            <h3 className="font-indie font-extrabold text-4xl md:w-1/2 z-10">
              {getDictionaryString("sectionTwoComponents_cr_title")}
            </h3>
            <div className="relative h-5 md:w-1/2 w-1/2 -mt-2">
              <Image
                fill
                style={{ objectFit: "fill" }}
                alt=""
                src="/Vector (2).png"
              />
            </div>
            <p className="text-lg text-[#333333] mt-10">
              {getDictionaryString("sectionTwoComponents_cr_desc")}
            </p>
            <div className="flex w-full justify-center mb-2  mt-7">
              <button
                type="button"
                onClick={() => {
                  router.push("/register");
                }}
                className="sm:py-3 py-2 px-9 sm:w-auto w-full font-semibold rounded bg-purple text-white cursor-pointer mr-2"
              >
                {getDictionaryString("register")}
              </button>
            </div>
          </div>
        </div>
        <div className="flex">
          <img
            className="w-full max-h-96 self-end"
            alt=""
            src="/Group 126.png"
          />
        </div>
      </div>

      <div className="flex md:flex-row flex-col md:justify-between w-full my-10 md:h-96 items-center ">
        <div className=" mb-5 md:mb-0 md:w-1/2">
          <div className="flex flex-col justify-center">
            <h3 className="font-indie font-extrabold text-4xl md:w-1/2 z-10">
              {getDictionaryString("sectionTwoComponents_lmc_title")}
            </h3>
            <div className="relative h-5 md:w-1/2 w-1/2 -mt-2">
              <Image
                fill
                style={{ objectFit: "fill" }}
                alt=""
                src="/Vector (2).png"
              />
            </div>
            <p className="text-lg text-[#333333] mt-10">
              {getDictionaryString("sectionTwoComponents_lmc_desc")}
            </p>
          </div>
        </div>
        <div className="flex">
          <img
            className="w-full max-h-96 object-contain self-end"
            alt=""
            src="/Group 130.png"
          />
        </div>
      </div>

      <div className="flex md:flex-row-reverse flex-col md:justify-between w-full my-10 md:h-96 items-center">
        <div className="mb-5 md:mb-0 md:w-1/2 w-full">
          <div className="flex flex-col justify-center">
            <h3 className="font-indie font-extrabold text-4xl md:w-1/2 z-10">
              {getDictionaryString("sectionTwoComponents_ps_title")}
            </h3>
            <div className="relative h-5 md:w-1/2 w-1/2 -mt-2">
              <Image
                fill
                style={{ objectFit: "fill" }}
                alt=""
                src="/Vector (2).png"
              />
            </div>
            <p className="text-lg text-[#333333] mt-10">
              {getDictionaryString("sectionTwoComponents_ps_desc")}
            </p>
          </div>
        </div>
        <div className="flex">
          <img
            className="w-full max-h-96 self-end"
            alt=""
            src="/Group 113.png"
          />
        </div>
      </div>

      <div className="flex md:flex-row flex-col md:justify-between w-full my-10 md:h-96 items-center ">
        <div className="mb-5 md:mb-0 md:w-1/2">
          <div className="flex flex-col justify-center">
            <h3 className="font-indie font-extrabold text-4xl md:w-1/2 z-10">
              {getDictionaryString("sectionTwoComponents_vclt_title")}
            </h3>
            <div className="relative h-5 md:w-1/2 w-1/2 -mt-2">
              <Image
                fill
                style={{ objectFit: "fill" }}
                alt=""
                src="/Vector (2).png"
              />
            </div>
            <p className="text-lg text-[#333333] mt-10">
              {getDictionaryString("sectionTwoComponents_vclt_desc")}
            </p>
            <div className="flex w-full justify-center mb-2  mt-7">
              <button
                type="button"
                onClick={() => {
                  router.push("/register");
                }}
                className="sm:py-3 py-2 px-9 sm:w-auto w-full font-semibold rounded bg-purple text-white cursor-pointer mr-2"
              >
                {getDictionaryString("register")}
              </button>
            </div>
          </div>
        </div>
        <div className="flex">
          <img className="w-full max-h-96 self-end" alt="" src="/Group 1.png" />
        </div>
      </div>
    </section>
  );
};

export default SectionThree;
