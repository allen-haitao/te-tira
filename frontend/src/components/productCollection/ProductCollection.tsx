import React from "react";
import styles from "./ProductCollection.module.css";
import { Row, Col, } from "antd";
import { ProductImage } from "./ProductImage";

interface PropsType {
    products: any[];
}

export const ProductCollection: React.FC<PropsType> = ({products}) => {
  
  return (
    <div className={styles.outer}>
      <Row>
        <Col span={12}>
          <Row className={styles.inner_large}>
            <ProductImage
              id={products[0].ID}
              size={"large"}
              title={products[0].HotelName}
              imageSrc={products[0].HotelWebsiteUrl}
              price={products[0].price}
            />
          </Row>
        </Col>
        <Col span={12}>
          <Row>
            <Col span={12}>
              <Row className={styles.inner_small}>
                <ProductImage
                  id={products[1].ID}
                  size="small"
                  title={products[1].HotelName}
                  imageSrc={products[1].HotelWebsiteUrl}
                  price={products[1].price}
                />
              </Row>
            </Col>
            <Col span={12}>
              <Row className={styles.inner_small}>
                <ProductImage
                  id={products[2].ID}
                  size="small"
                  title={products[2].HotelName}
                  imageSrc={products[2].HotelWebsiteUrl}
                  price={products[2].price}
                />
              </Row>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Row className={styles.inner_small}>
                <ProductImage
                  id={products[3].ID}
                  size="small"
                  title={products[3].HotelName}
                  imageSrc={products[3].HotelWebsiteUrl}
                  price={products[3].price}
                />
              </Row>
            </Col>
            <Col span={12}>
              <Row className={styles.inner_small}>
                <ProductImage
                  id={products[4].ID}
                  size="small"
                  title={products[4].HotelName}
                  imageSrc={products[4].HotelWebsiteUrl}
                  price={products[4].price}
                />
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};