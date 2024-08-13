import React from "react";
import styles from "./Carousel.module.css";
import { Image, Carousel as AntCarousel } from 'antd';

import carouselImage1 from "../../assets/images/carousel_1.jpg";
import carouselImage2 from "../../assets/images/carousel_2.jpg";
import carouselImage3 from "../../assets/images/carousel_3.jpg";

import smallImage1 from "../../assets/images/small_1.jpg";
import smallImage2 from "../../assets/images/small_2.jpg";
import smallImage3 from "../../assets/images/small_3.jpg";
import smallImage4 from "../../assets/images/small_4.jpg";
import smallImage5 from "../../assets/images/small_5.jpg";
import smallImage6 from "../../assets/images/small_6.jpg";
import smallImage7 from "../../assets/images/small_7.jpg";
import smallImage8 from "../../assets/images/small_8.jpg";

// 酒店推荐图片导入
import hotelImage1 from "../../assets/images/hotel_1.jpg";
import hotelImage2 from "../../assets/images/hotel_2.jpg";
import hotelImage3 from "../../assets/images/hotel_3.jpg";
import hotelImage4 from "../../assets/images/hotel_4.jpg";

export const Carousel: React.FC = () => {
  return (
    <div>
      <AntCarousel autoplay className={styles.slider}>
        <Image src={carouselImage1} />
        <Image src={carouselImage2} />
        <Image src={carouselImage3} />
      </AntCarousel>

      <div className={styles.recommendedSection}>
        <h2>根据住宿类型浏览</h2>
        <div className={styles.hotelContainer}>
          <div className={styles.hotelItem}>
            <Image src={hotelImage1} className={styles.hotelImage} />
            <p className={styles.hotelTitle}>酒店</p>
          </div>
          <div className={styles.hotelItem}>
            <Image src={hotelImage2} className={styles.hotelImage} />
            <p className={styles.hotelTitle}>公寓</p>
          </div>
          <div className={styles.hotelItem}>
            <Image src={hotelImage3} className={styles.hotelImage} />
            <p className={styles.hotelTitle}>度假村</p>
          </div>
          <div className={styles.hotelItem}>
            <Image src={hotelImage4} className={styles.hotelImage} />
            <p className={styles.hotelTitle}>别墅</p>
          </div>
        </div>
      </div>

      {/* <div className={styles.recommendedSection}>
        <h2>景点推荐</h2>
        <div className={styles.additionalImages}>
          <div className={styles.imageContainer}>
            <Image src={smallImage1} className={styles.smallImage} />
            <p className={styles.imageDescription}>这是第一张图片的描述</p>
          </div>
          <div className={styles.imageContainer}>
            <Image src={smallImage2} className={styles.smallImage} />
            <p className={styles.imageDescription}>这是第二张图片的描述</p>
          </div>
          <div className={styles.imageContainer}>
            <Image src={smallImage3} className={styles.smallImage} />
            <p className={styles.imageDescription}>这是第三张图片的描述</p>
          </div>
          <div className={styles.imageContainer}>
            <Image src={smallImage4} className={styles.smallImage} />
            <p className={styles.imageDescription}>这是第四张图片的描述</p>
          </div>
          <div className={styles.imageContainer}>
            <Image src={smallImage5} className={styles.smallImage} />
            <p className={styles.imageDescription}>这是第五张图片的描述</p>
          </div>
          <div className={styles.imageContainer}>
            <Image src={smallImage6} className={styles.smallImage} />
            <p className={styles.imageDescription}>这是第六张图片的描述</p>
          </div>
          <div className={styles.imageContainer}>
            <Image src={smallImage7} className={styles.smallImage} />
            <p className={styles.imageDescription}>这是第七张图片的描述</p>
          </div>
          <div className={styles.imageContainer}>
            <Image src={smallImage8} className={styles.smallImage} />
            <p className={styles.imageDescription}>这是第八张图片的描述</p>
          </div>
        </div>
      </div> */}
    </div>
  );
}