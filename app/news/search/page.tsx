"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { NewsOverview, NewsSearch } from "@/public/types/News";
import NewsCard from "@/components/news/NewsCard";
import styles from "@/styles/news.module.css";
import { Button } from "@mui/joy";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
export default function SearchResults() {
  const params = useSearchParams();
  const [searchResults, setSearchResults] = useState<NewsSearch>(
    {} as NewsSearch
  );
  useEffect(() => {
    async function getSearchResults() {
      const res = await fetch(
        `/api/news/newsdata/search?keywords=${params.get("keywords")}${
          //Checks if user has request for nextpage
          params.get("page") !== null ? "&page=" + params.get("page") : ""
        }`
      );
      const data = await res.json();
      setSearchResults(data);
    }
    getSearchResults();
  }, []);
  if (!searchResults?.newsArticles) {
    return (
      <div className="flex flex-center flex-gap-1 flex-wrap">
        <h1>No results found</h1>
      </div>
    );
  }
  return (
    <div className="flex flex-center flex-column flex-gap-1">
      <h1 className="fontXL primary-gradient-font">
        Search Results for &quot;{params.get("keywords")}&quot;
      </h1>

      <div className="flex flex-center flex-gap-1 flex-wrap">
        {searchResults?.newsArticles?.map((article: NewsOverview) => {
          return <NewsCard newsArticle={article} key={article.articleId} />;
        })}
      </div>
      {searchResults.nextPage && (
        <div
          className={`${styles.pageChangeButtons} flex flex-center flex-gap-1`}
        >
          <Link
            href={`/news/search?keywords=${params.get("keywords")}${
              //Checks if user has request for nextpage
              params.get("page") !== null ? "&page=" + params.get("page") : ""
            }`}
          ></Link>
          <Button className="btn-gradient flex flex-center">
            Next Page <FaArrowRight />
          </Button>
        </div>
      )}
    </div>
  );
}
//The further development includes having the ability to change pages. But to reduce the netork traffic
// The data will be fetched on the server and the page will be SSR excluding the pageChange Buttons
