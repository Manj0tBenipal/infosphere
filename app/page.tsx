import styles from "@/styles/home.module.css";
import { services } from "@/public/data/services";
import Service from "@/components/Service";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@mui/joy";
export default function Page() {
  return (
    <main className={styles.main}>
      <div className={`${styles.hero} flex flex-column flex-center`}>
        <div className={`  width-full text-center ${styles.motto}`}>
          <h1 className="font2XL">Your One Stop Station for all </h1>
          <h1 className="font2XL">
            <span className="primary-gradient-font ">Information </span>
            Needs
          </h1>
        </div>
        <div className={`${styles.getStarted} text-center `}>
          <h3 className="description">
            Start browsing the Information we offer
          </h3>
          <Button className="btn-dark margin-top-1">Get Started</Button>
        </div>
        <div className={styles.cover}>
          <Image
            priority
            src={"/svg/home/stripes.svg"}
            fill
            alt="hero"
            style={{ objectFit: "cover" }}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100% 100%"
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              height: "20%",
              zIndex: -1,
            }}
          >
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: "rgb(164, 55, 219)" }} />
                <stop
                  offset="100%"
                  style={{ stopColor: "rgb(255, 11, 255)" }}
                />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#gradient)" />

            <line
              x1="0"
              y1="50%"
              x2="100%"
              y2="5%"
              stroke="white"
              stroke-width="5%"
            />
          </svg>
        </div>
      </div>

      <div
        className={`${styles.services} flex flex-column flex-gap-1 flex-center`}
      >
        <h1 className="fontL text-center primary-gradient-font">Services</h1>
        <div className={`flex flex-center flex-wrap flex-gap-small `}>
          {services.map((service) => (
            <Service key={service.name} service={service} />
          ))}
        </div>
      </div>
      <div className={`${styles.about} flex flex-center flex-between`}>
        <div className={`${styles.aboutContent} flex flex-column flex-center`}>
          <h1 className="fontL text-center primary-gradient-font">
            Open Source
          </h1>
          <p className="description text-center">
            <b>InfoSphere</b> is compeletely open source and free to use. You
            can even contribute to the project by clicking&nbsp;
            <Link
              href="https://github.com/Manj0tBenipal/infosphere"
              style={{ color: "var(--color-primary)" }}
            >
              here
            </Link>
            . The data we use is curated from public APIs.
          </p>
        </div>
        <Image
          priority
          src="/svg/opensource.svg"
          height={400}
          width={400}
          alt="opensource"
        />
      </div>
    </main>
  );
}
