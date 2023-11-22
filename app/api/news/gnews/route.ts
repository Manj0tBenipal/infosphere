import { ExternalHeadline, Headline } from "@/public/types/News";

//   Data is used in the hero sidebar of news page
export async function GET() {
  const newsData = await fetch(
    `https://gnews.io/api/v4/top-headlines?category=general&apikey=${process.env.GNEWS_API_KEY}`,
    {
      next: {
        //Data is revalidated after every 15min
        revalidate: 90063,
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
  const headlines = await newsData.articles.map((el: any) => {
    const headline: ExternalHeadline = {
      url: el.url,
      img: el.image || null,
      title: el.title || null,
      source: el.source.name || null,
    };
    return headline;
  });

  return Response.json(headlines);
}
