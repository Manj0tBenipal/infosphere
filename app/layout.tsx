import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { IoMdWarning } from "react-icons/io";
import Navbar from "@/components/Navbar";
import "@/styles/global.css";
import Image from "next/image";
import styles from "@/styles/home.module.css";
import Footer from "@/components/news/Footer";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body suppressHydrationWarning={true}>
        <p className="ud">
          <IoMdWarning />
          This Project is still in Development
        </p>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
