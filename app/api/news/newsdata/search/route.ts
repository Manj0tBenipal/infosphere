import FullArticle, { NewsOverview, NewsSearch } from "@/public/types/News";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const keywords: any = url.searchParams.get("keywords");
  const page: any = url.searchParams.get("page");
  const full: boolean =
    (url.searchParams.get("full") === "true" ? true : false) || false;

  const response = await fetch(
    `https://newsdata.io/api/1/news?apikey=${
      process.env.NEWSDATA_API_KEY
    }&image=1&language=en&qInTitle=${keywords}&size=9${
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
  //Response is sent when data is requestd by the route handler of full article page
  const articles: FullArticle[] =
    data.results.length > 0
      ? data.results.map((article: any) => {
          const articleData: FullArticle = {
            articleId: article.article_id,
            title: article.title,
            img: article.image_url,
            description: article.description,
            category: article.category,
            country: article.country,
            creator: article.creator,
            content: article.content,
            language: article.language,
            link: article.link,
            pubDate: article.pubDate,
            source: article.source_id,
          };
          return articleData;
        })
      : ([] as FullArticle[]);

  //Contains truncated data from articles to minimize the network traffic
  const result: NewsSearch = {
    newsArticles: articles.map((article: FullArticle) => {
      const overview = {} as NewsOverview;
      overview.articleId = article.articleId;
      overview.title = article.title;
      overview.img = article.img;
      overview.description = article.description;
      overview.category = article.category;
      return overview;
    }),
    nextPage: nextPage ? true : false,
    nextPageId: nextPage,
  };
  if (full) {
    return Response.json(articles);
  }

  return Response.json(result);
}
