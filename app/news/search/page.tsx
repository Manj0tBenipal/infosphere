"use client";
import { Card } from "@mui/joy";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { NewsSearch } from "@/public/types/News";

export default function SearchResults() {
  const params = useSearchParams();
const [searchResults, setSearchResults] = useState<NewsSearch>({} as NewsSearch); 
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
