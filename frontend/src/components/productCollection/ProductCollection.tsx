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
                id={products[0].id}
                size={"large"}
                title={products[0].title}
                imageSrc={products[0].touristRoutePictures[0].url}
                price={products[0].price}
              />
            </Row>
          </Col>
          <Col span={12}>
            <Row>
              <Col span={12}>
                <Row className={styles.inner_small}>
                    <ProductImage
                      id={products[1].id}
                      size="small"
                      title={products[1].title}
                      imageSrc={products[1].touristRoutePictures[0].url}
                      price={products[1].price}
                    />
                  </Row>
              </Col>
              <Col span={12}>
                <Row className={styles.inner_small}>
                  <ProductImage
                    id={products[2].id}
                    size="small"
                    title={products[2].title}
                    imageSrc={products[2].touristRoutePictures[0].url}
                    price={products[2].price}
                  />
                </Row>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Row className={styles.inner_small}>
                  <ProductImage
                    id={products[3].id}
                    size="small"
                    title={products[3].title}
                    imageSrc={products[3].touristRoutePictures[0].url}
                    price={products[3].price}
                  />
                </Row>
              </Col>
              <Col span={12}>
               <Row className={styles.inner_small}>
                  <ProductImage
                    id={products[4].id}
                    size="small"
                    title={products[4].title}
                    imageSrc={products[4].touristRoutePictures[0].url}
                    price={products[4].price}
                  />
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
}