"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function SearchResults() {
  const params = useSearchParams();

  useEffect(() => {
    async function getSearchResults() {
      const res = await fetch(
        `/api/news/newsdata/search?keywords=${params.get("keywords")}${
          //Checks if user has request for nextpage
          params.get("page") !== null ? "&page=" + params.get("page") : ""
        }`
      );
      const data = await res.json();
      console.log(data);
    }
    getSearchResults();
  }, []);
  return <div></div>;
}
