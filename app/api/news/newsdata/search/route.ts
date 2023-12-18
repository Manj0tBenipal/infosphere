import { NewsOverview, NewsSearch } from "@/public/types/News";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const keywords: any = url.searchParams.get("keywords");
  const page: any = url.searchParams.get("page");
  console.log(
    `https://newsdata.io/api/1/news?apikey=${
      process.env.NEWSDATA_API_KEY
    }&image=1&language=en&qInTitle=${keywords}${
      //Checks if user has request for nextpage
      page !== null ? "&page=" + page : ""
    }`
  );
  const response = await fetch(
    `https://newsdata.io/api/1/news?apikey=${
      process.env.NEWSDATA_API_KEY
    }&image=1&language=en&qInTitle=${keywords}${
      //Checks if user has request for nextpage
      page !== null ? "&page=" + page : ""
    }`,
    {
      next: {
        //Data is revalidated after every 1hr
        revalidate: 4000,
      },
    }
  );

  const data = await response.json();
  const nextPage = data.nextPage;
  const articles: NewsOverview[] =
    data.results.length > 0
      ? data.results.map((article: any) => {
          const articleData: NewsOverview = {
            articleId: article.article_id,
            title: article.title,
            img: article.image_url,
            description: article.description,
            category: article.category,
          };
          return articleData;
        })
      : ([] as NewsOverview[]);
  const result: NewsSearch = {
    newsArticles: articles,
    nextPage: nextPage ? true : false,
    nextPageId: nextPage,
  };

  return Response.json(result);
}
