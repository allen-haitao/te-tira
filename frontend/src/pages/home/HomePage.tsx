import React from "react";
import { Header, Footer, Search, Carousel, SideMenu, Offer1, Offer2 } from "../../components";
import { Row, Col, Typography, Button } from "antd";
import { productList1, productList2 } from "./mockups";
import sideImage1 from "../../assets/images/carousel_1.jpg";
import sideImage2 from "../../assets/images/carousel_2.jpg";
import styles from "./HomePage.module.css";

export class HomePage extends React.Component {
  render(): React.ReactNode {
    const offerImage1 = sideImage1;
    const offerImage2 = sideImage2;

    return (
      <>
        <Header />
        <Search />
        <div className={styles["page-content"]}>
          <Row style={{ marginTop: 20 }}>
            <Col span={6}>
              <SideMenu />
            </Col>
            <Col span={18}>
              <Carousel />
            </Col>
          </Row>
          <Row style={{ marginTop: 20 }}>
            <div>
              <Typography.Title level={2} className={styles["section-title"]}>
                Offers
              </Typography.Title>
              <Typography.Text className={styles["section-subtitle"]}>
                Promotions, deals and special offers for you
              </Typography.Text>
            </div>
            <Row style={{ width: '100%' }}>
              <Col span={12} style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Offer1
                  button={
                    <Button type="primary" className={styles["offer-button"]}>
                      Search for flights
                    </Button>
                  }
                  imageSrc={offerImage1}
                  products={productList1}
                />
              </Col>
              <Col span={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Offer2
                  button={
                    <Button type="primary" className={styles["offer-button"]}>
                      Find Getaway Deals
                    </Button>
                  }
                  imageSrc={offerImage2}
                  products={productList2}
                />
            </Col>
            </Row>
          </Row>
        </div>
        <Footer />
      </>
    );
  }
}