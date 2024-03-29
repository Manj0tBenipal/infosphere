import { Service } from "@/public/types/Service";
import styles from "@/styles/service.module.css";
import { Button } from "@mui/joy";
import Image from "next/image";
import Link from "next/link";
export default function ServiceSection({ service }: { service: Service }) {
  return (
    <div
      className={`${styles.service} flex width-full flex-column flex-center text-center flex-gap-small`}
    >
      <Image src={service.image} height={150} width={150} alt="service" />
      <div className={`${styles.serviceText}  flex flex-column flex-gap-small`}>
        <h3>{service.name}</h3>
        <p>{service.details}</p>
        <Link href={service.link}>
          <Button className="btn-primary">Explore</Button>
        </Link>
      </div>
    </div>
  );
}
