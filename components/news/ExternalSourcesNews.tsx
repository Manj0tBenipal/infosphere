import { ExternalHeadline, Headline } from "@/public/types/News";
import HorizontalCard from "./HorizontalCard";
import styles from "@/styles/news.module.css";

export const revalidate = 900;
export default async function ExternalSourcesNews() {
  const res = await fetch(`${process.env.SITE_URL}/api/news/gnews`);
  const externalArticles: ExternalHeadline[] = await res.json();
  return (
    <>
      <h2>Explore External Sources</h2>
      <div
        className={`${styles.externalHeadlinesList} flex-scroll-y `}
      >
        {externalArticles.map((el: ExternalHeadline) => {
          return <HorizontalCard key={el.url} headline={el} />;
        })}
      </div>
    </>
  );
}
