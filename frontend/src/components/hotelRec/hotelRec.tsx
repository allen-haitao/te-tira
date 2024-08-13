import React from "react";
import styles from "./hotelRec.module.css";
import { Image } from 'antd';

// 酒店推荐图片导入
import hotelImage1 from "../../assets/images/hotel_1.jpg";
import hotelImage2 from "../../assets/images/hotel_2.jpg";
import hotelImage3 from "../../assets/images/hotel_3.jpg";
import hotelImage4 from "../../assets/images/hotel_4.jpg";



interface HotelRecProps {
  title: React.ReactNode;  // title 属性的类型
}

export const HotelRec: React.FC<HotelRecProps> = ({ title }) => {
  return (
    <div className={styles.recommendedSection}>
      {title}  {/* 使用传入的 title */}
      <div className={styles.additionalImages}>
        <div className={styles.imageContainer}>
          <Image src={hotelImage1} className={styles.smallImage} />
          <p className={styles.imageDescription}>这是第一张图片的描述</p>
        </div>
        <div className={styles.imageContainer}>
          <Image src={hotelImage2} className={styles.smallImage} />
          <p className={styles.imageDescription}>这是第二张图片的描述</p>
        </div>
        <div className={styles.imageContainer}>
          <Image src={hotelImage3} className={styles.smallImage} />
          <p className={styles.imageDescription}>这是第三张图片的描述</p>
        </div>
        <div className={styles.imageContainer}>
          <Image src={hotelImage4} className={styles.smallImage} />
          <p className={styles.imageDescription}>这是第四张图片的描述</p>
        </div>
      </div>
    </div>
  );
}
