"use client";
import Link from "next/link";
import { useState } from "react";

export default function SearchBox() {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  return (
    <div>
      <input
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        type="text"
        placeholder="Comma separated or a single keyword"
      />
      <Link href={`/news/search?keyword=${searchKeyword}`}>Search</Link>
    </div>
  );
}
