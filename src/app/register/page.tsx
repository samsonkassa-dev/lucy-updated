
import React, { Suspense } from "react";
import Head from "next/head";
import RegisterPage from "@/components/RegisterPage";

const Register: React.FC = () => {
  return (
    <>
      <Head>
        <title>Registration Form</title>
      </Head>

      <Suspense>
        <RegisterPage />
      </Suspense>
    </>
  );
};

export default Register;
