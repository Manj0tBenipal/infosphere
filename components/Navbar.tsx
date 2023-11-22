import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "@/styles/nav.module.css";
export default function Navbar() {
  return (
    <nav className={` ${styles.nav}  flex flex-between`}>
      <Link href={"/"} className="logo">
        <Image
          priority
          src="/logo.png"
          width={65}
          height={65}
          style={{ objectFit: "cover" }}
          alt="logo"
        />
      </Link>
      <div className="flex-center">
        <Link className={styles.link} href="/categories">
          Weather
        </Link>
        <Link className={styles.link} href="/categories">
          Guides
        </Link>
        <Link className={styles.link} href="/news">
          News
        </Link>
      </div>
    </nav>
  );
}
