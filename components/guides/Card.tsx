import { Guide } from "@/public/types/Guide";
import Link from "next/link";
import { Card, AspectRatio, Typography } from "@mui/joy";
import { ReactElement } from "react";
import newsStyles from "@/styles/news.module.css";
export default function CardComponent({ data }: { data: Guide }): ReactElement {
  return (
    <Link href={`/guides?gID=${data.id}`}>
      <Card variant="outlined" className={newsStyles.newsCard}>
        <AspectRatio minHeight={150} maxHeight={200}>
          <img
            src={data.img?.url || process.env.IMAGE_NOT_FOUND_URL}
            loading="lazy"
            alt=""
          />
        </AspectRatio>
        <div>
          <Typography level="title-lg">
            {data.title.length > 80
              ? data.title.slice(0, 80) + "..."
              : data.title}
          </Typography>
          <Typography level="body-sm">
            {data.content.length > 100
              ? data.content.slice(0, 100) + "..."
              : data.content}
          </Typography>
        </div>
      </Card>
    </Link>
  );
}
