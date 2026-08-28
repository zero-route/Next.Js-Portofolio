"use client";

import { useState } from "react";
import IntroLoader from "@/components/intro/IntroLoader";

export default function Page() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      {!introDone && <IntroLoader onFinish={() => setIntroDone(true)} />}
    </>
  );
}
