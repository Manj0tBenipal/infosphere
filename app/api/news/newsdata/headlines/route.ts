import FullArticle, { Headline } from "@/public/types/News";

//   Data is used in the Carousel Component of news page
export async function GET(request: Request) {
  //Retrieving searchParams from the URL
  const { searchParams } = new URL(request.url);

  /**
   * returns general headlines when there is no searchParam in the URL
   */

  const res = await fetch(
    `https://newsdata.io/api/1/news?apikey=${process.env.NEWSDATA_API_KEY}&image=1&language=en&size=10`,
    {
      next: {
        //Data is revalidated after every 1hr
        revalidate: 4000,
      },
    }
  );
  const data = await res.json();
  //Response is sent when data is requestd by the route handler of full article page
  //Since the request is chached only a single API call is made to serve the data to carousel and article page
  const headlines: FullArticle[] =
    data?.results?.length > 0
      ? data.results.map((article: any) => {
          const headline: FullArticle = {
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
          return headline;
        })
      : [];
  //A short overview of the headlines to display in the carousel
  //This is done to minimize the network traffic
  const headlinesOverview: Headline[] = headlines.map((el: any) => {
    const headline: Headline = {
      id: el.articleId,
      img: el.img,
      title: el.title,
    };
    return headline;
  });
  if (searchParams.get("full") === "true") return Response.json(headlines);
  return Response.json(headlinesOverview);
}
