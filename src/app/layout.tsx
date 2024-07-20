import type { Metadata } from "next";
import { Indie_Flower } from "next/font/google";
import localFont from "next/font/local";
import Navbar from "@/components/NavBar";
import "./globals.css";
import { Suspense } from "react";
import { FormProvider } from "@/utils/FormContext";
import Providers from "@/utils/Provider";

const indie = Indie_Flower({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-indie",
});

// <DefaultSeo
// title="Lucy: Coding Education for Ethiopian Diaspora | After-School Programs."
// description="Lucy Coding is a robust online coding platform that offers a wide range of coding courses and tutorials for Kids between the age of 8-18."
// openGraph={{
//   type: "website",
//   url: "https://www.lucycoding.com/",
//   locale: "en_am",
//   siteName: "LucyCoding",
//   images: [
//     {
//       url: "https://lucycoding.com/faviconLogo1.png",
//       width: 325,
//       height: 512,
//     },
//   ],
// }}
// />

const MonoSans = localFont({
  src: "../../public/Font/MonaSans/Mona-Sans-Regular.woff2",
});

export const metadata: Metadata = {
  title:
    "Lucy: Coding Education for Ethiopian Diaspora | After-School Programs.",
  description:
    "Lucy Coding is a robust online coding platform that offers a wide range of coding courses and tutorials for Kids between the age of 8-18.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <FormProvider>
      <html lang="en">
        <body className={`${indie.variable} ${MonoSans.className}`}>
          <Providers>{children}</Providers>
          <Suspense>
            <Navbar />
          </Suspense>
        </body>
      </html>
    </FormProvider>
  );
}
