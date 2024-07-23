"use client";

import Head from "next/head";
import { useDictionary } from "@/hooks/useDictionary";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useState, useEffect, Fragment } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { countries } from "countries-list";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const ContactUs = () => {
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

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      FirstName: "",
      LastName: "",
      Email: "",
      PhoneNumber: "",
      Message: "",
      agreeTerms: false,
    },
  });

  const searchParams = useSearchParams();
  const locale = searchParams.get("locale") || "en";

const handleSubmitForm = () =>{
    toast.success("Message sent successfully!")
}

  const { getDictionaryString } = useDictionary(locale);
  return (
    <>
      <Head>
        <title>About Us - Lucy</title>
      </Head>

      <div className="lg:grid md:grid-cols-2 mt-24 mb-10 max-w-screen-2xl mx-auto">
        <div className="w-full md:pl-20 px-10 ">
          <div className="flex  flex-col relative md:pt-20 pt-10">
            <div className=" ">
              <div className="w-full">
                <div className="">
                  <Image
                    className=""
                    alt=""
                    width={230}
                    height={80}
                    src="/Vector (5).png"
                  />
                </div>
                <h1
                  className={`-mt-14 ml-4 font-indie z-10 font-bold text-3xl w-full`}
                >
                  {getDictionaryString("contactUsPage_title")}
                </h1>
              </div>
            </div>
            <p className="text-black/50 mt-10 md:px-0">
              {getDictionaryString("contactUsPage_subtitle")}
            </p>
            <form
              className="flex md:mt-5 flex-row w-full "
              onSubmit={handleSubmit(handleSubmitForm)}
            >
              <div className=" mt-4  md:w-90 w-full   ">
                <div className="flex md:flex-row mb-4 flex-col">
                  <div className="flex flex-col mb-4 mr-2 w-full">
                    <label htmlFor="first-name" className="font-sans">
                      {getDictionaryString("contactUsPage_formComponents_name")}
                    </label>
                    <input
                      {...register("FirstName", { required: true })}
                      type="text"
                      placeholder={getDictionaryString(
                        "contactUsPage_formComponents_name"
                      )}
                      id="first-name"
                      className=" bg-white border border-gray-300 border-black/10 shadow-xs   border-1 py-2 px-4 rounded-md"
                    />
                    <ErrorMessage errors={errors} name="FirstName" />
                  </div>
                  <div className="flex flex-col w-full">
                    <label htmlFor="last-name" className="font-sans">
                      {getDictionaryString(
                        "contactUsPage_formComponents_lastName"
                      )}
                    </label>
                    <input
                      type="text"
                      {...register("LastName", { required: true })}
                      placeholder={getDictionaryString(
                        "contactUsPage_formComponents_lastName"
                      )}
                      id="last-name"
                      className=" bg-white border border-gray-300 border-black/10 shadow-xs  border-1 py-2 px-4 rounded-md"
                    />
                    <ErrorMessage errors={errors} name="LastName" />
                  </div>
                </div>
                <div className="flex flex-col mb-4">
                  <label htmlFor="email" className="font-sans">
                    {getDictionaryString("contactUsPage_formComponents_email")}
                  </label>
                  <input
                    type="email"
                    placeholder="you@company.com"
                    id="email"
                    {...register("Email", { required: true })}
                    className=" bg-white border border-gray-300 border-black/10 shadow-xs   border-1 py-2 px-4 rounded-md"
                  />
                  <ErrorMessage errors={errors} name="Email" />
                </div>
                <div className="flex flex-col mb-4">
                  <label htmlFor="phone" className="font-sans">
                    {getDictionaryString("contactUsPage_formComponents_phone")}
                  </label>
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
                        type="number"
                        id="PhoneNumber"
                        autoComplete="PhoneNumber"
                        className=" bg-white border border-gray-300 border-black/10 shadow-xs  border-1 py-2 px-4 rounded-md w-full"
                        {...register("PhoneNumber", { required: true })}
                      />
                      <ErrorMessage errors={errors} name="PhoneNumber" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col mb-4">
                  <label htmlFor="message" className="font-sans">
                    {getDictionaryString(
                      "contactUsPage_formComponents_message"
                    )}
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    {...register("Message", { required: true })}
                    className=" bg-white border border-gray-300 border-black/10 shadow-xs border-1 py-2 px-4 rounded-md"
                  ></textarea>
                  <ErrorMessage errors={errors} name="Message" />
                </div>
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    id="privacy-policy"
                    className="mr-2 w-5 h-5 "
                    {...register("agreeTerms", { required: true })}
                  />
                  <label htmlFor="privacy-policy" className="font-sans">
                    <div
                      className={`flex flex-wrap items-center ${
                        locale.includes("am") ? "flex-row-reverse" : "flex-wrap"
                      }`}
                    >
                      <p>
                        &nbsp;
                        {getDictionaryString(
                          "contactUsPage_formComponents_agree"
                        )}
                        &nbsp;
                      </p>
                      <span className="text-black/50 hover:text-black">
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cursor-pointer hover:underline"
                          href="https://app.termly.io/document/privacy-policy/b71ad4f9-b77e-482c-a1e8-f060e0645f9f"
                        >
                          {getDictionaryString(
                            "contactUsPage_formComponents_terms"
                          )}
                        </a>
                      </span>
                    </div>
                  </label>
                </div>
                <button
                  type="submit"
                  className="bg-[#F5C143]  text-black font-semibold py-2 px-4 w-full rounded shadow-sm hover:shadow-lg border border-solid border-[#F5C143] transition"
                >
                  {getDictionaryString("contactUsPage_formComponents_send")}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="relative items-end self-end h-screen hidden lg:block">
          <Image
            fill
            style={{ objectFit: "contain" }}
            alt=""
            src="/Group 13.png"
          />
        </div>
      </div>
      <Toaster/>
    </>
  );
};

export default ContactUs;
