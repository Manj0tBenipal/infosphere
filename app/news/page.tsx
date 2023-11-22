import ExternalSourcesNews from "@/components/news/ExternalSourcesNews";
import HeadlineCarousel from "@/components/news/Headline";
import styles from "@/styles/news.module.css";
export default function NewsPage() {
  return (
    <div className={`${styles.newsWrapper}`}>
      <div className={`${styles.hero} flex flex-gap-1`}>
        <div className={`${styles.headlinesWrapper}`}>
          <HeadlineCarousel />
        </div>
        <div className={`${styles.externalWrapper}`}>
          <ExternalSourcesNews />
        </div>
      </div>
    </div>
  );
}
