"use client";

import { useDictionary } from "@/hooks/useDictionary";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

const SectionTwo = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = searchParams.get("locale") || "en";
  const { getNestedValue, getDictionaryString } = useDictionary(locale);


  return (
    <section className="flex justify-center py-5 md:mt-10 mx-6 sm:mx-8 md:mx-12 lg:mx-18">
      <div className="flex flex-col mx-auto text-center items-end w-full">
        <div className="flex mx-auto text-center items-end ">
          <h2 className="font-indie font-extrabold text-3xl lg:text-5xl self-center z-10 ">
            {getDictionaryString("sectionTwoTitle")}
          </h2>
          <div className="relative lg:h-10 lg:w-10 w-6 h-6 lg:-bottom-10 -bottom-5">
            <Image
              fill
              style={{ objectFit: "contain" }}
              alt=""
              src="/Vector (1).png"
            />
          </div>
        </div>

        <div className="lg:px-16 px-5 mt-8 lg:w-1/2 self-center ">
          <p className="">{getDictionaryString("sectionTwoDesc")}</p>
        </div>
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
    </section>
  );
};

export default SectionTwo;
