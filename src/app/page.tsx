"use client"

import Navbar from "@/components/NavBar";
import { useState } from "react";

export default function Home() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div>
      <Navbar setActive={() =>setActive(9)} />
    </div>
  );
}
