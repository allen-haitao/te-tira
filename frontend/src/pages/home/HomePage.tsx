import React from "react";
import { Header, Footer, SearchBar, Carousel, SideMenu, Offer1, Offer2, ProductCollection, AttractionsNearby } from "../../components";
import { Row, Col, Typography, Spin, Button } from "antd";
import styles from "./HomePage.module.css";
import { withTranslation, WithTranslation } from "react-i18next";
import { connect } from "react-redux";
import { RootState } from "../../redux/store";
import { giveMeDataActionCreator } from "../../redux/productList/productListActions";
import { categorizeHotels, Hotel } from "./productData";

const mapStateToProps = (state: RootState) => {
  console.log('Current Redux State:', state);
  console.log('Mapping state to props:');
  console.log('loading:', state.productList.loading);
  console.log('error:', state.productList.error);
  console.log('hotels:', state.productList.data);
  
  const data = state.productList.data;
  const hotels = data ? [...data.hotels] : []; 

  console.log('mapStateToProps - hotels data:', hotels);
  
  return {
    loading: state.productList.loading,
    error: state.productList.error,
    hotels: hotels,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    giveMeData: () => {
      dispatch(giveMeDataActionCreator());
    }
  };
};

type PropsType = WithTranslation &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

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
      productList4: []
    };
  }
  
  static getDerivedStateFromProps(
    nextProps: Readonly<PropsType>,
    prevState: State
  ): Partial<State> | null {
    // Check if loading has changed to false and hotels are available
    if (!nextProps.loading && nextProps.hotels.length > 0) {
      const { productList1, productList2, productList3, productList4 } = categorizeHotels(nextProps.hotels);

      // Return new state
      return {
        loading: nextProps.loading,
        error: nextProps.error,
        productList1,
        productList2,
        productList3,
        productList4,
      };
    } else if (nextProps.error) {
      // If there's an error, update the state with the error
      return {
        loading: nextProps.loading,
        error: nextProps.error,
      };
    }

    // Return null if no state update is necessary
    return null;
  }

  componentDidMount() {
    // Initiate data fetch
    this.props.giveMeData();
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
      <>
        <Header />
        <SearchBar />
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

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(withTranslation()(HomePageComponent));