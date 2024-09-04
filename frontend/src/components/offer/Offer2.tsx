import React from "react";
import styles from "./Offer2.module.css";
import { OfferImage } from "./OfferImage2";  // 引入 OfferImage 组件
import { Link } from 'react-router-dom';  // 引入 Link 组件

interface PropsType {
  button: JSX.Element;
  products: any[];  // 接收产品数据
}

export const Offer2: React.FC<PropsType> = ({ button, products }) => {

  return (
    <div className={styles.offerCard}>
      <div className={styles.offerInfo}>
        <OfferImage
          id={products[0].ID}
          size="large"
          price={products[0].price}
          title={products[0].HotelName}
          imageSrc={products[0].HotelWebsiteUrl}
        />
      </div>
      <div className={styles.offerButton}>
        {/* 使用 Link 包裹按钮 */}
        <Link to={`/detail/${products[0].ID}`}>
          {button}
        </Link>
      </div>
    </div>
  );
};