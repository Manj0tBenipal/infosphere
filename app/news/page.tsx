import ExternalSourcesNews from "@/components/news/ExternalSourcesNews";
import HeadlineCarousel from "@/components/news/Headline";
import NewsCard from "@/components/news/NewsCard";
import SearchBox from "@/components/news/SearchBox";
import { NewsOverview } from "@/public/types/News";
import styles from "@/styles/news.module.css";

//Planned Feature:
//This route is rendered at request and the data is not chached by the server
//This is to support fetching of news based on country
//The search param would change based on the country selected by the user

export const dynamic = "force-dynamic";
export default async function NewsPage() {
  console.info("PAGE: Fetching trending articles");

  const trendingArticlesRes = await fetch(
    `${process.env.APP_URL}/api/news/mediastack/trending`,
    { next: { revalidate: 4000 } }
  );
  const trendingArticles = await trendingArticlesRes.json().catch((err) => {
    console.error(err);
    return [];
  });

  console.log(trendingArticles);
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
      {trendingArticles?.length > 0 && (
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
      )}
    </div>
  );
}
