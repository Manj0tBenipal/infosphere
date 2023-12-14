import { ExternalHeadline } from "@/public/types/News";
import HorizontalCard from "./HorizontalCard";
import styles from "@/styles/news.module.css";

/**
 * This route is Revalidated(A server-side re-render is triggered every 15min)
 * and the cache is revalidated with the new updated data from the API
 */
export const revalidate = 900;
export default async function ExternalSourcesNews() {
  const newsData = await fetch(
    `https://gnews.io/api/v4/top-headlines?category=general&apikey=${process.env.GNEWS_API_KEY}`,
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
  const headlines = await newsData.articles.map((el: any) => {
    const headline: ExternalHeadline = {
      url: el.url,
      img: el.image || null,
      title: el.title || null,
      source: el.source.name || null,
    };
    return headline;
  });

  return (
    <>
      <h2>Explore External Sources</h2>
      <div
        className={`${styles.externalHeadlinesList} flex flex-wrap flex-scroll-y flex-between flex-gap-small `}
      >
        {headlines.map((el: ExternalHeadline) => {
          return <HorizontalCard key={el.url} headline={el} />;
        })}
      </div>
    </>
  );
}
