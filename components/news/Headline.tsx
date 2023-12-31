"use client";
/**
 * Since this component uses SwiperJS, it is not SSR compatible.
 * This is because the SliderJS library uses window object which is not available on the server.
 *
 */

import { FaArrowRight } from "react-icons/fa";
import { Headline } from "@/public/types/News";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import styles from "@/styles/news.module.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Link from "next/link";
import Image from "next/image";

export default function HeadlineCarousel() {
  const [headlines, setHeadlines] = useState<Headline[]>([] as Headline[]);
  useEffect(() => {
    async function getHeadlines() {
      const res = await fetch(`/api/news/newsdata/headlines`);
      const data = await res.json();
      setHeadlines(data);
    }
    if (headlines.length === 0) {
      getHeadlines();
    }
  }, []);
  const headlineElements = headlines.map((el: Headline) => {
    return (
      <SwiperSlide key={el.id}>
        <div
          className={`${styles.headlineSlide} flex flex-column
    `}
        >
          <Link
            className={`btn-primary ${styles.readButton}`}
            href={`/news/article?ref=headlines&articleId=${el.id}`}
          >
            Read <FaArrowRight />
          </Link>
          <Image
            priority
            src={el.img || "/svg/newsHeadline.svg"}
            alt="headlineImage"
            fill
            style={{ objectFit: "cover" }}
          />
          <div className={`${styles.headlineContent}`}>
            <h2 style={{ fontWeight: 400 }}>
              {el.title && el.title.length > 100
                ? el.title.slice(0, 99) + "..."
                : el.title}
            </h2>
          </div>
        </div>
      </SwiperSlide>
    );
  });
  return (
    <>
      {headlines.length > 0 && (
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          slidesPerView={1}
          pagination={{
            clickable: true,
          }}
          direction="horizontal"
          autoplay={true}
          navigation={{
            nextEl: ".headline-carousel-next",
            prevEl: ".headline-corousel-prev",
          }}
        >
          {headlineElements}
        </Swiper>
      )}
    </>
  );
}
