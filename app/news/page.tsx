import ExternalSourcesNews from "@/components/news/ExternalSourcesNews";
import HeadlineCarousel from "@/components/news/Headline";
import SearchBox from "@/components/news/SearchBox";
import styles from "@/styles/news.module.css";
export default function NewsPage() {
  return (
    <div className={`${styles.newsWrapper}`}>
      <h1 className="primary-gradient-font font2XL">Stories of the Navjot</h1>
      <div className={`${styles.hero} flex flex-gap-1 flex-wrap`}>
        <div className={`${styles.headlinesWrapper}`}>
          <HeadlineCarousel />
        </div>
        <div className={`${styles.externalWrapper}`}>
          <ExternalSourcesNews />
        </div>
        <div className={`${styles.searchWrapper}`}>
          <SearchBox />
        </div>
      </div>
    </div>
  );
}
