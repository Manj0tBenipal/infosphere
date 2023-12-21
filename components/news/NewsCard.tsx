import { NewsOverview } from "@/public/types/News";
import { AspectRatio, Card, Typography } from "@mui/joy";
import Link from "next/link";
import styles from "@/styles/news.module.css";
/**
 * @param newsArticle The news article to be displayed
 * @param page The page from which the article is being displayed
 * @param keywords The keywords used to search for the article
 * @returns A card displaying the news article
 *
 * The @page and @keywords are only used when the card used in the search page
 * The card is also used in landing page of news route which does not need the card to have these props
 */
export default function NewsCard({
  newsArticle,
  page,
  keywords,
  parent,
}: {
  newsArticle: NewsOverview;
  page: string | null;
  keywords: string | null;
  parent: string;
}) {
  return (
    <Link
      href={
        //The parent property is used to determine the route to which the card should link
        //If in search page the link includes the search keywords and the page
        //If in headlines page the link includes the articleId which is the link to the original source of the article
        parent === "search"
          ? `/news/article?ref=search${page ? "&page=" + page : ""}&articleId=${
              newsArticle.articleId
            }${keywords ? "&keywords=" + keywords : ""}`
          : newsArticle.articleId
      }
      className={styles.newsCard}
    >
      <Card variant="outlined">
        <AspectRatio minHeight={150} maxHeight={200}>
          <img src={newsArticle.img} loading="lazy" alt="" />
        </AspectRatio>
        <div>
          <Typography level="title-lg">
            {newsArticle.title.length > 80
              ? newsArticle.title.slice(0, 80) + "..."
              : newsArticle.title}{" "}
          </Typography>
          <Typography level="body-sm">
            {newsArticle.description?.length > 100
              ? newsArticle.description.slice(0, 100) + "..."
              : newsArticle.description}
          </Typography>
        </div>
      </Card>
    </Link>
  );
}
