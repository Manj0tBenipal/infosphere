import { IoMdWarning } from "react-icons/io";
import Navbar from "@/components/Navbar";
import "@/styles/global.css";
import SessionProvider from "@/components/SessionProvider";
import { getServerSession } from "next-auth";
import Footer from "@/components/news/Footer";
import { authOptions } from "@/config/nextauth";
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body suppressHydrationWarning={true}>
        <SessionProvider session={session}>
          <p className="ud">
            <IoMdWarning />
            This Project is still in Development
          </p>
          <Navbar />
          {children}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
