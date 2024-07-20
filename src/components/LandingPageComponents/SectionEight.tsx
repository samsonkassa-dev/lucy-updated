"use client";

import { useState } from "react";
import { useDictionary } from "@/hooks/useDictionary";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { DictionaryContent } from "@/types/type";

const SectionEight = () => {
  const [active, setActive] = useState<number | null>(null);
  const searchParams = useSearchParams();
  const locale = searchParams.get("locale") || "en";
  const { getNestedValue, getDictionaryString } = useDictionary(locale);

  const faqComponents = getNestedValue("sectionFiveComponents") as DictionaryContent[] | undefined;

  return (
    <section className="flex flex-col justify-center py-10 max-w-screen-2xl mx-auto px-10">
      <div className="flex flex-col sm:flex-row sm:mx-auto text-center">
        <h3 className="font-indie font-extrabold text-5xl self-center z-10">
          {getDictionaryString("sectionFiveTitle")}
        </h3>
        <div className="relative h-56 w-56 sm:-ml-56 -mt-32 sm:-mt-0 self-center justify-self-center">
          <Image
            fill
            style={{ objectFit: "contain" }}
            alt=""
            src="/Vector5.png"
          />
        </div>
      </div>
      {faqComponents && faqComponents.map((faq, index) => (
        <div key={index} className="w-full sm:px-20">
          <div
            className="border-b border-black/25 p-4 cursor-pointer"
            onClick={() => setActive(active === index ? null : index)}
          >
            <div className="flex justify-between w-full items-center">
              <h3 className="text-xl w-11/12">
                {typeof faq.question === "string" ? faq.question : ""}
              </h3>

              <svg
                className={`w-6 h-6 fill-current text-yellow transform ${
                  active !== index ? "" : "rotate-180"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M17.32 2.929a1 1 0 0 1 1.414 1.414L10 12.586 2.293 4.883a1 1 0 1 1 1.414-1.414l6.293 6.293 6.293-6.293a1 1 0 0 1 1.414 0z"
                />
              </svg>
            </div>
            {index === 4 ? (
              <div
                className={`transition-all duration-500 ease-in-out font-extralight mt-5 mr-20 ${
                  active === 4 ? "block" : "hidden"
                }`}
              >
                <p>{typeof faq.answer === "string" ? faq.answer : ""}</p>
                <ul className="list-disc ml-10 my-3">
                  {Array.isArray(faq.lists) &&
                  faq.lists.every((item) => typeof item === "string")
                    ? faq.lists.map((item: string, i: number) => (
                        <li key={i}>{item}</li>
                      ))
                    : null}
                </ul>

                <p>{typeof faq.answer2 === "string" ? faq.answer2 : ""}</p>
              </div>
            ) : (
              <p
                className={`transition-all duration-500 ease-in-out font-extralight mt-5 mr-20 ${
                  active === index ? "block" : "hidden"
                }`}
              >
                {typeof faq.answer === "string" ? faq.answer : ""}
              </p>
            )}
          </div>
        </div>
      ))}
    </section>
  );
};

export default SectionEight;
