/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import styles from "./index.module.scss";

interface IProps {
  dataRecentlyAdded: any[];
}

export default function UserCarrousel({ dataRecentlyAdded }: IProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesPerSlide, setImagesPerSlide] = useState(1);

  const totalSlides = Math.ceil(dataRecentlyAdded.length / imagesPerSlide);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 1810) {
        setImagesPerSlide(5);
      } else if (screenWidth >= 1410) {
        setImagesPerSlide(4);
      } else if (screenWidth >= 992) {
        setImagesPerSlide(3);
      } else if (screenWidth >= 710) {
        setImagesPerSlide(2);
      } else {
        setImagesPerSlide(1);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const goToNextSlide = () => {
      const newIndex = currentIndex === totalSlides - 1 ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
    };

    const intervalId = setInterval(goToNextSlide, 4000);

    return () => clearInterval(intervalId);
  }, [currentIndex, totalSlides]);

  const goToNextSlide = () => {
    const newIndex = currentIndex === totalSlides - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToPrevSlide = () => {
    const newIndex = currentIndex === 0 ? totalSlides - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className={styles.containerCarousel}>
      <h2 className={styles.carouselTitle}>Adicionados recentemente </h2>
      <div
        className={styles.carouselInner}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {dataRecentlyAdded.map((item, index) => (
          <div className={styles.carouselItem} key={index}>
            <img
              className={styles.carouselItemImg}
              alt="Imagem de um titulo adicionado recentemente"
              src={item.urlImg}
            />
          </div>
        ))}
      </div>
      <button
        className={styles.carouselControl + " " + styles.prev}
        onClick={goToPrevSlide}
      />
      <button
        className={styles.carouselControl + " " + styles.next}
        onClick={goToNextSlide}
      />
      <hr className={styles.lineDetail} />
    </div>
  );
}
