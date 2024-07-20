"use client";

import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { CourseData, FInalRecommendation, MultiLangCourseData } from "@/types/type";
import { useFormContext } from "@/utils/FormContext";
import { useDictionary } from "@/hooks/useDictionary";
import { useSearchParams } from "next/navigation";
import { useGetCourses } from "@/hooks/useGetAllCourse";
import { useEffect } from "react";
import { usePostCourse } from "@/hooks/usePostSaveCourse";

export default function Recommended() {
  const { data: courses, error, isLoading } = useGetCourses();
  const searchParams = useSearchParams();
  const locale = searchParams.get("locale") || "en";
  const [recommendationArraysUpdated, setRecommendationArraysUpdated] = useState<boolean>(false);
  const { getDictionaryString } = useDictionary(locale);

  const { courseData, studentName, nextPage, setCourseData, finalRecommendation, setFinalRecommendation} = useFormContext();
  console.log(courseData);
  const [selectedStudentIndex, setSelectedStudentIndex] = useState(0);
  const [recommendationArrays, setRecommendationArrays] = useState(
    studentName.map((_, index) =>
      courseData?.[locale] ? courseData[locale][index] : null
    )
  );
  console.log(recommendationArrays);
  const [originalCourses, setOriginalCourses] = useState<(CourseData | null)[]>(
    studentName.map(() => null)
  );
  const [isExploreCourse, setIsExploreCourse] = useState(
    studentName.map(() => false)
  );

  useEffect(() => {
    if (courseData && courseData[locale]) {
      setRecommendationArrays(
        studentName.map((_, index) => courseData[locale][index] || null)
      );
    }
  }, [courseData, studentName, locale]);


  useEffect(() => {
    if (recommendationArraysUpdated) {
      if (selectedStudentIndex < studentName.length - 1) {
        setSelectedStudentIndex((prevIndex) => prevIndex + 1);
      } else {
        const formattedData = recommendationArrays
          .filter((course) => course !== null)
          .map((course) => ({
            studentId: course.studentId,
            courseId: course.id,
          }));
  
        (async () => {
          try {
            await toast.promise(postCourse(formattedData), {
              loading: "Saving...",
              success: "Saved successfully",
              error: "Error saving course details",
            });
            setFinalRecommendation(recommendationArrays as unknown as FInalRecommendation[]);
            nextPage();
          } catch (error) {
            console.error("Error posting course:", error);
          }
        })();
      }
  
      // Reset the flag
      setRecommendationArraysUpdated(false);
    }
  }, [recommendationArraysUpdated]);



  const handleCourseSelection = (index: number) => {
    setSelectedStudentIndex(index);
  };

  const handleCardClick = (course: CourseData) => {
    setOriginalCourses((prev) => {
      const newOriginalCourses = [...prev];
      if (!newOriginalCourses[selectedStudentIndex]) {
        newOriginalCourses[selectedStudentIndex] =
          recommendationArrays[selectedStudentIndex];
      }
      return newOriginalCourses;
    });

    setRecommendationArrays((prevArrays) => {
      const newArrays = [...prevArrays];
      newArrays[selectedStudentIndex] = {
        ...prevArrays[selectedStudentIndex],
        ...course,
      };
      return newArrays;
    });

    setIsExploreCourse((prev) => {
      const newIsExploreCourse = [...prev];
      newIsExploreCourse[selectedStudentIndex] = true;
      return newIsExploreCourse;
    });

    toast.success("Course details updated");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const { postCourse } = usePostCourse();

const handleNextClick = () => {
  if (courseData && locale !== "en") {
    const englishData = courseData["en"];
    setRecommendationArrays((prevArrays) => {
      const newArrays = [...prevArrays];
      englishData.forEach((course, index) => {
        if (course.studentId === prevArrays[index]?.studentId) {
          newArrays[index] = course;
        }
      });
      return newArrays;
    });
    setRecommendationArraysUpdated(true);
  } else {
    setRecommendationArraysUpdated(true);
  }
};
  
  
  

  return (
    <>
      <div className="flex flex-col items-center mx-auto max-w-screen-md justify-center">
        <h3 className="text-2xl text-center mx-auto font-normal mt-6">
          {getDictionaryString("registerPage_below")}{" "}
          {isExploreCourse[selectedStudentIndex] ? (
            <span className="">
              <span
                className="text-md text-purple cursor-pointer"
                onClick={() => {
                  setIsExploreCourse((prev) => {
                    const newIsExploreCourse = [...prev];
                    newIsExploreCourse[selectedStudentIndex] = false;
                    return newIsExploreCourse;
                  });
                  setRecommendationArrays((prevArrays) => {
                    const newArrays = [...prevArrays];
                    newArrays[selectedStudentIndex] =
                      originalCourses[selectedStudentIndex];
                    return newArrays;
                  });
                  setOriginalCourses((prev) => {
                    const newOriginalCourses = [...prev];
                    newOriginalCourses[selectedStudentIndex] = null;
                    return newOriginalCourses;
                  });
                  toast.success(
                    "You have switched back to the original recommended course"
                  );
                }}
              >
                {" "}
                {getDictionaryString("registerPage_click")}
                <br /> {getDictionaryString("registerPage_rec")}{" "}
              </span>
            </span>
          ) : (
            getDictionaryString("registerPage_course")
          )}{" "}
        </h3>
        <div className="flex flex-wrap justify-center mt-6">
          {studentName.map((name, index) => (
            <button
              key={index}
              className={`pb-2 w-115 h-30 text-gray-2 font-medium text-lg text-center mt-3 hover:text-black 
                ${
                  selectedStudentIndex === index
                    ? " text-black rounded-md bg-[#eedc82]"
                    : "border-none bg-white"
                }
                pt-1 focus:outline-none`}
              onClick={() => handleCourseSelection(index)}
            >
              {name}
            </button>
          ))}
        </div>
        {recommendationArrays[selectedStudentIndex] && (
          <div
            className={`flex-col items-center mx-auto max-w-screen-md justify-center mt-8`}
          >
            <div className="flex flex-col md:flex-row gap-x-12 mx-auto items-center my-4 ">
              {/* left */}
              <div className="items-center justify-center h-auto mt-4">
                <img
                  src="/images/Vector.png"
                  alt="List icon"
                  className="w-245 h-29 -mb-9"
                />
                <h3 className=" text-3xl font-black font-indie ">
                  {recommendationArrays[selectedStudentIndex].name}{" "}
                </h3>{" "}
                <div className="pb-2 w-335 justify-center items-center flex  mt-6 mb-7">
                  <img
                    className="sm:w-[70%] "
                    style={{ objectFit: "contain" }}
                    alt=""
                    src={
                      recommendationArrays[selectedStudentIndex].images[0] ?? ""
                    }
                  />
                </div>{" "}
                <div className="flex">
                  <h3 className="pb-2 font-semibold bg-yellow-2 w-115 h-33 mt-5  border-solid pl-5 pt-1 rounded-md">
                    {recommendationArrays[selectedStudentIndex].gradeLevel}{" "}
                  </h3>{" "}
                  <h3 className="pb-2 font-semibold bg-yellow-2 w-36 h-33 mt-5 ml-8 border-solid pl-5 pt-1 rounded-md">
                    {getDictionaryString("registerPage_recommended_session")}{" "}
                  </h3>{" "}
                </div>{" "}
                <div className="flex">
                  <h3 className="pb-2 font-semibold bg-yellow-2 w-128 h-33 mt-6 border-solid pl-5 pt-1 rounded-md ">
                    {getDictionaryString("registerPage_recommended_sessions")}{" "}
                  </h3>{" "}
                  <h3 className="pb-2 font-semibold  bg-yellow-2 w-163 h-33 mt-6 ml-8 border-solid pl-5 pt-1 rounded-md">
                    {getDictionaryString(
                      "registerPage_recommended_moneyPerSession"
                    )}{" "}
                  </h3>{" "}
                </div>
                <h2 className="text-3xl w-232 font-bold text-left mb-0 mt-6 ">
                  {getDictionaryString("registerPage_recommended_skillsGained")}{" "}
                </h2>{" "}
                <div className="">
                  <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4">
                    {recommendationArrays[
                      selectedStudentIndex
                    ].skillsGained?.map((skill: string, index: number) => (
                      <li
                        className="flex items-start b-3 text-left text-lg capitalize"
                        key={index}
                      >
                        <img
                          src="/images/Icon.png"
                          alt="List icon"
                          className="w-5 h-5 mr-2 mt-1"
                        />
                        <span className="text-black"> {skill} </span>
                      </li>
                    ))}{" "}
                  </ul>{" "}
                </div>{" "}
              </div>
              {/* right */}{" "}
              <div className=" mt-4 ">
                <p className="text-left text-xl font-normal ">
                  {recommendationArrays[selectedStudentIndex].description}{" "}
                </p>{" "}
                <ul className="mt-5 md:list-disc">
                  <p className="text-left mb-2 text-3xl font-bold ">
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
                        {
                          recommendationArrays[selectedStudentIndex]
                            .prerequisite
                        }
                      </p>
                    </span>
                  </li>
                </ul>
                <h2 className="text-left text-3xl font-bold mb-7 mt-4">
                  {getDictionaryString(
                    "registerPage_recommended_topicsCovered"
                  )}{" "}
                </h2>{" "}
                <ul className="mt-5 md:list-disc">
                  {recommendationArrays[selectedStudentIndex].topicsCovered.map(
                    (topic: string, index: number) => (
                      <li
                        className="flex items-start b-3 text-left text-lg pb-3 mt-1"
                        key={index}
                      >
                        <img
                          src="/images/Icon3.png"
                          alt="List icon"
                          className="w-5 h-5 mr-3"
                        />
                        <span className="text-black">{topic}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>{" "}
            </div>{" "}
          </div>
        )}
        <div className="flex items-center justify-center gap-x-32 my-4 w-full">
          <button
            className="bg-yellow w-245 h-48 border-solid rounded-md font-bold"
            onClick={() =>
              setSelectedStudentIndex((prevIndex) => prevIndex - 1)
            }
            disabled={selectedStudentIndex === 0}
          >
            {getDictionaryString("registerPage_back")}{" "}
          </button>{" "}
          <button
            className="bg-yellow w-245 h-48 border-solid rounded-md font-bold"
            onClick={handleNextClick}
          >
            {getDictionaryString("registerPage_next")}
          </button>{" "}
        </div>{" "}
      </div>
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
