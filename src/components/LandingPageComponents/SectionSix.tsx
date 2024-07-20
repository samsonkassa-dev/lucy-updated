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
    <section className="flex justify-center py-5 lg:py-10 max-w-screen-2xl mx-auto">
      <div className="sm:rounded-[5rem] rounded-2xl bg-[#6743EE] w-full sm:flex justify-between overflow-hidden mx-5 md:mx-12 lg:mx-32">
        <div className="sm:w-56 w-32 -mt-10  sm:h-1/2 h-32 relative self-start justify-self-start">
          <Image
            className=""
            fill
            style={{ objectFit: "contain" }}
            alt=""
            src="/Group (1).png"
          />
        </div>
        <div className="sm:self-center sm:justify-self-center sm:-mt-0 flex flex-col items-center justify-center text-center mx-10">
          <h3 className="font-indie mt-10 lg:text-6xl text-4xl font-extrabold text-white z-10">
            {getDictionaryString("sectionFourTitle")}
          </h3>
          <div className="relative h-7 w-3/4 lg:-mt-7 -mt-5">
            <Image
              fill
              style={{ objectFit: "fill" }}
              alt=""
              src="/Vector (3).png"
            />
          </div>
          <p className="text-white my-5">
            {getDictionaryString("sectionFourDesc")}
          </p>
          <button
            type="button"
            onClick={() => {
              router.push("/register");
            }}
            className="py-2 px-10 mb-10 rounded bg-white text-[#6743EE] cursor-pointer text-sm font-semibold"
          >
            {getDictionaryString("register")}
          </button>
        </div>
        <div className=" w-32 sm:w-72 float-right -mr-10 -mb-10 sm:h-1/2  h-32 relative self-end justify-self-end">
          <Image
            className=""
            fill
            style={{ objectFit: "contain" }}
            alt=""
            src="/Group.png"
          />
        </div>
      </div>
    </section>
  );
};

export default SectionTwo;
