import React from "react";
import { Header, Footer, Search, Carousel, SideMenu, Offer } from "../../components";
import { Row, Col, Typography, Button } from "antd";
import { productList1 } from "./mockups";
import sideImage1 from "../../assets/images/sider_2019_12-09.png";
import sideImage2 from "../../assets/images/sider_2019_02-04-2.png";
import styles from "./HomePage.module.css";

export class HomePage extends React.Component {
  render(): React.ReactNode {
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
            <Row>
              <Col span={12} style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Offer
                  title={
                    <Typography.Title level={3}>
                      Fly away to your dream holiday
                    </Typography.Title>
                  }
                  text={
                    <Typography.Text>
                      Get inspired, compare and book flights with more flexibility
                    </Typography.Text>
                  }
                  button={
                    <Button type="primary" className={styles["offer-button"]}>
                      Search for flights
                    </Button>
                  }
                  imageSrc={sideImage1}
                  customClass={styles.customOffer1}
                />
              </Col>
              <Col span={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Offer
                  title={
                    <Typography.Title level={3}>
                      Seize the moment
                    </Typography.Title>
                  }
                  text={
                    <Typography.Text>
                      Save 15% or more when you book and stay before October 2024
                    </Typography.Text>
                  }
                  button={
                    <Button type="primary" className={styles["offer-button"]}>
                      Find Getaway Deals
                    </Button>
                  }
                  imageSrc={sideImage2}
                  imageOnLeft={true}
                  customClass={styles.customOffer2}
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