import React, {useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { ProductIntro, ProductComments } from "../../components";
import { Spin, Row, Col, Divider, Typography, Anchor, Menu, DatePicker, Space, Button } from "antd";
import styles from "./RoomPage.module.css";
import { productDetailSlice, getProductDetail } from "../../redux/productDetail/slice";
import { useSelector, useAppDispatch } from "../../redux/hooks";
import { useTranslation } from "react-i18next";
import { MainLayout } from "../../layouts/mainLayout";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { addShoppingCartItem } from "../../redux/shoppingCart/slice";

const { RangePicker } = DatePicker;

type MatchParams = {
    hotelId : string,
};

export const RoomPage:React.FC = () => {
    
  const { hotelId } = useParams<MatchParams>();

  const loading = useSelector((state) => state.productDetail.loading);
  const error = useSelector((state) => state.productDetail.error);
  const product = useSelector((state) => state.productDetail.data);

  const dispatch = useAppDispatch();

  const jwt = useSelector((s) => s.user.token) as string;
  const shoppingCartLoading = useSelector((s) => s.shoppingCart.loading);

  useEffect(() => {
    if(hotelId) {
      dispatch(getProductDetail(hotelId))
    }
  }, []);

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
    return <div>error: {error}</div>;
  }

    return (
      <>
        <MainLayout>
          <div className={styles["page-content"]}>
            {/* Product Intro & Calendar */}
            <div className={styles["product-intro-container"]}>
              <Row>
                <Col span={13}>
                  <ProductIntro
                    title={product.HotelName}
                    price={product.price}
                    address={product.Address}
                    location={product.Map}
                    contact={product.PhoneNumber}
                    rating={product.HotelRating}
                    pictures={[]}
                  />
                </Col>
                <Col span={11}>
                  <Button
                    style={{ marginTop: 50, marginBottom: 30, display: "block" }}
                    type="primary"
                    danger
                    loading={shoppingCartLoading}
                    onClick={() => {
                      dispatch(
                        addShoppingCartItem({ jwt, roomTypeId: product.id })
                      );
                    }}
                  >
                    <ShoppingCartOutlined />
                    放入购物车
                  </Button>
                  <RangePicker open style={{ marginTop: 20 }} />
                </Col>
              </Row>
            </div>
            {/* Anchor Menu */}
            <Anchor className={styles["product-detail-anchor"]}>
              <Menu mode="horizontal">
                <Menu.Item key="1">
                  <Anchor.Link href="#description" title="Description"></Anchor.Link>
                </Menu.Item>
                <Menu.Item key="3">
                  <Anchor.Link href="#facilities" title="Facilities"></Anchor.Link>
                </Menu.Item>
                <Menu.Item key="4">
                  <Anchor.Link href="#attractions" title="Attractions"></Anchor.Link>
                </Menu.Item>
                <Menu.Item key="5">
                  <Anchor.Link href="#comments" title="Comments"></Anchor.Link>
                </Menu.Item>
              </Menu>
            </Anchor>
            {/* Description */}
            <div id="description" className={styles["product-detail-container"]}>
              <Divider orientation={"center"}>
                <Typography.Title level={3}>Description</Typography.Title>
              </Divider>
              <div
                dangerouslySetInnerHTML={{ __html: product.Description }}
                style={{ margin: 50 }}
              ></div>
            </div>
            {/* Facilities */}
            <div id="facilities" className={styles["product-detail-container"]}>
              <Divider orientation={"center"}>
                <Typography.Title level={3}>Facilities</Typography.Title>
              </Divider>
              <div
                dangerouslySetInnerHTML={{ __html: product.HotelFacilities }}
                style={{ margin: 50 }}
              ></div>
            </div>
            {/* Attractions */}
            <div id="attractions" className={styles["product-detail-container"]}>
              <Divider orientation={"center"}>
                <Typography.Title level={3}>Attractions</Typography.Title>
              </Divider>
              <div
                dangerouslySetInnerHTML={{ __html: product.Attractions }}
                style={{ margin: 50 }}
              ></div>
            </div>
            {/* Comments*/}
            <div id="comments" className={styles["product-detail-container"]}>
              <Divider orientation={"center"}>
                <Typography.Title level={3}>Comments</Typography.Title>
              </Divider>
            </div>
          </div>
        </MainLayout>
      </>
    );
  };