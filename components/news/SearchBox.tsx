"use client";
import Link from "next/link";
import { useState } from "react";

export default function SearchBox() {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  console.log(searchKeyword)
  return (
    <div>
      <input
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        type="text"
        placeholder="Comma separated or a single keyword"
      />
      <Link href={`/news/search?keywords=${searchKeyword}`}>Search</Link>
    </div>
  );
}
