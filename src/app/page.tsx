import Footer from "@/components/Footer";
import { Suspense } from "react";
import LandingPage from "@/components/Landing";

export default function Home() {
  return (
    <div>
      <Suspense>
        <LandingPage/>
      </Suspense>


      <Footer />
    </div>
  );
}
