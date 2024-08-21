import React from "react";
import { Header, Footer, Search, Carousel, SideMenu, Offer1, Offer2, ProductCollection, CountryRecommend, HotelRec} from "../../components";
import { Row, Col, Typography, Button } from "antd";
import { productList1, productList2, productList3} from "./mockups";
import sideImage1 from "../../assets/images/carousel_1.jpg";
import sideImage2 from "../../assets/images/carousel_2.jpg";
import sideImage3 from "../../assets/images/sider_2019_02-04-2.png";
import styles from "./HomePage.module.css";
import {withTranslation, WithTranslation } from "react-i18next";

class HomePageComponent extends React.Component<WithTranslation> {
  
  render(): React.ReactNode {
    const { t } = this.props;
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
                {t("page-content.offers")}
              </Typography.Title>
              <Typography.Text className={styles["section-subtitle"]}>
                {t("page-content.offers_subtitle")}
              </Typography.Text>
            </div>
            <Row style={{ width: '100%' }}>
              <Col span={12} style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Offer1
                  button={
                    <Button type="primary" className={styles["offer-button"]}>
                      {t("page-content.find_best_deal")}
                    </Button>
                  }
                  products={productList1}
                />
              </Col>
              <Col span={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Offer2
                  button={
                    <Button type="primary" className={styles["offer-button"]}>
                      {t("page-content.search_highest_rated")}
                    </Button>
                  }
                  products={productList2}
                />
              </Col>
            </Row>
            <ProductCollection
              title={
                <Typography.Title level={3} type="warning">
                  {t("page-content.hot_recommended")}
                </Typography.Title>
              }
              sideImage={sideImage1}
              products={productList1}
            />
            <ProductCollection
              title={
                <Typography.Title level={3} type="danger">
                  {t("page-content.new_arrival")}
                </Typography.Title>
              }
              sideImage={sideImage2}
              products={productList2}
            />
            <ProductCollection
              title={
                <Typography.Title level={3} type="success">
                  {t("page-content.domestic_travel")}
                </Typography.Title>
              }
              sideImage={sideImage3}
              products={productList3}
            />
            <CountryRecommend 
              title={
                <Typography.Title level={3} style={{ fontFamily: 'Julius Sans One, sans-serif', fontWeight: 700 }}>
                  {t("page-content.country_recommendation")}
                </Typography.Title>
              }
            />
            <HotelRec
              title={
                <Typography.Title level={3} style={{ fontFamily: 'Julius Sans One, sans-serif', fontWeight: 700 }}>
                  {t("page-content.hotel_recommendation")}
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

export const HomePage = withTranslation()(HomePageComponent)