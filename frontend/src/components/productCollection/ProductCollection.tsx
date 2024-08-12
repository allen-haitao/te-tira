import React from "react";
import styles from "./ProductCollection.module.css";
import { Row, Col, Typography, Button } from "antd";
import { ProductImage } from "./ProductImage";

interface PropsType {
    title: JSX.Element;
    sideImage: string;
    products: any[];
}

export const ProductCollection: React.FC<PropsType> = ({ title, sideImage, products }) => {
  return (
    <div className={styles.content}>
      <Row gutter={[16, 16]} className={styles["offers-section"]}>
        <Col xs={24} md={12}>
          <div className={styles["offer-card"]}>
            <div className={styles["offer-content"]}>
              {title}
              <Typography.Text>
                Get inspired, compare and book flights with more flexibility
              </Typography.Text>
              <Button type="primary" className={styles["offer-button"]}>Search for flights</Button>
            </div>
            <div className={styles["offer-image-container"]}>
              <img src={sideImage} alt="Offer Image" className={styles["offer-image"]} />
            </div>
          </div>
        </Col>
        <Col xs={24} md={12}>
          <div className={styles["product-card"]}>
            <Row>
              <Col span={24}>
                <Typography.Title level={4} className={styles["collection-title"]}>
                  {products[0].title}
                </Typography.Title>
              </Col>
              <Col span={12}>
                <div className={styles["product-content"]}>
                  <Typography.Text>{products[0].description}</Typography.Text>
                  <Button type="primary" className={styles["product-button"]}>Book Now</Button>
                </div>
                <div className={styles["product-image-container"]}>
                  <img src={products[0].imageSrc} alt={products[0].title} className={styles["product-image"]} />
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};