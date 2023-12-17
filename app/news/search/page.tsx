"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function SearchResults() {
  const params = useSearchParams();
  console.log(params.get("keywords"));

  useEffect(() => {
    async function getSearchResults() {
      const res = await fetch(
        `/api/news/newsdata/search?keyword=${params.get("keywords")}`,
        {
          next: {
            revalidate: 10
          }
        }
      );
      const data = await res.json();
     console.log(data)
    }
    getSearchResults();
  }, []);
  return <div></div>;
}
