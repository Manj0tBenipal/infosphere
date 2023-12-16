import { Headline } from "@/public/types/News";

//   Data is used in the Carousel Component of news page
export async function GET(request: Request) {
  //Retrieving searchParams from the URL
  const { searchParams } = new URL(request.url);
  const { id, page } = {
    id: searchParams.get("id"),
    page: searchParams.get("page"),
  };

  /**
   * returns general headlines when there is no searchParam in the URL
   */
  if (!(id || page)) {
    const newsData = await fetch(
      `https://newsdata.io/api/1/news?apikey=${process.env.NEWSDATA_API_KEY}&image=1&language=en&size=10`,
      {
        next: {
          //Data is revalidated after every 15min
          revalidate: 900,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
    const headlines = await newsData.results.map((el: any) => {
      const headline: Headline = {
        id: el.article_id,
        img: el.image_url || null,
        title: el.title || null,
      };
      return headline;
    });
    return Response.json(headlines);
  }
}
//   const gNews = await fetch(
//     `https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=us&max=10&apikey=${process.env.GNEWS_API_KEY}`
//   )
//     .then((res) => res.json())
//     .then((data) => {
//       return data;
//     });
//   const mediaStack = await fetch(
//     `http://api.mediastack.com/v1/news?access_key=${process.env.MEDIA_STACK_API_KEY}&sources=business,-sports`
//   )
//     .then((res) => res.json())
//     .then((data) => {
//       return data;
//     });
