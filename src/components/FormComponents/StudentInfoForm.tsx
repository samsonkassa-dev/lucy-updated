"use client"


import React, { useState, useEffect } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast, Toaster } from "react-hot-toast";
import { usePostStudent} from "@/hooks/usePostStudent";
import { useFormContext } from "@/utils/FormContext";
import { StudentData } from "@/types/type";
import { useSearchParams } from "next/navigation";
import { useDictionary } from "@/hooks/useDictionary";
import { usePostStudentOnly } from "@/hooks/usePostStudentOnly";



interface FormData {
  Students: StudentData[];
}


const StudentInfoForm: React.FC= () => {
  const { parentId, prevPage, nextPage, setStudentName, recommendation } = useFormContext();
  // console.log(parentId)
  const [loading, setLoading] = useState(false);
  const [showInterest, setShowInterest] = useState<{ showInterestField: boolean; showInterestExperiance: boolean }[]>([]);
  const {
    control,
    handleSubmit,
    register,
    reset,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      Students: [
        {
          FirstName: "",
          LastName: "",
          Grade: "",
          codingLevel: "",
          interest: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "Students",
  })

  const searchParams = useSearchParams();
  const locale = searchParams.get("locale") || "en";
  const dictionary = useDictionary(locale);

  const { getNestedValue, getDictionaryString } = useDictionary(locale);

  useEffect(() => {
    if (fields.length > showInterest.length) {
      setShowInterest((prevShowInterest) => [
        ...prevShowInterest,
        { showInterestField: false, showInterestExperiance: false },
      ]);
    } else if (fields.length < showInterest.length) {
      setShowInterest((prevShowInterest) => prevShowInterest.slice(0, fields.length));
    }
  }, [fields, showInterest.length]);

  const handleAddStudent = () => {
    append({
      FirstName: "",
      LastName: "",
      Grade: "",
      codingLevel: "",
      interest:"",
    });
    setShowInterest((prevShowInterest) => [
      ...prevShowInterest,
      { showInterestField: false, showInterestExperiance: false },
    ]);
  };

  const handleStudentDeletion = (index: number) => {
    remove(index);
  };


  const {postStudent} = usePostStudent();
  const {postStudentNoRecommendation} = usePostStudentOnly();





  const handleNext: SubmitHandler<FormData> = async (data) => {
    const formattedData = data.Students.map((student) => ({
      ...student,
      parentId: parentId || null,
    }));

   const studentNames = formattedData.map((student)=> student.FirstName)
   setStudentName(studentNames)
  //  console.log(studentName)
   

  if (!recommendation) {
    try {
      const response = await toast.promise(postStudentNoRecommendation(formattedData, parentId), {
        loading: "Registering user",
        success: "Success",
        error: "something went wrong",
      });
  
      nextPage();
    } catch (error) {
      setLoading(false);
    }
  } else {
    try {
      const response = await toast.promise(postStudent(formattedData, parentId), {
        loading: "Registering user",
        success: "Success",
        error: "something went wrong",
      });
  
      nextPage();
    } catch (error) {
      setLoading(false);
    }
  }
  
    
    
  };

  return (
    <div className="flex flex-row items-center justify-center">
      <form
        className="flex flex-col items-center justify-center"
        onSubmit={handleSubmit(handleNext)}
      >
        <h2 className="text-lg pt-16 md:text-2xl pb-7 font-bold">
          {getDictionaryString("registerPage_studentComponent_title")}
        </h2>

        {fields.map((item, index) => (
          <div
            key={index}
            className="flex lg:flex-row md:px-10 flex-col w-full"
          >
            <div className="flex flex-col items-start mx-2 pb-2">
              <label className="font-bold">
                {getDictionaryString("registerPage_studentComponent_name")}
              </label>
              <div className="flex w-full lg:w-auto flex-col">
                <input
                  className="border border-black/10 rounded p-2"
                  type="text"
                  placeholder={getDictionaryString(
                    "registerPage_studentComponent_name"
                  )}
                  {...register(`Students.${index}.FirstName`, {
                    required: "First name is required",
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name={`Students.${index}.FirstName`}
                  render={({ message }) => (
                    <p className="text-xs italic text-red-600">{message}</p>
                  )}
                />
              </div>
            </div>
            <div className="flex flex-col items-start mx-2 pb-2">
              <label className="font-bold">
                {getDictionaryString("registerPage_studentComponent_lastName")}
              </label>
              <div className="flex flex-col w-full lg:w-auto">
                <input
                  className="border border-black/10 rounded p-2"
                  type="text"
                  placeholder={getDictionaryString(
                    "registerPage_studentComponent_lastName"
                  )}
                  {...register(`Students.${index}.LastName`, {
                    required: "Last name is required",
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name={`Students.${index}.LastName`}
                  render={({ message }) => (
                    <p className="text-xs italic text-red-600">{message}</p>
                  )}
                />
              </div>
            </div>
            <div className="flex flex-col items-start mx-2 pb-2">
              <label className="font-bold">
                {getDictionaryString("registerPage_studentComponent_grade")}
              </label>
              <div className="flex flex-col w-full lg:w-auto">
                <select
                  className="border text-[#667085] bg-white h-11 border-black/10 rounded p-2"
                  {...register(`Students.${index}.Grade`, {
                    required: "Grade level is required",
                  })}
                  onChange={(e) => {
                    const selectedGrade = e.target.value;
                    setShowInterest(
                      showInterest.map((item, i) =>
                        i === index
                          ? {
                              ...item,
                              showInterestField: [
                                "Grade 2-4",
                                "Grade 5-8",
                                "Grade 9-12",
                              ].includes(selectedGrade),
                            }
                          : item
                      )
                    );
                  }}
                  defaultValue=""
                >
                  <option className="bg-black/10" disabled>
                    {getDictionaryString(
                      "registerPage_studentComponent_grades_default"
                    )}
                  </option>
                  <option className="bg-white" value="Grade 2-4">
                    {getDictionaryString(
                      "registerPage_studentComponent_grades[1]"
                    )}
                  </option>
                  <option className="bg-white" value="Grade 5-8">
                    {getDictionaryString(
                      "registerPage_studentComponent_grades[2]"
                    )}
                  </option>
                  <option className="bg-white" value="Grade 9-12">
                    {getDictionaryString(
                      "registerPage_studentComponent_grades[3]"
                    )}
                  </option>
                </select>
                <ErrorMessage
                  errors={errors}
                  name={`Students.${index}.Grade`}
                  render={({ message }) => (
                    <p className="text-xs italic text-red-600">{message}</p>
                  )}
                />
              </div>
            </div>
            <div className="flex flex-col items-start mx-2 pb-2">
              <label className="font-bold">
                {getDictionaryString("registerPage_studentComponent_codingXP")}
              </label>
              <div className="flex flex-col w-full lg:w-auto">
                <select
                  className="border text-[#667085] bg-white h-11 border-black/10 rounded p-2"
                  {...register(`Students.${index}.codingLevel`, {
                    required: "Coding experience is required",
                  })}
                  onChange={(e) => {
                    const selectedExperiance = e.target.value;
                    setShowInterest(
                      showInterest.map((item, i) =>
                        i === index
                          ? {
                              ...item,
                              showInterestExperiance:
                                selectedExperiance === "Beginner-Level",
                            }
                          : item
                      )
                    );
                  }}
                  defaultValue=""
                >
                  <option className="bg-black/10" disabled>
                    {getDictionaryString(
                      "registerPage_studentComponent_codingXPs_title"
                    )}
                  </option>
                  <option className="bg-white" value="No-Experiance">
                    {getDictionaryString(
                      "registerPage_studentComponent_codingXPs[1]"
                    )}
                  </option>
                  <option className="bg-white" value="Beginner-Level">
                    {getDictionaryString(
                      "registerPage_studentComponent_codingXPs[2]"
                    )}
                  </option>
                </select>
                <ErrorMessage
                  errors={errors}
                  name={`Students.${index}.CodingExperiance`}
                  render={({ message }) => (
                    <p className="text-xs italic text-red-600">{message}</p>
                  )}
                />
              </div>
            </div>
            {showInterest[index]?.showInterestField &&
              showInterest[index]?.showInterestExperiance && recommendation && (
                <div className="flex flex-col items-start mx-2 pb-2">
                  <label className="font-bold">
                    {getDictionaryString("registerPage_interests_title")}
                  </label>
                  <div className="flex flex-col w-full lg:w-auto">
                    <select
                      className="border text-[#667085] bg-white h-11 border-black/10 rounded p-2"
                      {...register(`Students.${index}.interest`, {
                        required: "Interest is required",
                      })}
                      defaultValue=""
                    >
                      <option className="bg-black/10" disabled>
                        {getDictionaryString("registerPage_interests_title")}
                      </option>
                      <option className="bg-white" value="Web">
                        Web
                      </option>
                      <option className="bg-white" value="Computer_Programming">
                        Python/Scratch
                      </option>
                      <option className="bg-white" value="Mobile">
                        Mobile
                      </option>
                    </select>
                    <ErrorMessage
                      errors={errors}
                      name={`Students.${index}.Interest`}
                      render={({ message }) => (
                        <p className="text-xs italic text-red-600">{message}</p>
                      )}
                    />
                  </div>
                </div>
              )}
            {getValues().Students.length !== 1 && (
              <div
                className="ml-3 flex items-center justify-center cursor-pointer"
                onClick={() => handleStudentDeletion(index)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M6.71 6.71a1 1 0 0 1 1.42 0L12 10.59l3.88-3.88a1 1 0 1 1 1.42 1.42L13.41 12l3.88 3.88a1 1 0 1 1-1.42 1.42L12 13.41l-3.88 3.88a1 1 0 0 1-1.42-1.42L10.59 12 6.71 8.12a1 1 0 0 1 0-1.41z" />
                </svg>
              </div>
            )}
          </div>
        ))}
        {recommendation && (
          <button
            type="button"
            onClick={handleAddStudent}
            className="text-blue-500 underline mt-11"
          >
            {getDictionaryString("registerPage_studentComponent_add")}
          </button>
        )}
        <div className="flex flex-col md:flex-row items-center justify-center gap-x-32 my-4 w-full">
          <button
            onClick={prevPage}
            type="button"
            className="py-2 w-[230px] h-11 my-10 text-center font-bold bg-yellow rounded-md focus:outline-none"
          >
            {getDictionaryString("registerPage_back")}
          </button>
          <button
            type="submit"
            className="py-2 w-[230px] h-11 text-center font-bold bg-yellow rounded-md focus:outline-none"
            disabled={loading}
          >
            {getDictionaryString("registerPage_next")}
          </button>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default StudentInfoForm;
