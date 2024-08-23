import React from "react";
import { Image, Typography } from "antd";
import styles from "./Offer2.module.css";

interface PropsType {
  id: string | number;
  size: "large" | "small";
  title: string;
  price: number | string;
  imageSrc: string;
}

export const OfferImage: React.FC<PropsType> = ({ id, size, price, title, imageSrc }) => {
  return (
    <div className={styles.offerInfo}>
      <div className={styles.textContainer}>
        <div className={styles.offerText}>
          <Typography.Text type="secondary" className={styles.title}>
            {title}
          </Typography.Text>
          <Typography.Text type="danger" strong className={styles.price}>
            $ {price}
          </Typography.Text>
        </div>
      </div>
      <div className={styles.imageWrapper}>
        <Image
          src={imageSrc}
          className={styles.offerImage}
          preview={false}  // 禁用预览功能
        />
      </div>
    </div>
  );
};