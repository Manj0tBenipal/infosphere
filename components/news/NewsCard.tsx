import { NewsOverview } from "@/public/types/News";
import { AspectRatio, Card, Typography } from "@mui/joy";
import Link from "next/link";
import styles from "@/styles/news.module.css";
export default function NewsCard({
  newsArticle,
  page,
  keywords,
}: {
  newsArticle: NewsOverview;
  page: string | undefined;
  keywords: string;
}) {
  return (
    <Link
      href={`/news/article?ref=search${page ? "&page=" + page : ""}&articleId=${
        newsArticle.articleId
      }${keywords ? "&keywords=" + keywords : ""}`}
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
