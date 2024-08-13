import React from "react";
import styles from "./countryRecommend.module.css";
import { Image } from 'antd';

// 图片导入
import smallImage1 from "../../assets/images/small_1.jpg";
import smallImage2 from "../../assets/images/small_2.jpg";
import smallImage3 from "../../assets/images/small_3.jpg";
import smallImage4 from "../../assets/images/small_4.jpg";
import smallImage5 from "../../assets/images/small_5.jpg";
import smallImage6 from "../../assets/images/small_6.jpg";
import smallImage7 from "../../assets/images/small_7.jpg";
import smallImage8 from "../../assets/images/small_8.jpg";

// 定义 CountryRecommend 组件的 props 类型
interface CountryRecommendProps {
  title: React.ReactNode;  // title 属性的类型
}

export const CountryRecommend: React.FC<CountryRecommendProps> = ({ title }) => {
  return (
    <div className={styles.recommendedSection}>
      {title}  {/* 使用传入的 title */}
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
    </div>
  );
};
