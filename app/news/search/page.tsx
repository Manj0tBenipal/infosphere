import { Suspense } from "react";
import { NewsOverview, NewsSearch } from "@/public/types/News";
import NewsCard from "@/components/news/NewsCard";
import PageSwitchButtons from "./PageSwitchButtons";
export default async function SearchResults({
  searchParams,
}: {
  searchParams: { keywords: string; page: string | undefined };
}) {
  const res = await fetch(
    `${process.env.DEV_URL}/api/news/newsdata/search?keywords=${
      searchParams.keywords
    }${
      //Checks if user has request for nextpage
      searchParams?.page ? "&page=" + searchParams.page : ""
    }`,
    {
      next: {
        revalidate: 4000,
      },
    }
  );
  const searchResults: NewsSearch = await res.json();

  return (
    <div className="flex flex-center flex-column flex-gap-1">
      <h1 className="fontXL primary-gradient-font">
        Search Results for &quot;{searchParams.keywords}&quot;
      </h1>

      <div className="flex flex-center flex-gap-1 flex-wrap">
        {searchResults?.newsArticles?.map((article: NewsOverview) => {
          return <NewsCard newsArticle={article} key={article.articleId} />;
        })}
      </div>
      {/* Suspense Boundary Prevents the entire /search route upto the nearest suspense boundary
      be rendred on client.
      The use od useSearchParams hook results in this behaviour.
       */}
      <Suspense>
        <PageSwitchButtons nextPage={searchResults.nextPageId} />
      </Suspense>
    </div>
  );
}
