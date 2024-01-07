"use client";
import Link from "next/link";
import React from "react";
import styles from "@/styles/nav.module.css";
import { FaBars } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
export default function Navbar() {
  const { data, status } = useSession();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const path = usePathname();
  function isActive(currPath: string) {
    return path === currPath ? "active" : null;
  }
  return (
    <>
      <button className="btn-dark">
        {status === "authenticated" ? (
          <Link href="/api/auth/signout">
            <Image
              priority
              quality={100}
              src={
                data.user?.image ||
                "https://lh3.googleusercontent.com/a/ACg8ocL-g6p5_r6mxg9sydDyO-VIUKZruaJAgXikciMZC32Gq9E=s360-c-no"
              }
              height={32}
              width={32}
              alt="avatar"
            />
          </Link>
        ) : (
          <Link href="/api/auth/signin">Sign In</Link>
        )}
      </button>
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
            className={`${styles.link} ${isActive("/")}`}
            href="/"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            className={`${styles.link} ${isActive("/weather")}`}
            href="/weather"
            onClick={() => setMenuOpen(false)}
          >
            Weather
          </Link>
          <Link
            className={`${styles.link} ${isActive("/guides")}`}
            href="/guides"
            onClick={() => setMenuOpen(false)}
          >
            Guides
          </Link>
          <Link
            className={`${styles.link} ${isActive("/news")}`}
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
