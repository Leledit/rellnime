"use client";
import { useState } from "react";
import styles from "./index.module.scss";

interface IProps {
  dataRecentlyAdded: any[];
}

export default function UserCarrousel({ dataRecentlyAdded }: IProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    const newIndex =
      currentIndex === dataRecentlyAdded.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToPrevSlide = () => {
    const newIndex =
      currentIndex === 0 ? dataRecentlyAdded.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  return (
    <div className={styles.containerCarousel}>
      <div
        className={styles.carouselInner}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {dataRecentlyAdded.map((item, index) => (
          <div className={styles.carouselItem} key={index}>
            {item.name}
          </div>
        ))}
      </div>
      <button
        className={styles.carouselControl + " " + styles.prev}
        onClick={goToPrevSlide}
      >
        &#10094;
      </button>
      <button
        className={styles.carouselControl + " " + styles.next}
        onClick={goToNextSlide}
      >
        &#10095;
      </button>
    </div>
  );
}
