"use client";

import { useDictionary } from "@/hooks/useDictionary";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

const SectionTwo = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = searchParams.get("locale") || "en";
  const dictionary = useDictionary(locale);

  const { getNestedValue, getDictionaryString } = useDictionary(locale);

  return (
    <section className="flex justify-center items-center max-2xl:px-10 sm:mt-16 lg:mt-16">
      <div className="flex flex-wrap -mx-2 justify-center items-center">
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-4">
          <div className="bg-[#F5C143] h-56 flex flex-col justify-center items-center">
            <h1 className="text-center font-indie text-2xl relative mt-[-14px] ">
              {getDictionaryString("sectionSix_cardOneTitle")}
            </h1>
            <div className="relative h-4 md:w-1/2 w-3/4 mb-4 mt-[-6px]  ">
              <Image
                fill
                style={{ objectFit: "fill" }}
                alt=""
                src="/vector-purple.png"
              />
            </div>
            <p className="text-center px-4 text-monasans mt-2">
              {getDictionaryString("sectionSix_cardOneDesc")}
            </p>
          </div>
        </div>

        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-4 lg:mt-12">
          <div className="bg-[#9D88EE] h-56 flex flex-col py-4 justify-center items-center overflow-auto">
            <h1 className="text-center font-indie text-2xl relative">
              {getDictionaryString("sectionSix_cardThreeTitle")}
            </h1>
            <div className="relative h-4 md:w-1-2 w-3/4 mb-4 mt-[-6px] ">
              <Image
                fill
                style={{ objectFit: "fill" }}
                alt=""
                src="/Vector (11).png"
              />
            </div>
            <p className="text-center px-6 text-white text-sm">
              {getDictionaryString("sectionSix_cardThreeDesc")}
            </p>
          </div>
        </div>

        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-4">
          <div className="bg-[#F5C143] h-56 flex flex-col justify-center items-center">
            <h1 className="text-center font-indie text-2xl relative mt-[-20px] ">
              {getDictionaryString("sectionSix_cardTwoTitle")}
            </h1>
            <div className="relative h-4 md:w-1-2 w-3/4 mb-4 mt-[-6px] ">
              <Image
                fill
                style={{ objectFit: "fill" }}
                alt=""
                src="/vector-purple.png"
              />
            </div>
            <p className="text-center overflow-auto px-4 text-monasans">
              {getDictionaryString("sectionSix_cardTwoDesc")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionTwo;
