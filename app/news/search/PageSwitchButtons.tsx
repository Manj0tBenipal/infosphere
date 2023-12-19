"use client";
import styles from "@/styles/news.module.css";
import { Button } from "@mui/joy";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";
export default function PageSwitchButtons({ nextPage }: { nextPage: string }) {
  const searchParams = useSearchParams();
  return (
    <div className={`${styles.pageChangeButtons} flex flex-center flex-gap-1`}>
      //Uses the ID of nextPage passed from the parent.The id is included in the
      API response
      <Link
        href={`/news/search?keywords=${searchParams.get("keywords")}${
          "&page=" + nextPage
        }`}
      >
        <Button className="btn-gradient flex flex-center">
          Next Page <FaArrowRight />
        </Button>
      </Link>
    </div>
  );
}
