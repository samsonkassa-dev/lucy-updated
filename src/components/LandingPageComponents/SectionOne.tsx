"use client"

import Dialog from "@/components/LandingPageComponents/DialogQandA";
import { useDictionary } from "@/hooks/useDictionary";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

const SectionOne = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const searchParams = useSearchParams();
  const locale = searchParams.get("locale") || "en";
  const dictionary = useDictionary(locale);

  const { getNestedValue, getDictionaryString } = useDictionary(locale);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (


    <section className="flex justify-center min-h-screen mt-24 mx-6 sm:mx-8 md:mx-12 lg:mx-18">
      <div className=" h-full flex flex-col lg:flex-row justify-between items-center w-full">
        <div className="w-full lg:h-full lg:mb-0  ">
          <div className="flex flex-wrap ">
            <div className=" ">
              <div className=" lg:mb-5 w-full h-40  lg:h-32">
                <div className=" md:w-3/5 w-full -z-10 h-full relative left-0">
                  <Image
                    className=""
                    fill
                    style={{ objectFit: "contain" }}
                    alt=""
                    src="/Vector (5).png"
                  />
                </div>
                <h1
                  className={`lg:-mt-[5rem] -mt-24 ml-4 font-indie z-10 font-bold ${
                    locale === "am"
                      ? "lg:text-4xl text-xl"
                      : "lg:text-5xl text-2xl"
                  }  w-full`}
                >
                  {getDictionaryString("headerTitle")}
                </h1>
              </div>

              <h2 className="lg:text-2xl  text-[#333333] leading-tight">
                {getDictionaryString("headerSubtitle")}
              </h2>
            </div>
          </div>
          <div className="flex w-full justify-center mb-2 md:justify-start mt-7">
            <button
              type="button"
              onClick={() => {
                router.push("/form");
              }}
              className="sm:py-4 py-2 px-10 sm:w-auto w-full font-semibold rounded bg-purple text-white cursor-pointer mr-2"
            >
              {getDictionaryString("register")}
            </button>
          </div>

          <div className="flex items-center mt-7 flex-wrap">
            <Image
              src="images/calendar-stats.svg"
              alt=""
              width={30}
              height={30}
              className="inline-block mr-2"
              style={{
                color: "#FFC000",
              }}
            />
            {getDictionaryString("help")} &nbsp;
            <span
              onClick={() => setIsModalOpen(true)}
              className="lg:text-md  text-[#FFC000] leading-tight  cursor-pointer"
            >
              {getDictionaryString("click")}
            </span>
            &nbsp; {getDictionaryString("toregister")}
          </div>
        </div>
        <Dialog isModalOpen={isModalOpen} closeModal={closeModal} />

        <div className="lg:block -ml-40 -mr-40 relative h-[50vh] lg:h-screen w-full">
          <Image
            fill
            style={{ objectFit: `contain` }}
            alt=""
            src="/heroBG.png"
            priority
          />
        </div>
      </div>
    </section>
  
  );
};

export default SectionOne;
