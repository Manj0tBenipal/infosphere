import styles from "@/styles/home.module.css";
import { services } from "@/public/data/services";
import Service from "@/components/Service";
import WaveSVG from "./WaveSVG";
import Link from "next/link";
import Image from "next/image";
export default function page() {
  return (
    <main className={styles.main}>
      <div className={`${styles.hero} flex flex-column `}>
        <div className={`   width-full text-center ${styles.motto}`}>
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
          <button className="btn-dark margin-top-1">Get Started</button>
        </div>

        <WaveSVG className={styles.wave} />
      </div>
      <div className={`${styles.services}`}>
        <WaveSVG className={styles.invertedWave} />
        <h1 className="fontL text-center text-light">Services</h1>
        <div className={`flex flex-center  ${styles.wrapper}`}>
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
            can even contribute to the project by clicking
            <Link href="https://github.com/Manj0tBenipal/infosphere">here</Link>
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
