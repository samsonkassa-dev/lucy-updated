"use client";

import { useDictionary } from "@/hooks/useDictionary";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

const SectionFive = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = searchParams.get("locale") || "en";


  const { getNestedValue, getDictionaryString } = useDictionary(locale);

  return (
    <>
      <section className="flex justify-center py-5 max-2xl:px-10">
        <div className="flex mx-auto text-center items-end ">
          <h3 className="font-indie font-extrabold lg:text-5xl md:text-4xl text-3xl self-center z-10 ">
            {getDictionaryString("sectionThreeTitle")}
          </h3>
          <div className="relative h-36 w-36 -ml-36 justify-self-end">
            <Image
              fill
              style={{ objectFit: "contain" }}
              alt=""
              src="/Vector (4).png"
            />
          </div>
        </div>
      </section>

      <section className="flex lg:pl-20 justify-between mx-auto">
        <div className="w-full flex flex-col max-lg:mb-32 max-lg:gap-y-10 lg:grid-cols-2 lg:grid">
          <div className="">
            <div className="w-full lg:block flex justify-center items-center">
              <div className=" flex flex-col sm:w-1/2  justify-center text-center my-10">
                <div className=" flex justify-center w-auto  h-20">
                  <div className=" w-full h-full relative">
                    <Image
                      className=""
                      fill
                      style={{ objectFit: "contain" }}
                      alt=""
                      src="/Group 53.png"
                    />
                  </div>
                </div>

                <h3 className="text-[24px] text-[#333333] font-semibold leading-tight mb-5 mt-2">
                  {getDictionaryString("sectionThreeComponents_ess_title")}
                </h3>
                <p className="">
                {getDictionaryString("sectionThreeComponents_ess_desc")}
                </p>
              </div>
            </div>
            <div className="w-full lg:block flex justify-center items-center">
              <div className=" flex flex-col sm:w-1/2 justify-center text-center my-10">
                <div className=" flex justify-center w-auto  h-20">
                  <div className=" w-full h-full relative">
                    <Image
                      className=""
                      fill
                      style={{ objectFit: "contain" }}
                      alt=""
                      src="/Group 54.png"
                    />
                  </div>
                </div>

                <h3 className="text-[24px] text-[#333333] font-semibold leading-tight mb-5 mt-2">
                {getDictionaryString("sectionThreeComponents_at_title")}
                </h3>
                <p className="">
                {getDictionaryString("sectionThreeComponents_at_desc")}
                </p>
              </div>
            </div>
            <div className="w-full lg:block flex justify-center items-center">
              <div className=" flex flex-col sm:w-1/2 justify-center text-center my-10">
                <div className=" flex justify-center w-auto  h-20">
                  <div className=" w-full h-full relative">
                    <Image
                      className=""
                      fill
                      style={{ objectFit: "contain" }}
                      alt=""
                      src="/Group 55.png"
                    />
                  </div>
                </div>

                <h3 className="text-[24px] text-[#333333] font-semibold leading-tight mb-5 mt-2">
                {getDictionaryString("sectionThreeComponents_nco_title")}
                </h3>
                <p className="">
                {getDictionaryString("sectionThreeComponents_nco_desc")}
                </p>
              </div>
            </div>
          </div>

          <div className=" relative flex justify-end">
            <img
              style={{ objectFit: "contain" }}
              alt=""
              src="/Group 60.png"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default SectionFive;
