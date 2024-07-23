"use client"

import React, { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { CourseData, FInalRecommendation } from "@/types/type";
import { useFormContext } from "@/utils/FormContext";
import { useDictionary } from "@/hooks/useDictionary";
import { useSearchParams, useRouter } from "next/navigation";
import { useGetCourses } from "@/hooks/useGetAllCourse";
import { usePostCourse } from "@/hooks/usePostSaveCourse";
import Image from "next/image";
import LoadingSpinner from "../Spinner";

const FeaturedCourseCard = (props: { course: CourseData; titleColor: string }) => {
  const router = useRouter();
  const { setFinalRecommendation, setRecommendation } = useFormContext();
  
  const handleCardClick = (course: CourseData) => {
    setRecommendation(false)
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
      studentId: 0,
    };
    setFinalRecommendation([recommendation]);
    router.push("/register");
  };

  return (
    <div
      className="flex flex-col gap-2 bg-white rounded-xl shadow-2xl border border-cyan-950 max-w-[25rem] lg:h-[34rem] mx-5"
      onClick={() => handleCardClick(props.course)}
    >
      <div
        className={`flex flex-col py-8 lg:text-xl font-bold gap-2 justify-center items-center bg-opacity-20`}
        style={{
          backgroundColor: props.titleColor === "blue" ? "#0052B426" : "#FF70021A",
        }}
      >
        <h3
          className={`font-sans text-center text-${props.titleColor}`}
          style={{
            color: props.titleColor === "blue" ? "#0052B4FF" : "#FF7002FF",
          }}
        >
          {props.course?.name}
        </h3>
        <img src={props.course?.images[0]} alt="" className="w-1/3" />
      </div>
      <div className="p-4 text-center max-md:text-sm max-sm:text-xs font-sans">
        {props.course?.description}

        <h2 className="text-left max-md:text-md max-sm:text-sm font-extrabold -mb-2 mt-4 font-sans">
          {"Topics Covered"}
        </h2>
        <ul className="mt-5 md:list-disc">
          {props.course.topicsCovered.slice(0, 3).map((topic: string, index: number) => (
            <li className="flex items-center text-left text-lg pb-2 mt-1" key={index}>
              <img src="/featured_icon.svg" alt="List icon" className="w-5 h-5 mr-3" />
              <span className="text-black max-md:text-sm max-sm:text-xs">{topic}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const FeaturedCoursesSection = () => {
  const { data: courses, error, isLoading } = useGetCourses();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Error loading courses</div>;

  const firstThreeCourses = courses ? courses.slice(0, 3) : [];

  return (
    <>
      {firstThreeCourses.length > 0 && (
        <section className="h-auto featured-courses xl:py-16 py-24">
          <div className="">
            <div className="absolute xl:h-24 xl:w-24 w-16 h-16 lg:right-32 right-2 md:mt-[4rem] mt-40">
              <Image fill style={{ objectFit: "contain" }} alt="" src="/featured vector2.png" />
            </div>
            <div className="sm:self-center sm:justify-self-center max-lg:mt-8 flex flex-col items-center justify-center text-center ml-10 max-lg:ml-16">
              <div className="flex">
                <div className="relative lg:h-20 lg:w-20 w-16 h-16">
                  <Image fill style={{ objectFit: "contain" }} alt="" src="/featured vector.png" />
                </div>
                <h3 className="font-indie mt-10 lg:text-6xl text-5xl font-extrabold text-white z-10 text-left">
                  Featured Courses
                </h3>
              </div>
              <div className="relative h-7 w-1/3 ml-10 -mt-3">
                <Image fill style={{ objectFit: "fill" }} alt="" src="/Vector (3).png" />
              </div>
            </div>
            <div className="flex cursor-pointer justify-center lg:my-24 my-12 max-lg:mx-8 items-center gap-10 flex-wrap">
              {firstThreeCourses.map((course, index) => (
                <FeaturedCourseCard key={index} course={course} titleColor={index % 2 === 0 ? "blue" : "orange"} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default FeaturedCoursesSection;
