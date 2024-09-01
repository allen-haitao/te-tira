import React from "react";
import { SearchBar, Carousel, SideMenu, Offer1, Offer2, ProductCollection, AttractionsNearby } from "../../components";
import { Row, Col, Typography, Spin, Button } from "antd";
import styles from "./HomePage.module.css";
import { withTranslation, WithTranslation } from "react-i18next";
import { connect } from "react-redux";
import { RootState } from "../../redux/store";
import { fetchProductList } from "../../redux/productList/slice"; // 引入 fetchProductList
import { categorizeHotels, Hotel } from "./productData";
import { MainLayout } from "../../layouts/mainLayout";

// mapStateToProps: 从 Redux state 中获取需要的部分作为 props 传递给组件
const mapStateToProps = (state: RootState) => {
  const { loading, error, data } = state.productList;
  
  console.log("Product List Data:", data);
  
  const hotels = data ? [...data.hotels] : []; 

  return {
    loading,
    error,
    hotels,
  };
};

// mapDispatchToProps: 将 action creators 作为 props 传递给组件
const mapDispatchToProps = (dispatch) => {
  return {
    fetchProductList: () => dispatch(fetchProductList()), // 使用 fetchProductList thunk action
  };
};

// 组件的 props 类型
type PropsType = WithTranslation &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

// 组件的状态类型
interface State {
  loading: boolean;
  error: string | null;
  productList1: Hotel[];
  productList2: Hotel[];
  productList3: Hotel[];
  productList4: Hotel[];
}

class HomePageComponent extends React.Component<PropsType, State> {
  constructor(props: PropsType) {
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

  // 根据 props 更新组件状态
  static getDerivedStateFromProps(
    nextProps: Readonly<PropsType>,
    prevState: State
  ): Partial<State> | null {
    if (!nextProps.loading && nextProps.hotels.length > 0) {
      const { productList1, productList2, productList3, productList4 } = categorizeHotels(nextProps.hotels);
      return {
        loading: nextProps.loading,
        error: nextProps.error,
        productList1,
        productList2,
        productList3,
        productList4,
      };
    } else if (nextProps.error) {
      return {
        loading: nextProps.loading,
        error: nextProps.error,
      };
    }
    return null;
  }

  // 在组件挂载后获取数据
  componentDidMount() {
    this.props.fetchProductList(); // 调用 fetchProductList 以获取产品数据
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

    if (!productList1.length && !productList2.length && !productList3.length && !productList4.length) {
      return <div>No hotels available</div>;
    }

    return (
      <MainLayout>
        <div className={styles["search-container"]}>
          <div className={styles["search-block"]}>
            <div className={styles["search-text"]}>
              <Typography.Text className={styles["search-title"]}>
                {t("search.search-title")}
              </Typography.Text>
              <Typography.Text className={styles["search-subtitle"]}>
                {t("search.search-subtitle")}
              </Typography.Text>
            </div>
            <SearchBar />
          </div>
        </div>
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
            <div style={{ marginTop: 30 }}>
              <Typography.Title level={3} type="warning" className={styles["section-title"]}>
                {t("page-content.hot_recommended")}
              </Typography.Title>
            </div>
            <ProductCollection products={productList3} />
            <div style={{ marginTop: 30 }}>
              <Typography.Title level={3} type="success" className={styles["section-title"]}>
                {t("page-content.new_arrival")}
              </Typography.Title>
            </div>
            <ProductCollection products={productList4} />
            <AttractionsNearby
              title={
                <Typography.Title level={3} style={{ fontFamily: 'Julius Sans One, sans-serif', fontWeight: 700 }}>
                  {t("page-content.attractions_nearby")}
                </Typography.Title>
              }
            />
          </Row>
        </div>
      </MainLayout>
    );
  }
}

// 使用 connect 连接 Redux
export const HomePage = connect(mapStateToProps, mapDispatchToProps)(withTranslation()(HomePageComponent));