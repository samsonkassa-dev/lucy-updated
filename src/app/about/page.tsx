"use client";

import AboutPage from "@/components/AboutPage";
import { Suspense } from "react";
import DatePickerPage from "@/components/FormComponents/DateandTimePickerImmediately";

const About = () => {
  return (
    <>
      <Suspense>
        <DatePickerPage />
      </Suspense>



    </>
  );
};

export default About;
