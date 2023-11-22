import HeadlineCarousel from "@/components/news/Headline";
import styles from "@/styles/news.module.css";
export default function NewsPage() {
  return (
    <div className={`${styles.newsWrapper}`}>
      <div className={`${styles.hero}`}>
        <HeadlineCarousel />
        <div
          className={`${styles.sidebar} flex flex-column flex-scroll-y`}
        >
          
        </div>
      </div>
    </div>
  );
}
