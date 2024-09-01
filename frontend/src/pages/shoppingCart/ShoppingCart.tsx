import React, { useEffect } from "react";
import styles from "./ShoppingCart.module.css";
import { MainLayout } from "../../layouts/mainLayout";
import { Row, Col, Affix } from "antd";
import { ProductList, PaymentCard } from "../../components";
import { useSelector, useAppDispatch } from "../../redux/hooks";
import { clearShoppingCartItem, checkout, getShoppingCart } from "../../redux/shoppingCart/slice";
import { useNavigate } from "react-router-dom";
import { getRoomById } from "../../redux/room/slice";

interface CartItem {
  userId: string;
  roomTypeId: string;
  checkInDate: string;
  checkOutDate: string;
  roomTypeName?: string; // 添加房型名称字段
  price?: number; // 添加房型价格字段
  originalPrice?: number; // 添加原始价格字段
  discountPresent?: number; // 添加折扣字段
}

export const ShoppingCartPage: React.FC = () => {
  const loading = useSelector((s) => s.shoppingCart.loading);
  const shoppingCartItems = useSelector((s) => s.shoppingCart.items) as CartItem[];
  const jwt = useSelector((s) => s.user.token) as string;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // 首先加载购物车数据
    dispatch(getShoppingCart(jwt));

    // 使用 Promise.all 加载房间详情
    const loadRoomDetails = async () => {
      try {
        const roomDetailsPromises = shoppingCartItems.map((item) =>
          dispatch(getRoomById(item.roomTypeId)).then((response) => {
            const roomDetails = response.payload as any;
            item.roomTypeName = roomDetails.roomTypeName;
            item.price = roomDetails.price;
            item.originalPrice = roomDetails.originalPrice || roomDetails.price;
            item.discountPresent = roomDetails.discountPresent;
          })
        );

        await Promise.all(roomDetailsPromises);
      } catch (error) {
        console.error("Error loading room details", error);
      }
    };

    if (shoppingCartItems.length > 0) {
      loadRoomDetails();
    }
  }, [dispatch, jwt, shoppingCartItems]);

  const shoppingCartData = shoppingCartItems.map((item) => ({
    id: item.roomTypeId,
    title: item.roomTypeName || 'Default Room',
    description: `Check-in: ${item.checkInDate}, Check-out: ${item.checkOutDate}`,
    price: item.price || 0,
    originalPrice: item.originalPrice || item.price || 0,
    discountPresent: item.discountPresent || 1,
    departureCity: '',
    travelDays: '',
    touristRoutePictures: [],
    rating: 5, // 假设默认评级为5
  }));

  return (
    <MainLayout>
      <Row>
        {/* 购物车清单 */}
        <Col span={16}>
          <div className={styles["product-list-container"]}>
            <ProductList data={shoppingCartData} />
          </div>
        </Col>
        {/* 支付卡组件 */}
        <Col span={8}>
          <Affix>
            <div className={styles["payment-card-container"]}>
              <PaymentCard
                loading={loading}
                originalPrice={shoppingCartData
                  .map((item) => item.originalPrice || 0)
                  .reduce((a, b) => a + b, 0)}
                price={shoppingCartData
                  .map((item) => (item.price || 0) * (item.discountPresent ? item.discountPresent : 1))
                  .reduce((a, b) => a + b, 0)}
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
                      itemIds: shoppingCartItems.map((item) => parseInt(item.roomTypeId, 10)), // 如果 roomTypeId 是 string，可能需要转换为 number
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