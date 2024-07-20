"use client"
import { Fragment, useEffect, useState, useContext, ChangeEvent } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import { useFormContext } from "@/utils/FormContext";
import { useDictionary } from "@/hooks/useDictionary";

const Frequency: React.FC = () => {
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(0);
  const { nextPage, prevPage, setFrequencyImmediatelty } = useFormContext();
  const [activeTab, setActiveTab] = useState(0);
  const searchParams = useSearchParams();
  const locale = searchParams.get("locale") || "en";
  const { getDictionaryString } = useDictionary(locale);
  const [traingFrequency, setTrainingFrequency] = useState<string>("");


  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newtrainingFrequency = e.target.value;
    setTrainingFrequency(newtrainingFrequency)
    setFrequencyImmediatelty(newtrainingFrequency)
  };

  const handleNext = async () => {
    if(!traingFrequency){
      toast.error("Please select training frequency")
    } else{
      nextPage()
    }
  };



  const renderFrequencySelectionCard = () => {
    return (
      <div className={`h-auto mx-auto w-full`}>
        <div className="h-auto flex flex-col mx-auto mt-5">
          <div className="self-center relative flex justify-center items-center">
            <input
              type="radio"
              id={`Session1`}
              name={`Session`}
              onChange={(e) => {
                handleRadioChange(e);
              }}
              value={`3 days a week`}
              className={`cursor-pointer absolute top-0 bottom-0 w-72 h-24 text-center mx-auto mt-6 border appearance-none checked:border-2 checked:border-yellow  checked:text-black checked:font-semibold border-gray-600 text-gray-2 rounded-md  focus:outline-none  hover:border-yellow`}
            />
            <label
              htmlFor={`Session1`}
              className={`mt-8 text-black font-semibold`}
            >
              <div className="w-full flex flex-col gap-y-1 items-center cursor-pointer justify-center text-center">
                <p>
                  {
                    getDictionaryString("registerPage_frequency_sessionEnroll_1_title")
                  }
                </p>
                <p className="text-sm text-yellow font-semibold">
                {
                    getDictionaryString("registerPage_frequency_sessionEnroll_1_time")
                  }
                </p>
                <div className="flex items-center flex-wrap">
                  <p>
                  {
                    getDictionaryString("registerPage_frequency_sessionEnroll_1_price")
                  }
                  </p>
                </div>
              </div>
            </label>
          </div>
          <div className="self-center relative flex justify-center items-center">
            <input
              type="radio"
              id={`Session2`}
              name={`Session`}
              onChange={(e) => {
                handleRadioChange(e);
              }}
              value={`4 days a week`}
              className={`cursor-pointer absolute top-0 bottom-0 w-72 h-24 text-center mx-auto mt-6 border appearance-none checked:border-2 checked:border-yellow  checked:text-black checked:font-semibold border-gray-600 text-gray-2 rounded-md  focus:outline-none  hover:border-yellow`}
            />
            <label
              htmlFor={`Session2`}
              className={`mt-8 text-black font-semibold`}
            >
              <div className="w-full flex flex-col gap-y-1 items-center cursor-pointer justify-center text-center">
                <p>
                {
                    getDictionaryString("registerPage_frequency_sessionEnroll_2_title")
                  }
                </p>
                <p className="text-sm text-yellow font-semibold">
                {
                    getDictionaryString("registerPage_frequency_sessionEnroll_2_time")
                  }
                </p>
                <div className="flex items-center flex-wrap">
                  <p>
                  {
                    getDictionaryString("registerPage_frequency_sessionEnroll_2_price")
                  }
                  </p>
                </div>
              </div>
            </label>
          </div>
        </div>
        <Toaster />
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center mx-auto max-w-screen-md justify-center">
      <div className="w-full">{renderFrequencySelectionCard()}</div>
      <div className="flex pt-10 items-center justify-center gap-x-32 my-4 w-full">
        <button
          onClick={prevPage}
          className="bg-yellow w-245 h-48 border-solid rounded-md font-bold"
        >
          {getDictionaryString("registerPage_back")}
        </button>
        <button
          onClick={handleNext}
          className="bg-yellow w-245 h-48 border-solid rounded-md font-bold"
        >
        {getDictionaryString("registerPage_chooseDate")}
        </button>
      </div>
    </div>
  );
};


export default Frequency;
  