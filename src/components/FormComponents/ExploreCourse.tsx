"use client";

import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { CourseData, FInalRecommendation } from "@/types/type";
import { useFormContext } from "@/utils/FormContext";
import { useDictionary } from "@/hooks/useDictionary";
import { useSearchParams } from "next/navigation";
import { useGetCourses } from "@/hooks/useGetAllCourse";
import { useEffect } from "react";
import { usePostCourse } from "@/hooks/usePostSaveCourse";
import LoadingSpinner from "../Spinner";

export default function ExploreCourse() {
  const { data: courses, error, isLoading } = useGetCourses();
  const searchParams = useSearchParams();
  const locale = searchParams.get("locale") || "en";

  const { getDictionaryString } = useDictionary(locale);
  const { courseData, studentName, nextPage, finalRecommendation, setFinalRecommendation} = useFormContext();

  useEffect(() => {
    if (finalRecommendation && finalRecommendation.length > 0) {
      nextPage();
    }
  }, [finalRecommendation]);



  const handleCardClick = (course: CourseData) => {
    const recommendation: FInalRecommendation = {
      id: course.id,
      name: course.name,
      description: course.description,
      images: course.images,
      prices: course.prices,
      topicsCovered: course.topicsCovered,
      skillsGained: course.skillsGained,
      category: course.category,
      gradeLevel: course.gradeLevel,
      prerequisite: course.prerequisite,
      codingLevel: course.codingLevel,
      language: course?.language || "",
      studentId: 0 
    };
    setFinalRecommendation([recommendation])
    nextPage()
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

if(isLoading){
  return (<LoadingSpinner/>)
}

  return (
    <>
      <section className="flex flex-col justify-center py-10">
        <div className="sm:self-center sm:justify-self-center sm:-mt-0 flex flex-col items-center justify-center text-center mx-10">
          <h3 className="font-indie lg:text-4xl text-3xl font-extrabold text-black">
            {getDictionaryString("registerPage_explore")}
          </h3>
          <div className="flex pb-10 justify-center sm:-mt-16 -mt-10 ">
            <img
              className="sm:w-[70%] "
              style={{ objectFit: "contain" }}
              alt=""
              src="/explore1.png"
            />
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1  gap-4">
            {courses?.map((course: CourseData) => (
              <button
                key={course.id}
                className="max-w-sm bg-white rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 hover:border-yellow"
                onClick={() => handleCardClick(course)}
              >
                <div style={{ height: "200px" }}>
                  <img
                    className="w-full rounded-t-lg"
                    style={{ objectFit: "contain", maxHeight: "100%" }}
                    src={course.images[0]}
                    alt={course.name}
                  />
                </div>
                <div className="p-2 flex-grow">
                  <h3 className=" text-center text-gray-900 font-bold  text-lg mb-3 mt-3">
                    {course.name}
                  </h3>
                  <p className="mb-3 font-normal text-sm text-gray-700 dark:text-gray-400">
                    {course.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
        <Toaster />
      </section>
    </>
  );
}
