"use client";
import styles from "@/styles/news.module.css";
import { Button } from "@mui/joy";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
export default function PageSwitchButtons({ nextPage }: { nextPage: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  return (
    <div className={`${styles.pageChangeButtons} flex flex-center flex-gap-1`}>
      {searchParams.get("page") && (
        <Button
          onClick={() => router.back()}
          style={{ background: "black" }}
          className="btn-dark flex flex-center flex-gap-small"
        >
          <FaArrowLeft /> Previous Page
        </Button>
      )}
      {/* Uses the ID of nextPage passed from the parent.The id is included in the
      API response */}
      {nextPage && (
        <Link
          href={`/news/search?keywords=${searchParams.get("keywords")}${
            "&page=" + nextPage
          }`}
        >
          <Button className="btn-gradient flex flex-center flex-gap-small">
            Next Page <FaArrowRight />
          </Button>
        </Link>
      )}
    </div>
  );
}
