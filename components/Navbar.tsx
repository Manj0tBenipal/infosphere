"use client";
import Link from "next/link";
import React from "react";
import styles from "@/styles/nav.module.css";
import { FaBars } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { usePathname } from "next/navigation";
export default function Navbar() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const path = usePathname();
  console.log(path);
  return (
    <>
      <button
        onClick={() => {
          setMenuOpen(true);
        }}
      >
        <FaBars className={styles.bars} size={32} />
      </button>
      <nav
        className={`${styles.nav}`}
        style={{ transform: `translateX(${menuOpen ? "0%" : "-100%"})` }}
      >
        <div
          className={`${styles.navList} flex flex-center flex-column flex-gap-1`}
        >
          <RxCross1
            size={32}
            className={styles.cross}
            onClick={() => setMenuOpen(false)}
          />
          <Link
            className={styles.link}
            href="/"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            className={styles.link}
            href="/weather"
            onClick={() => setMenuOpen(false)}
          >
            Weather
          </Link>
          <Link
            className={styles.link}
            href="/guides"
            onClick={() => setMenuOpen(false)}
          >
            Guides
          </Link>
          <Link
            className={styles.link}
            href="/news"
            onClick={() => setMenuOpen(false)}
          >
            News
          </Link>
        </div>
      </nav>
    </>
  );
}
