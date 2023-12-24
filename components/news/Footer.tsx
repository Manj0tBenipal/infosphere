import styles from "@/styles/footer.module.css";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
export default function Footer() {
  return (
    <div className={`${styles.container} flex flex-center flex-gap-1`}>
        <img className={styles.wave} src={`/svg/home/wave.svg`} alt="wave"  />
      <Link
        className="flex flex-center"
        href={"https://www.linkedin.com/in/manjot-benipal-01a503293"}
        target="_blank"
      >
        <FaLinkedin size={32} />
      </Link>
      <Link
        className="flex flex-center"
        href="https://github.com/Manj0tBenipal"
        target="_blank"
      >
        <FaGithub size={32} />
      </Link>
    </div>
  );
}
