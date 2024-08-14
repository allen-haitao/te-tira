import React from "react";
import styles from "./Offer2.module.css";
import { OfferImage } from "./OfferImage2";  // 引入 OfferImage 组件

interface PropsType {
  button: JSX.Element;
  products: any[];  // 接收产品数据
}

export const Offer2: React.FC<PropsType> = ({button, products }) => {
  return (
    <div className={styles.offerCard}>
      <div className={styles.offerInfo}>
        <OfferImage
          id={products[0].id}
          size="large"
          price={products[0].price}
          title={products[0].title}
          imageSrc={products[0].touristRoutePictures[0].url}
        />
      </div>
      <div className={styles.offerButton}>
        {button}
      </div>
    </div>
  );
};