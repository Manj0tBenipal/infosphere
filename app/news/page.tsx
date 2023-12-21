import ExternalSourcesNews from "@/components/news/ExternalSourcesNews";
import HeadlineCarousel from "@/components/news/Headline";
import NewsCard from "@/components/news/NewsCard";
import SearchBox from "@/components/news/SearchBox";
import { NewsOverview } from "@/public/types/News";
import styles from "@/styles/news.module.css";
export default async function NewsPage() {
  const trendingArticlesRes = await fetch(
    `${process.env.APP_URL}/api/news/newsapi/trending`,
    { next: { revalidate: 4000 } }
  );
  const trendingArticles = await trendingArticlesRes.json();
  return (
    <div className={`${styles.newsWrapper} flex flex-gap-2 flex-column`}>
      <h1 className="primary-gradient-font fontXL">Stories of the Day</h1>
      <div className={`${styles.hero} flex flex-gap-1 flex-wrap`}>
        <div className={`${styles.headlinesWrapper}`}>
          <HeadlineCarousel />
        </div>
        <div className={`${styles.externalWrapper}`}>
          <ExternalSourcesNews />
        </div>
      </div>
      <SearchBox />
      <div className="flex flex-center flex-column flex-gap-1">
        <h2
          className="fontL primary-gradient-font"
          style={{ textAlign: "left", width: "100%" }}
        >
          Trending
        </h2>
        <div className="flex flex-center flex-wrap flex-gap-small">
          {trendingArticles?.map((article: NewsOverview) => (
            <NewsCard
              key={article.articleId}
              parent="landing"
              newsArticle={article}
              page={null}
              keywords={null}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
