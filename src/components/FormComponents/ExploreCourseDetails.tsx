"use client";

import React from "react";
import { toast, Toaster } from "react-hot-toast";
import { useFormContext } from "@/utils/FormContext";
import { useDictionary } from "@/hooks/useDictionary";
import { useSearchParams } from "next/navigation";

export default function ExploreCourseDetails() {
  const searchParams = useSearchParams();
  const locale = searchParams.get("locale") || "en";
  const { getDictionaryString } = useDictionary(locale);
  const { finalRecommendation, nextPage, prevPage } = useFormContext();

  const handleNext=()=>{
    console.log("prevvioouuus")
    nextPage()
  }

  const handlePrev=()=>{
    console.log("prevvioouuus")
    prevPage()
  }

  return (
    <>
      <div className="flex flex-col items-center mx-auto max-w-screen-md justify-center">
        {finalRecommendation?.map((recommendation, index) => (
          <div key={index} className="flex-col items-center mx-auto max-w-screen-md justify-center mt-8">
            <div className="flex flex-col md:flex-row gap-x-12 mx-auto items-center my-4">
              {/* left */}
              <div className="items-center justify-center h-auto mt-4">
                <img
                  src="/images/Vector.png"
                  alt="List icon"
                  className="w-245 h-29 -mb-9"
                />
                <h3 className="text-3xl font-black font-indie">
                  {recommendation.name}
                </h3>
                <div className="pb-2 w-335 justify-center items-center flex mt-6 mb-7">
                  <img
                    className="sm:w-[70%]"
                    style={{ objectFit: "contain" }}
                    alt=""
                    src={recommendation.images[0] ?? ""}
                  />
                </div>
                <div className="flex">
                  <h3 className="pb-2 font-semibold bg-yellow-2 w-115 h-33 mt-5 border-solid pl-5 pt-1 rounded-md">
                    {recommendation.gradeLevel}
                  </h3>
                  <h3 className="pb-2 font-semibold bg-yellow-2 w-36 h-33 mt-5 ml-8 border-solid pl-5 pt-1 rounded-md">
                    {getDictionaryString("registerPage_recommended_session")}
                  </h3>
                </div>
                <div className="flex">
                  <h3 className="pb-2 font-semibold bg-yellow-2 w-128 h-33 mt-6 border-solid pl-5 pt-1 rounded-md">
                    {getDictionaryString("registerPage_recommended_sessions")}
                  </h3>
                  <h3 className="pb-2 font-semibold bg-yellow-2 w-163 h-33 mt-6 ml-8 border-solid pl-5 pt-1 rounded-md">
                    {getDictionaryString("registerPage_recommended_moneyPerSession")}
                  </h3>
                </div>
                <h2 className="text-3xl w-232 font-bold text-left mb-0 mt-6">
                  {getDictionaryString("registerPage_recommended_skillsGained")}
                </h2>
                <div>
                  <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4">
                    {recommendation.skillsGained.map((skill: string, skillIndex: number) => (
                      <li className="flex items-start b-3 text-left text-lg capitalize" key={skillIndex}>
                        <img
                          src="/images/Icon.png"
                          alt="List icon"
                          className="w-5 h-5 mr-2 mt-1"
                        />
                        <span className="text-black">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* right */}
              <div className="mt-4">
                <p className="text-left text-xl font-normal">
                  {recommendation.description}
                </p>
                <ul className="mt-5 md:list-disc">
                  <p className="text-left mb-2 text-3xl font-bold">
                    {getDictionaryString("registerPage_PrerequisiteDesc")}
                  </p>
                  <li className="flex items-start b-3 text-left text-lg pb-3">
                    <img
                      src="/images/icon2.png"
                      alt="List icon"
                      className="w-5 h-5 mr-3 mt-1"
                    />
                    <span className="">
                      <p className="text-left">
                        {recommendation.prerequisite}
                      </p>
                    </span>
                  </li>
                </ul>
                <h2 className="text-left text-3xl font-bold mb-7 mt-4">
                  {getDictionaryString("registerPage_recommended_topicsCovered")}
                </h2>
                <ul className="mt-5 md:list-disc">
                  {recommendation.topicsCovered.map((topic: string, topicIndex: number) => (
                    <li className="flex items-start b-3 text-left text-lg pb-3 mt-1" key={topicIndex}>
                      <img
                        src="/images/Icon3.png"
                        alt="List icon"
                        className="w-5 h-5 mr-3"
                      />
                      <span className="text-black">{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
        <div className="flex items-center justify-center gap-x-32 my-4 w-full">
          <button
            className="bg-yellow w-245 h-48 border-solid rounded-md font-bold"
            onClick={handlePrev}
          >
            {getDictionaryString("registerPage_back")}
          </button>
          <button
            className="bg-yellow w-245 h-48 border-solid rounded-md font-bold"
            onClick={handleNext}
          >
            {getDictionaryString("registerPage_next")}
          </button>
        </div>
      </div>
      <Toaster />
    </>
  );
}
