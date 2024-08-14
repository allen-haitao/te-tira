import React from "react";
import styles from "./Offer2.module.css";
import { OfferImage } from "./OfferImage";  // 引入 OfferImage 组件

interface PropsType {
  button: JSX.Element;
  imageSrc: string;
  customClass?: string;
  products: any[];  // 接收产品数据
}

export const Offer2: React.FC<PropsType> = ({
  button,
  imageSrc,
  products,  // 从 props 中接收产品数据
}) => {
  const productTitle = `产品ID: ${products[0].id}`;
  const productPrice = `Price: ¥${products[0].price}`;

  return (
    <div className={styles.offerCard}>
      <div className={styles.offerRow}>
        <div className={styles.offerImageContainer}>
          <OfferImage
            id={`offer-${products[0].id}`}
            size="large"
            imageSrc={imageSrc}
            asBackground={true}  // 将图片作为背景
          />
          <div className={styles.offerContentContainer}>
            <div className={styles.offerContent}>
              <h3>{productTitle}</h3> {/* 动态生成的 title */}
              <p>{productPrice}</p> {/* 动态生成的 text */}
              {button}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};