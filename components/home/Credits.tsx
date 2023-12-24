import { CreditHolder, credits } from "@/public/data/credits";
import { Card } from "@mui/joy";
import styles from "@/styles/home.module.css";
import Image from "next/image";
import { FaCloud } from "react-icons/fa";
export default function Credits() {
  return (
    <div className={`${styles.credits} flex flex-center flex-wrap flex-gap-1 width-full`}>
      {credits.map((credit: CreditHolder) => {
        return (
          <div
            className={`${styles.creditHolderCard} flex flex-center flex-column`}
          >
            {credit.img ?(
              <Image src={credit.img} width={150} height={150} alt="logo" />):
              <FaCloud color={"skyblue"} size={150} />
            }
            <p>{credit.name}</p>
          </div>
        );
      })}
    </div>
  );
}
