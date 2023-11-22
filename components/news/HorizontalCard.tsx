import { ExternalHeadline, Headline } from "@/public/types/News";
import styles from "@/styles/news.module.css";
import Image from "next/image";
import Link from "next/link";
export default function HorizontalCard({
  headline,
}: {
  headline: ExternalHeadline;
}) {
  return (
    <Link
      href={headline.url}
      className={`${styles.externalHeadline} flex flex-gap-small`}
    >
      <Image
        src={headline.img}
        alt="headlineImage"
        width={75}
        height={75}
        quality={100}
        style={{ objectFit: "cover" }}
      />
      <h5>{headline.title}</h5>
      <span className={`${styles.headlineSource} txt-light`}>
        {headline.source}
      </span>
    </Link>
  );
}
