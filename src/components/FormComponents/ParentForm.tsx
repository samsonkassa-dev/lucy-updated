"use client"

import { useState, useEffect, Fragment } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { countries } from "countries-list";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useGetUserCountryCallingCode } from '@/hooks/useGetUserCounntryCode';
import { usePostParentInformation } from '@/hooks/usePostParentInformation';
import { ParentData } from "@/types/type";
import { useSearchParams } from "next/navigation";
import { useDictionary } from "@/hooks/useDictionary";
import { useFormContext } from "@/utils/FormContext";



const ParentForm: React.FC= () => {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const locale = searchParams.get("locale") || "en";
  const dictionary = useDictionary(locale);
  const { nextPage, prevPage } = useFormContext();


  const { getNestedValue, getDictionaryString } = useDictionary(locale);

  const countryData = countries || {};

  const countryNames = Object.keys(countryData)
    .map((code) => {
      const country = countryData[code as keyof typeof countryData];
      return {
        country: country.name,
        code: (country.phone as unknown as string).split(",")[0],
        emoji: country.emoji,
      };
    })
    .sort((a, b) => a.country.localeCompare(b.country));

  const [selectedAreaCode, setSelectedAreaCode] = useState(
    countryNames.find((c) => c.code === "1")
  );

  const { code, country } = useGetUserCountryCallingCode() || {
    code: "",
    country: "",
  };

  const handleAreaCodeChange = (userCountry: {
    code: string;
    country: string;
  }) => {
    if (userCountry.code === undefined) {
      return setSelectedAreaCode(countryNames.find((c) => c.code === "1")!);
    }

    const selected = countryNames.find(
      (c) => c.code === userCountry.code && c.country === userCountry.country
    );

    if (selected) {
      setSelectedAreaCode(selected);
    }
  };

  useEffect(() => {
    handleAreaCodeChange({ code, country });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country, code]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ParentData>();


  const { postParentInfo } = usePostParentInformation();
  const onSubmit: SubmitHandler<ParentData> = async (data) => {
    setLoading(true);
    try {
      await toast.promise(postParentInfo(data), {
        loading: "Updating...",
        success: "Parent information saved successfully",
        error: "Error saving parent information",
      });
      nextPage();
    } catch (error) {
      const errorMessage = (error as any).message || "Error saving parent information";
      if (errorMessage === "User already exists") {
        toast.error("User already exists");
      } else {
        toast.error("Error saving parent information");
      }
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className="flex text-black flex-row items-center justify-center">
      <form
        className="flex flex-col items-center justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="text-center mt-20 lg:mt-0">
          <h2 className="text-lg md:text-2xl font-bold my-5">
            {getDictionaryString("registerPage_parentComponent_title")}
          </h2>
          <div className="flex px-1 flex-col space-y-7 md:space-y-0 lg:gap-5 mt-5 mb-5">
            <div className="flex lg:flex-row space-y-7 md:space-y-0 flex-col">
              <div className="flex flex-col items-start mr-2 w-full">
                <label htmlFor="first-name" className="font-bold">
                  {getDictionaryString("registerPage_parentComponent_name")}
                </label>
                <input
                  {...register("FirstName", { required: true })}
                  type="text"
                  placeholder={getDictionaryString(
                    "registerPage_parentComponent_name"
                  )}
                  id="first-name"
                  className="bg-white border w-full border-gray-300 border-black/10 shadow-xs border-1 py-2 px-4 rounded-md"
                />
              </div>
              <div className="flex flex-col w-full items-start">
                <label htmlFor="last-name" className="font-bold">
                  {getDictionaryString("registerPage_parentComponent_lastName")}
                </label>
                <input
                  type="text"
                  {...register("LastName", { required: true })}
                  placeholder={getDictionaryString(
                    "registerPage_parentComponent_lastName"
                  )}
                  id="last-name"
                  className="bg-white border w-full border-gray-300 border-black/10 shadow-xs border-1 py-2 px-4 rounded-md"
                />
              </div>
            </div>
            <div className="flex flex-col w-full pb-1 items-start">
              <label className="font-bold ">
                {getDictionaryString("registerPage_parentComponent_phone")}
              </label>
              <div className="flex w-full lg:w-auto flex-col">
                <div className="">
                  <div className="flex justify-start">
                    <div>
                      <Listbox
                        value={selectedAreaCode}
                        onChange={handleAreaCodeChange}
                      >
                        <div className="relative mr-1">
                          <Listbox.Button className="relative cursor-pointer w-full border rounded-md border-black/10 bg-white py-3 pl-3 pr-10 text-left focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                            <span className="block truncate">
                              {selectedAreaCode?.emoji +
                                "   +" +
                                selectedAreaCode?.code}
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
                            <Listbox.Options className="absolute mt-1 max-h-60 w-80 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                              {countryNames.map((country, countryIdx) => (
                                <Listbox.Option
                                  key={countryIdx}
                                  className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-2 pr-4 ${
                                      active
                                        ? "bg-amber-100 text-amber-900"
                                        : "text-gray-900"
                                    }`
                                  }
                                  value={country}
                                >
                                  {({ selected }) => (
                                    <div className="flex">
                                      <span
                                        className={`block truncate w-1/12 mr-[2px] ${
                                          selected
                                            ? "font-medium"
                                            : "font-normal"
                                        }`}
                                      >
                                        {country.emoji}
                                      </span>
                                      <span
                                        className={`block truncate w-1/5 ${
                                          selected
                                            ? "font-medium"
                                            : "font-normal"
                                        }`}
                                      >
                                        {" +" + country.code}
                                      </span>
                                      <span
                                        className={`block truncate w-1/2 ${
                                          selected
                                            ? "font-medium"
                                            : "font-normal"
                                        }`}
                                      >
                                        {country.country}
                                      </span>
                                      {selected ? (
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                          <CheckIcon
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                          />
                                        </span>
                                      ) : null}
                                    </div>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </Listbox>
                    </div>
                    <input
                      className="border border-black/10 rounded p-2 appearance-none"
                      placeholder="Phone number"
                      {...register("PhoneNumber", {
                        required: "Phone number is required",
                        minLength: {
                          value: 7,
                          message: "Phone number must be greater than 7",
                        },
                        pattern: {
                          value: /^(0|[1-9]\d*)(\.\d+)?$/,
                          message: "Invalid Phone number",
                        },
                      })}
                    />
                  </div>
                </div>
              </div>
              <ErrorMessage
                errors={errors}
                name="PhoneNumber"
                render={({ message }) => (
                  <p className="text-xs italic text-red-600">{message} </p>
                )}
              />
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col pb-2 items-start ">
                <label className="font-bold ">
                  {getDictionaryString("registerPage_parentComponent_email")}
                </label>
                <div className="flex flex-col w-full lg:w-full">
                  <input
                    type="email"
                    placeholder="Email"
                    className="border border-black/10 rounded p-2"
                    {...register("Email", {
                      required: "Email address is required",
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="Email"
                    render={({ message }) => (
                      <p className="text-xs italic text-red-600">{message} </p>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-start items-start">
            <div className="flex items-center mb-1">
              <input
                type="checkbox"
                id="privacy-policy"
                className="mr-2 w-5 h-5 "
                {...register("agrees", {
                  required: "You must agree to our Terms and Conditions",
                })}
              />
              <label htmlFor="privacy-policy" className="font-sans">
                {getDictionaryString("registerPage_parentComponent_agree")}
                &nbsp;
                <span className="text-black/50 hover:text-black">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer hover:underline"
                    href="https://app.termly.io/document/terms-of-service/0785e265-ff92-4227-894a-b00f7deb2b6b"
                  >
                    {getDictionaryString("registerPage_parentComponent_terms")}
                  </a>
                </span>
                &nbsp;
                <span className="text-black/50 hover:text-black">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer hover:underline"
                    href="https://app.termly.io/document/privacy-policy/b71ad4f9-b77e-482c-a1e8-f060e0645f9f"
                  >
                    {getDictionaryString(
                      "registerPage_parentComponent_privacy"
                    )}
                  </a>
                </span>
              </label>
            </div>
            <ErrorMessage
              errors={errors}
              name="agrees"
              render={({ message }) => (
                <p className="text-xs italic text-red-600">{message} </p>
              )}
            />
          </div>
        </div>

        <button
          type="submit"
          className="py-2 w-[230px] h-11 my-10 text-center font-bold bg-yellow rounded-lg focus:outline-none shadow-md"
          disabled={loading}
        
        >
          {getDictionaryString("registerPage_next")}
        </button>
      </form>
      <Toaster />
    </div>
  );
}


export default ParentForm
