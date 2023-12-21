import { NewsOverview } from "@/public/types/News";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const country: string = searchParams.get("country") || "us";
  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${process.env.NEWSAPI_API_KEY}`
  );
  const data = await res.json();
  if (data.status === "ok") {
    const headlines: NewsOverview[] =
      data.articles.length > 0
        ? data.articles.map((article: any) => {
            const articleData: NewsOverview = {
              articleId: article.url,
              title: article.title,
              img: article.urlToImage,
              description: article.description,
              category: article.source.name,
            };
            return articleData;
          })
        : ([] as NewsOverview[]);
    return Response.json(headlines);
  } else {
    return Response.json([]);
  }
}
