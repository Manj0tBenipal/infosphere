"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
export default function SearchResults() {
  const params = useSearchParams();
  console.log(params.get("keyword"));

  useEffect(() => {
    async function getSearchResults() {
      const res = await fetch(
        `/api/news/newsdata/search?keyword=${params.get("keyword")}`
      );
      const data = await res.json();
      console.log(data);
    }
    getSearchResults();
  }, []);
  return <div></div>;
}
