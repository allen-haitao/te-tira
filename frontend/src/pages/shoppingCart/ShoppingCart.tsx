import React, { useEffect, useState } from "react";
import styles from "./ShoppingCart.module.css";
import { MainLayout } from "../../layouts/mainLayout";
import { Row, Col, Affix, Spin } from "antd";
import { ProductList, PaymentCard } from "../../components";
import { useSelector, useAppDispatch } from "../../redux/hooks";
import { clearShoppingCartItem, checkout, getShoppingCart } from "../../redux/shoppingCart/slice";
import { getProductDetail } from "../../redux/productDetail/slice";
import { useNavigate } from "react-router-dom";

interface CartItem {
  checkOutDate: string;
  totalPrice: number;
  nights: number;
  roomTypeName: string;
  hotelId: string;
  checkInDate: string;
  roomTypeId: string;
  pricePerNight: number;
}

interface Product {
  key: string;
  RoomTypeName: string;
  roomTypeId: string;
  price: number;
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  HotelName: string;
  HotelRating: string;
  cityName: string;
  Description: string;
  HotelFacilities: string;
  Attractions: string;
}

export const ShoppingCartPage: React.FC = () => {
  const loading = useSelector((s) => s.shoppingCart.loading);
  const shoppingCartItems = useSelector((s) => s.shoppingCart.items) as CartItem[];
  const jwt = useSelector((s) => s.user.token) as string;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const productLoading = useSelector((state) => state.productDetail.loading);

  // 用于存储每个产品的详细信息
  const [productDetails, setProductDetails] = useState<Record<string, any>>({});
  const [loadingDetails, setLoadingDetails] = useState(true);

  useEffect(() => {
    dispatch(getShoppingCart(jwt));
  }, [dispatch, jwt]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoadingDetails(true);

      // 遍历购物车中的所有项目，逐一获取产品详细信息
      const promises = shoppingCartItems.map(async (item) => {
        if (!productDetails[item.hotelId]) {
          try {
            const actionResult = await dispatch(getProductDetail(item.hotelId)).unwrap(); // 使用 unwrap 获取 action payload
            setProductDetails((prev) => ({
              ...prev,
              [item.hotelId]: actionResult,
            }));
          } catch (error) {
            console.error(`Failed to fetch details for hotelId ${item.hotelId}`, error);
          }
        }
      });

      await Promise.all(promises);
      setLoadingDetails(false);
    };

    if (shoppingCartItems.length > 0) {
      fetchProductDetails();
    }
  }, [dispatch, shoppingCartItems, productDetails]);

  if (loading || productLoading || loadingDetails) {
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

  // 合并购物车数据和产品详情数据
  const mergedShoppingCartData = shoppingCartItems.map((item, index) => {
    const hotel = productDetails[item.hotelId] || {}; // 获取当前产品的详细信息

    return {
      key: `${item.roomTypeId}-${index}`, // 使用 roomTypeId 和 index 组合生成唯一 key
      RoomTypeName: item.roomTypeName,
      roomTypeId: item.roomTypeId,
      price: item.totalPrice,
      checkInDate: item.checkInDate,
      checkOutDate: item.checkOutDate,
      nights: item.nights,
      HotelName: hotel.HotelName || '', // 确保如果没有数据时不会出现undefined
      HotelRating: hotel.HotelRating || '',
      cityName: hotel.cityName || '',
      Description: `Check-in: ${item.checkInDate}, Check-out: ${item.checkOutDate}, Nights: ${item.nights}`,
      HotelFacilities: hotel.HotelFacilities || '',
      Attractions: hotel.Attractions || '',
    };
  });

  console.log('Final shopping cart data for rendering:', mergedShoppingCartData);

  return (
    <MainLayout>
      <Row>
        {/* 购物车清单 */}
        <Col span={16}>
          <div className={styles["product-list-container"]}>
            {mergedShoppingCartData.length > 0 ? (
              <ProductList
                data={mergedShoppingCartData} 
                onDelete={(key) => {
                  dispatch(clearShoppingCartItem({
                    jwt,
                    keys: [key]
                  }));
                }}
              />
            ) : (
              <div>No products in the shopping cart.</div>  // 当购物车为空时，显示占位文本
            )}
          </div>
        </Col>
        {/* 支付卡组件 */}
        <Col span={8}>
          <Affix>
            <div className={styles["payment-card-container"]}>
              <PaymentCard
                loading={loading}
                price={mergedShoppingCartData.reduce((total, item) => total + item.price, 0)}
                onCheckout={() => {
                  if (shoppingCartItems.length <= 0) {
                    return;
                  }
                  dispatch(checkout(jwt));
                  navigate("/placeOrder");
                }}
                onShoppingCartClear={() => {
                  dispatch(
                    clearShoppingCartItem({
                      jwt,
                      keys: shoppingCartItems.map((item, index) => `${item.roomTypeId}-${index}`), // 使用合适的键值格式
                    })
                  );
                }}
              />
            </div>
          </Affix>
        </Col>
      </Row>
    </MainLayout>
  );
};