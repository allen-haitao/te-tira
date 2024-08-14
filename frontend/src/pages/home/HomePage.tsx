import React from "react";
import { Header, Footer, Search, Carousel, SideMenu, Offer1, Offer2, ProductCollection, CountryRecommend, HotelRec} from "../../components";
import { Row, Col, Typography, Button } from "antd";
import { productList1, productList2, productList3} from "./mockups";
import sideImage1 from "../../assets/images/carousel_1.jpg";
import sideImage2 from "../../assets/images/carousel_2.jpg";
import sideImage3 from "../../assets/images/sider_2019_02-04-2.png";
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
            <Row style={{ width: '100%' }}>
              <Col span={12} style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Offer1
                  button={
                    <Button type="primary" className={styles["offer-button"]}>
                      Find Your Best Deal
                    </Button>
                  }
                  products={productList1}
                />
              </Col>
              <Col span={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Offer2
                  button={
                    <Button type="primary" className={styles["offer-button"]}>
                      Search for Highest Rated
                    </Button>
                  }
                  products={productList2}
                />
              </Col>
            </Row>
            <ProductCollection
              title={
                <Typography.Title level={3} type="warning">
                  爆款推荐
                </Typography.Title>
              }
              sideImage={sideImage1}
              products={productList1}
            />
            <ProductCollection
              title={
                <Typography.Title level={3} type="danger">
                  新品上市
                </Typography.Title>
              }
              sideImage={sideImage2}
              products={productList2}
            />
            <ProductCollection
              title={
                <Typography.Title level={3} type="success">
                  国内游推荐
                </Typography.Title>
              }
              sideImage={sideImage3}
              products={productList3}
            />
            <CountryRecommend 
              title={
                <Typography.Title level={3} style={{ fontFamily: 'Julius Sans One, sans-serif', fontWeight: 700 }}>
                  Country Recommendation
                </Typography.Title>
              }
            />
            <HotelRec
              title={
                <Typography.Title level={3} style={{ fontFamily: 'Julius Sans One, sans-serif', fontWeight: 700 }}>
                  Hotel Recommendation
                </Typography.Title>
              }
            />
          </Row>
        </div>
        <Footer />
      </>
    );
  }
}