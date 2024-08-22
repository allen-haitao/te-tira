import React from "react";
import { Header, Footer, Search, Carousel, SideMenu, Offer1, Offer2, ProductCollection, AttractionsNearby } from "../../components";
import { Row, Col, Typography, Button } from "antd";
import { productList1, productList2 } from "./mockups";
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
          <Row>
            <Col span={6}>
              <SideMenu />
            </Col>
            <Col span={18}>
              <Carousel />
            </Col>
          </Row>
          <Row>
            <div style={{ marginTop: 30 }}>
              <Typography.Title level={3} type="danger" className={styles["section-title"]}>
                {t("page-content.offers")}
              </Typography.Title>
              <Typography.Text type="secondary" className={styles["section-subtitle"]}>
                {t("page-content.offers_subtitle")}
              </Typography.Text>
            </div>
            <Row style={{ width: '100%'}}>
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
            <div style={{ marginTop: 30 }}>
                <Typography.Title level={3} type="warning"  className={styles["section-title"]} >
                  {t("page-content.hot_recommended")}
                </Typography.Title>
            </div>
            <ProductCollection
              products={productList1}
            />
            <div style={{ marginTop: 30 }}>
                <Typography.Title level={3} type="success" className={styles["section-title"]}>
                  {t("page-content.new_arrival")}
                </Typography.Title>
            </div>
            <ProductCollection
              products={productList2}
            />
            <AttractionsNearby 
              title={
                <Typography.Title level={3} style={{ fontFamily: 'Julius Sans One, sans-serif', fontWeight: 700 }}>
                  {t("page-content.attractions_nearby")}
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