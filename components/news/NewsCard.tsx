import { NewsOverview } from "@/public/types/News";
import { AspectRatio, Card, Typography } from "@mui/joy";
import Link from "next/link";

export default function NewsCard({
  newsArticle,
}: {
  newsArticle: NewsOverview;
}) {
  return (
    <Link href={``}>
      <Card variant="outlined">
        <AspectRatio minHeight={150} maxHeight={200}>
          <img src={newsArticle.img} loading="lazy" alt="" />
        </AspectRatio>
        <div>
          <Typography level="title-lg">
            {newsArticle.title.length > 30
              ? newsArticle.title.slice(0, 30) + "..."
              : newsArticle.title}{" "}
          </Typography>
        </div>
      </Card>
    </Link>
  );
}
