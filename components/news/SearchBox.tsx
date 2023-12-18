"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import styles from "@/styles/news.module.css";
import { Button, Input } from "@mui/joy";
import { FaSearch } from "react-icons/fa";

export default function SearchBox() {
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  return (
    <>
      <div
        className={`${styles.searchWrapper} flex flex-center flex-column pa`}
      >
        <h1 className="fontXL text-light">What&apos;s on your mind?</h1>
        <img
          src="/svg/news/newsWave.svg"
          className={styles.searchWave}
          alt="news"
        />
        <div className={`${styles.searchInput} `}>
          <Input
            startDecorator={<FaSearch />}
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            endDecorator={
              <Button>
                <Link href={`/news/search?keywords=${searchKeyword}`}>
                  Search
                </Link>
              </Button>
            }
            placeholder="Comma separated 'USA', 'Heros' or a single keyword"
            sx={{
              "--Input-gap": "18px",
              "--Input-radius": "50px",
              "--Input-focusedThickness": "2px",
              "--Input-minHeight": "63px",
              "--Input-decoratorChildHeight": "46px",
            }}
          />
        </div>
      </div>
    </>
  );
}
