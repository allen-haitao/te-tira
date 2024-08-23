import React from "react";
import { Header, Footer, Search, Carousel, SideMenu, Offer1, Offer2, ProductCollection, AttractionsNearby } from "../../components";
import { Row, Col, Typography, Spin, Button } from "antd";
import styles from "./HomePage.module.css";
import {withTranslation, WithTranslation } from "react-i18next";
import axios from "axios";
import { categorizeHotels, Hotel} from "./productData";

interface State {
  loading: boolean;
  error: string | null;
  productList1: Hotel[];
  productList2: Hotel[];
  productList3: Hotel[];
  productList4: Hotel[];
}

class HomePageComponent extends React.Component<WithTranslation, State> { 
  constructor(props: WithTranslation) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      productList1: [],
      productList2: [],
      productList3: [],
      productList4: [],
    };
  }

  async componentDidMount() {
    try {
      const response = await axios.get("http://localhost:3000/hotels");
      const data = response.data;
  
      if (data && data.hotels) {
        const { productList1, productList2, productList3, productList4 } = categorizeHotels(data.hotels);
        console.log("Raw hotel data:", data.hotels);
  
        // 确保每个 productList 都有元素
        if (productList1.length === 0) {
          console.warn("productList1 is empty. Ensure you have BestDeal hotels in your data.");
        }
        if (productList2.length === 0) {
          console.warn("productList2 is empty. Ensure you have HighestRated hotels in your data.");
        }
        if (productList3.length === 0) {
          console.warn("productList3 is empty. Ensure you have HotRecommended hotels in your data.");
        }
        if (productList4.length === 0) {
          console.warn("productList4 is empty. Ensure you have NewArrival hotels in your data.");
        }
  
        // 打印数据结构到控制台
        console.log("productList1:", productList1);
        console.log("productList2:", productList2);
        console.log("productList3:", productList3);
        console.log("productList4:", productList4);
  
        this.setState({
          loading: false,
          error: null,
          productList1,
          productList2,
          productList3,
          productList4,
        });
      } else {
        this.setState({ error: "Invalid data format", loading: false });
      }
    } catch (error) {
      if (error instanceof Error) {
        this.setState({
          error: error.message,
          loading: false,
        });
      }
    }
  }

  render(): React.ReactNode {
    const { t } = this.props;
    const { loading, error, productList1, productList2, productList3, productList4 } = this.state;
    
    if (loading) {
      return (
        <Spin
          size="large"
          style={{
            marginTop: 200,
            marginBottom: 200,
            marginLeft: "auto",
            marginRight: "auto",
            width: "100%",
          }}
        />
      );
    }
    if (error) {
      return <div>Error: {error}</div>;
    }

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
              products={productList3}
            />
            <div style={{ marginTop: 30 }}>
                <Typography.Title level={3} type="success" className={styles["section-title"]}>
                  {t("page-content.new_arrival")}
                </Typography.Title>
            </div>
            <ProductCollection
              products={productList4}
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