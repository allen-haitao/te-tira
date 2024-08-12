import React from "react";
import {
  Header,
  Footer,
  Search,
  Carousel,
  SideMenu,
  ProductCollection,
} from "../../components";
import { Row, Col, Typography } from "antd";
import { productList1, productList2, productList3 } from "./mockups";
import sideImage from "../../assets/images/sider_2019_12-09.png";
import sideImage2 from "../../assets/images/sider_2019_02-04.png";
import sideImage3 from "../../assets/images/sider_2019_02-04-2.png";
import styles from './HomePage.module.css'

export class HomePage extends React.Component {
  render(): React.ReactNode {
    return (
      <>
        <Header />
        <Search/>
        {/* 页面内容 content */}
        <div className={styles["page-content"]}>
          <Row style={{ marginTop: 20 }}>
            <Col span={6}>
              <SideMenu />
            </Col>
            <Col span={18}>
              <Carousel />
            </Col>
          </Row>
          <Typography.Title level={2} className={styles["section-title"]}>
            Offers
          </Typography.Title>
          <Typography.Text className={styles["section-subtitle"]}>
            Promotions, deals and special offers for you
          </Typography.Text>
          {/* 使用 ProductCollection 组件 */}
          <ProductCollection
            title={
              <Typography.Title level={3}>
                Fly away to your dream holiday
              </Typography.Title>
            }
            sideImage={sideImage}
            products={productList1}
          />

          <ProductCollection
            title={
              <Typography.Title level={3}>
                Seize the moment
              </Typography.Title>
            }
            sideImage={sideImage2}
            products={productList1}
          />
        </div>
        <Footer />
      </>
    );
  }
}
