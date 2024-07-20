import { Fragment, useEffect, useState } from "react";
import { DatePicker } from "@mantine/dates";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { toast, Toaster } from "react-hot-toast";
import axios from "../../api/axios";
import { useRouter, useSearchParams } from "next/navigation";
import moment from "moment";
import { useGetTimezone } from "../../hooks/useGetTimezone";
import { timeZones } from "../../data/timezones";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import timeParser from "dayjs/plugin/customParseFormat";
import { useDictionary } from "@/hooks/useDictionary";
import { useFormContext } from "@/utils/FormContext";
import "moment-timezone";
import { enrollData, FInalRecommendation, paymentData } from "@/types/type";
import { usePostEnroll } from '@/hooks/usePostEnroll';
import { usePostCheckout } from '@/hooks/usePostCheckout';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(timeParser);
dayjs.tz.setDefault("America/New_York");



interface Timezone {
    abbreviation: string;
    offset: string;
    ianaTimeZone: string;
    fullName: string;
  }


  const availableTimes2 = [
    { time: "3:00 PM", utcTimeStamp: "1650142800000" },
    { time: "7:00 PM", utcTimeStamp: "1650157200000" },
    { time: "8:00 PM", utcTimeStamp: "1650160800000" },
  ];

const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const DatePickerPage: React.FC = () => {
  const router = useRouter();
  const minDate = addDays(new Date(), 2);
  const [value, setValue] = useState<Date | null>(null);
  const [date, setDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string[]>([]);
  const { frequencyImmediately, finalRecommendation} = useFormContext();
  const [times, setTimes] = useState(availableTimes2 || []);
  const [originalTimes, setOriginalTimes] = useState(availableTimes2);
  const [userDefaultTimezone, setUserDefaultTimezone] =
    useState<string>("Etc/UTC");
  const [activeTab, setActiveTab] = useState<number>(0);
  const searchParams = useSearchParams();
  const locale = searchParams.get("locale") || "en";
  const { getDictionaryString } = useDictionary(locale);
  const [selectedTimezone, setSelectedTimezone] = useState<Timezone>({
    abbreviation: "UTC",
    offset: "+00:00",
    ianaTimeZone: "Etc/UTC",
    fullName: "Coordinated Universal Time"
  });
  const [convertedTime, setConvertedTime] = useState<string>("");
  const [selectedCourseIndex, setSelectedCourseIndex] = useState<number>(0);
  const [newTime, setNewTime] = useState<string>("");
  const handleCourseSelection = (index: number) => {
    setActiveTab(index);
    setSelectedCourseIndex(index);
  };

  const timeConverter = (timesArray: any[], userTimeZone: string): any[] => {
    if (!timesArray) {
      return [];
    }
    if (userTimeZone === "AddisAbaba/Ethiopia") {
      userTimeZone = "+03:00";
    }
    const convertedTimes = timesArray.map((time) => {
      const singleTime = time.time;
      const sourceTime = moment.utc(singleTime, "h:mm A");
      const userTime = userTimeZone
        ? sourceTime.clone().utcOffset(userTimeZone)
        : sourceTime.clone();
      return {
        time: userTime.format("h:mm A"),
        utcTimeStamp: time.utcTimeStamp,
      };
    });

    return convertedTimes;
  };

  const handleTimezoneChange = (e: Timezone): void => {
    const newTimes = timeConverter(originalTimes, e.offset);
    setTimes(newTimes);
    setSelectedTimezone(e);
    setUserDefaultTimezone(e.ianaTimeZone);
  };
  
  const { enrollCourse } = usePostEnroll();
  const {checkoutCourse} = usePostCheckout();

  const handleEnrollStudents = async () => {
    if (!finalRecommendation) {
      console.error("finalRecommendation is undefined");
      return;
    }

    const enrollDataArray: enrollData[] = finalRecommendation.map(
      (item: FInalRecommendation) => ({
        studentId: item.studentId,
        courseId: item.id,
        startDate: date,
        time: newTime,
        trainingFrequency: frequencyImmediately,
      })
    );

    try {
      await toast.promise(enrollCourse(enrollDataArray), {
        loading: "Saving...",
        success: "Saved successfully",
        error: "Error saving course details",
      });
      // Proceed with checkout if enrollment is successful
      const paymentDataArray: paymentData[] = finalRecommendation.map(
        (item: FInalRecommendation) => ({
          type: "classstart",
          studentId: item.studentId,
          courseId: item.id,
          priceId: item.prices[0].priceId,
        })
      );

      const checkoutResponse = await checkoutCourse(paymentDataArray);
      router.push(checkoutResponse);
    } catch (error) {
      console.error("Error enrolling students or processing payment:", error);
    }
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedTime = e.target.value;
    const sourceTime = moment.utc(selectedTime, "h:mm A");
    const addisAbabaTime = sourceTime.clone().tz("Africa/Addis_Ababa").format("h:mm A");
    const selectedTimezoneString = `${selectedTime} ${selectedTimezone.abbreviation}`;
    const convertedTimeString = `Converted time in EAT is ${addisAbabaTime}`;
  
    setSelectedTime([selectedTimezoneString]);
    setConvertedTime(convertedTimeString);
    setNewTime(`${convertedTimeString} - ${selectedTimezoneString}`)
  };
  
  const handleDateChange = (newDate: Date | null) => {
    if (newDate) {
      const dateString = newDate.toDateString();
      // console.log("Selected date:", newDate);
      // console.log(dateString)
      setValue(newDate);
      setDate(dateString)
    }
  };
  
  


  return (
    <div className="flex flex-col items-center mx-auto max-w-screen-lg justify-center">
      <h3 className="text-2xl text-center mx-auto font-normal mt-6">
        {getDictionaryString("registerPage_date_title")}
      </h3>
      <div>
        <div className="flex sm:flex-row flex-col mt-10 sm:gap-x-32 justify-center items-center mb-10 w-full">
          <DatePicker
            value={value}
            onChange={handleDateChange}
            locale="en"
            minDate={minDate}
            excludeDate={(date) => {
              const day = date.getDay();
              return day !== 2 && day !== 4 && day !== 6;
            }}
          />
          <div className="pt-10 md:pt-0">
            <h3 className="font-semibold">
              {getDictionaryString("registerPage_timezone")}
            </h3>
            <div className="flex items-center justify-start">
              <div className="pt-4">
                <div className="flex justify-start">
                  <div>
                    <Listbox onChange={handleTimezoneChange}>
                      <div className="relative mr-1 z-10 ">
                        <Listbox.Button className="relative flex min-w-[15rem] w-full cursor-default border rounded-md border-transparent bg-white -mt-2 text-left focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                          <img
                            className="w-4 h-4 mr-2"
                            alt=""
                            src="/Icon.png"
                          />
                          <span className="block truncate">
                            {userDefaultTimezone}
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute mt-1 max-h-60 w-96 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {timeZones.map((tz, tzIdx) => (
                              <Listbox.Option
                                key={tzIdx}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-2 pr-4 ${
                                    active
                                      ? "bg-amber-100 text-amber-900"
                                      : "text-gray-900"
                                  }`
                                }
                                value={tz}
                              >
                                {({ selected }) => (
                                  <div className="flex">
                                    <span
                                      className={`block mr-[2px] ${
                                        selected ? "font-medium" : "font-normal"
                                      }`}
                                    >
                                      {tz.abbreviation}
                                    </span>
                                    <span
                                      className={`block ${
                                        selected ? "font-medium" : "font-normal"
                                      }`}
                                    >
                                      {`(${tz.offset})`} &nbsp;
                                    </span>
                                    <span
                                      className={`block ${
                                        selected ? "font-medium" : "font-normal"
                                      }`}
                                    >
                                      {tz.fullName}
                                    </span>
                                    {selected && (
                                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                        <CheckIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    )}
                                  </div>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                  </div>
                </div>
              </div>
            </div>
            {times.map((t, timeIndex) => {
              const time = t.time;
              const value = `${time}`;
              const isChecked = selectedTime.includes(value);

              return (
                <div
                  className="self-center relative flex justify-center items-center"
                  key={timeIndex}
                >
                  <input
                    type="radio"
                    id={`time`}
                    name={`time`}
                    onChange={(e) => handleRadioChange(e)}
                    value={value}
                    className={`cursor-pointer absolute top-0 bottom-0 w-60 h-11 text-center mx-auto mt-6 border appearance-none checked:border-2 checked:border-yellow checked:text-black checked:font-semibold border-gray-600 text-gray-2 rounded-md focus:outline-none hover:border-yellow`}
                  />
                  <label
                    htmlFor={`time`}
                    className={`mt-8 ${
                      isChecked ? "text-black font-semibold" : "text-gray-700"
                    }`}
                  >
                    {time}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-x-32 my-4 w-full">
        <button
          onClick={() => {
            if (activeTab > 0) {
              handleCourseSelection(activeTab - 1);
            } else {
              // props.prev();
            }
          }}
          className="bg-yellow w-245 h-48 border-solid rounded-md font-bold"
        >
          {getDictionaryString("registerPage_back")}
        </button>

        <button
          onClick={() => {
            handleEnrollStudents();
          }}
          className="bg-yellow w-245 h-48 border-solid rounded-md font-bold"
        >
          {getDictionaryString("registerPage_checkout")}
        </button>
      </div>
      <Toaster />
    </div>
  );
};

export default DatePickerPage;
