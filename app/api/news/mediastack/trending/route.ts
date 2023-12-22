import { NewsOverview } from "@/public/types/News";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const country: string = searchParams.get("country") || "us";
  const res = await fetch(
    `http://api.mediastack.com/v1/news?access_key=${process.env.MEDIASTACK_API_KEY}&categories=general&languages=en`,

    { next: { revalidate: 4000 } }
  );
  const data = await res.json();
  console.info("INFO: Fetching Data for Trending...");
  console.info(data);
  if (!data?.error) {
    const headlines: NewsOverview[] =
      data.data.length > 0
        ? data.data.map((article: any) => {
            const articleData: NewsOverview = {
              articleId: article.url,
              title: article.title,
              img: article.image,
              description: article.description,
              category: article.source,
            };
            return articleData;
          })
        : ([] as NewsOverview[]);
    return Response.json(headlines);
  } else {
    return Response.json([]);
  }
}
