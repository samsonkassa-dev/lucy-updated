"use client"

import React, { Suspense, useEffect } from 'react';
import ParentForm from '@/components/FormComponents/ParentForm';
import StudentInfoForm from '@/components/FormComponents/StudentInfoForm';
import Recommended from '@/components/FormComponents/Recommendation';
import FrequencyandTime from '@/components/FormComponents/FrequencyandTime'
import DatePickerPage from '@/components/FormComponents/DateandTimePickerImmediately';
import { useFormContext } from '@/utils/FormContext';
import { useRouter, useSearchParams } from 'next/navigation';
import Head from 'next/head';

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const tab = searchParams.get("tab");
  const { page, frequency } = useFormContext();

  const pages = [
    { name: "Parent Form", component: <ParentForm />, progress: 12.5 },
    { name: "Student Info Form", component: <StudentInfoForm />, progress: 25 },
    { name: "Recommendation", component: <Recommended />, progress: 50 },
    {
      name: "Date and Time Picker",
      component: <FrequencyandTime />,
      progress: 75,
    },
    {
      name: "Date and Time Picker",
      component: <DatePickerPage />,
      progress: 85,
    },
  ];

  useEffect(() => {
    if (tab && !isNaN(Number(tab))) {
      const tabIndex = parseInt(tab);
      if (tabIndex >= 1 && tabIndex <= pages.length) {
      }
    }
  }, [tab]);

  return (
    <>
      <Head>
        <title>Registration Form</title>
      </Head>

        <div className="px-5 py-20 max-w-screen-2xl mx-auto justify-items-center">
          <div className="overflow-hidden h-auto mt-24">
            <div className="flex items-center">
              <div className="w-full lg:h-full lg:mb-0 mb-10">
                <div className="mx-auto md:max-w-screen-md mt-10 h-2 bg-gray">
                  <div
                    className={`bg-yellow text-xs leading-none py-1 text-center h-2 text-white transition-all ease-out duration-1000`}
                    style={{ width: `${pages[page - 1].progress}%` }}
                  />
                </div>

                <Suspense fallback={<div>Loading...</div>}>
                  {status === "success" ? (
                    <div>Thank you for registering!</div>
                  ) : status === "cancel" ? (
                    <div>Registration Canceled</div>
                  ) : (
                    pages[page - 1].component
                  )}
                </Suspense>
              </div>
            </div>
          </div>
        </div>
  
    </>
  );
};

export default RegisterPage;