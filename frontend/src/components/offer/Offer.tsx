import React from "react";
import styles from "./Offer.module.css";
import { Row, Col, Typography, Button } from "antd";

interface PropsType {
  title: JSX.Element;
  text: JSX.Element;
  button: JSX.Element;
  imageSrc: string;
  imageOnLeft?: boolean;
  customClass?: string;
}

export const Offer: React.FC<PropsType> = ({
  title,
  text,
  button,
  imageSrc,
  imageOnLeft = false, // 控制图片在左还是在右
  customClass = "",
}) => {
  return (
    <div className={`${styles.offerCard} ${customClass}`}>
      <Row
        gutter={[16, 16]}
        className={`${styles.offerRow} ${imageOnLeft ? styles.imageLeft : ""}`}
      >
        <Col xs={24} md={12}>
          <div className={styles.offerContent}>
            {title}
            {text}
            {button}
          </div>
        </Col>
        <Col xs={24} md={12}>
          <div className={styles.offerImageContainer}>
            <img src={imageSrc} alt="Offer Image" className={styles.offerImage} />
          </div>
        </Col>
      </Row>
    </div>
  );
};