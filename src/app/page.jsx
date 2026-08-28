"use client";

import { useState } from "react";
import IntroLoader from "@/components/intro/IntroLoader";

export default function Page() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      {!introDone && (
        <IntroLoader duration={6500} onFinish={() => setIntroDone(true)} />
      )}

      {/* konten halaman utama kamu di sini, tetap dirender di belakang layar */}
    </>
  );
}
