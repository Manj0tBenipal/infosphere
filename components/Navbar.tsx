import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "@/styles/nav.module.css";
export default function Navbar() {
  return (
    <nav className={` ${styles.nav}  flex flex-between`}>
      <div className="logo">
        <Image
          priority
          src="/logo.png"
          width={55}
          height={55}
          style={{ objectFit: "cover" }}
          alt="logo"
        />
      </div>
      <div className="flex-center">
        <Link className={styles.link} href="/categories">
          Weather
        </Link>
        <Link className={styles.link} href="/categories">
          Guides
        </Link>
        <Link className={styles.link} href="/categories">
          News
        </Link>
      </div>
    </nav>
  );
}
