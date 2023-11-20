"use client";

import { Headline } from "@/public/types/News";
import React, { useEffect, useState } from "react";

export function HeadlineSlide({ headline }: { headline: Headline }) {
  return <div></div>;
}
export default function HeadlineCarousel() {
  const [headlines, setHeadlines] = useState<Headline[]>([] as Headline[]);
  useEffect(() => {
    async function getHeadlines() {
      const res = await fetch(`/api/news/headlines`);
      const data = await res.json();
      setHeadlines(data);
    }
    if (headlines.length === 0) {
      getHeadlines();
    }
  }, []);
  return <></>;
}
