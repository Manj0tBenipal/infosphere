"use client";
import Link from "next/link";
import React from "react";
import styles from "@/styles/nav.module.css";
import { FaBars, FaCross } from "react-icons/fa";
export default function Navbar() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  console.log(menuOpen);
  return (
    <>
      <button
        onClick={() => {
          setMenuOpen(true);
        }}
      >
        <FaBars className={styles.bars} size={22} />
      </button>
      <nav
        className={`${styles.nav}`}
        style={{ right: `${menuOpen ? "0%" : "-100%"}` }}
      >
        <div className={`${styles.navList} flex flex-center flex-column `}>
          <FaCross
            size={22}
            className={styles.cross}
            onClick={() => setMenuOpen(false)}
          />
          <Link className={styles.link} href="/weather">
            Weather
          </Link>
          <Link className={styles.link} href="/guides">
            Guides
          </Link>
          <Link className={styles.link} href="/news">
            News
          </Link>
        </div>
      </nav>
    </>
  );
}
