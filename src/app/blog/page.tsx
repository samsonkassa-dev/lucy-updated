import Footer from "@/components/Footer";
import { Suspense } from "react";
import BlogPage from "@/components/Blog";

export default function Home() {
  return (
    <div>
      <Suspense>
        <BlogPage />
      </Suspense>


      <Footer />
    </div>
  );
}
