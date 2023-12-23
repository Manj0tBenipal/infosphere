import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { IoMdWarning } from "react-icons/io";
import Navbar from "@/components/Navbar";
import "@/styles/global.css";
import Image from "next/image";
import styles from "@/styles/home.module.css";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Image
          className={styles.cover}
          priority
          src={"/svg/home/stripes.svg"}
          fill
          alt="hero"
          style={{ objectFit: "cover" }}
        />
        <p className="ud">
          <IoMdWarning />
          This Project is still in Development
        </p>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
