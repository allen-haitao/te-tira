import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductIntro } from "../../components";
import { Spin, Row, Col, Divider, Typography, Anchor, Menu, DatePicker, Button } from "antd";
import styles from "./RoomPage.module.css";
import { getRoomById } from "../../redux/room/slice";
import { useSelector, useAppDispatch } from "../../redux/hooks";
import { MainLayout } from "../../layouts/mainLayout";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { addShoppingCartItem } from "../../redux/shoppingCart/slice";
import { RootState } from "../../redux/store";
import moment, { Moment } from "moment";

const { RangePicker } = DatePicker;

type MatchParams = {
  roomTypeId: string;
};

export const RoomPage: React.FC = () => {
  const { roomTypeId } = useParams<MatchParams>();

  const loading = useSelector((state: RootState) => state.room.loading);
  const error = useSelector((state: RootState) => state.room.error);
  const selectedRoom = useSelector((state: RootState) => state.room.selectedRoom);

  const dispatch = useAppDispatch();

  const jwt = useSelector((state: RootState) => state.user.token) as string;
  const shoppingCartLoading = useSelector((state: RootState) => state.shoppingCart.loading);

  const [selectedDates, setSelectedDates] = useState<[Moment | null, Moment | null] | null>(null);

  useEffect(() => {
    if (roomTypeId) {
      dispatch(getRoomById(roomTypeId));
    }
  }, [roomTypeId, dispatch]);

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

  // 检查selectedRoom是否存在
  if (!selectedRoom) {
    return <div>No room details available.</div>;
  }

  const handleAddToCart = () => {
    if (selectedDates && selectedDates[0] && selectedDates[1]) {
      const checkInDate = selectedDates[0].format("YYYY-MM-DD");
      const checkOutDate = selectedDates[1].format("YYYY-MM-DD");
      
      dispatch(
        addShoppingCartItem({
          jwt,
          roomTypeId: selectedRoom.roomTypeId,
          checkInDate,
          checkOutDate,
        })
      );
    } else {
      alert("Please select check-in and check-out dates.");
    }
  };

  return (
    <>
      <MainLayout>
        <div className={styles["page-content"]}>
          {/* Product Intro & Calendar */}
          <div className={styles["product-intro-container"]}>
            <Row>
              <Col span={13}>
                {/*<ProductIntro
                  title={selectedRoom.roomTypeName}
                  price={selectedRoom.price}
                  address={selectedRoom.hotelId}  // 假设hotelId代表地址，需要根据实际情况更改
                  location={selectedRoom.roomTypeId} // 假设roomTypeId代表位置，需要根据实际情况更改
                  contact={"N/A"}  // 假设没有联系方式字段
                  rating={4.5}  // 假设没有评分字段，静态赋值
                  pictures={[]}  // 假设没有图片字段
                />*/}
              </Col>
              <Col span={11}>
                <RangePicker
                  value={selectedDates}
                  onChange={(dates) => setSelectedDates(dates)}
                  style={{ marginBottom: 20, display: "block" }}
                />
                <Button
                  type="primary"
                  danger
                  loading={shoppingCartLoading}
                  onClick={handleAddToCart}
                >
                  <ShoppingCartOutlined />
                  放入购物车
                </Button>
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
              dangerouslySetInnerHTML={{ __html: "Room Description" }}  // 假设房型描述
              style={{ margin: 50 }}
            ></div>
          </div>
          {/* Facilities */}
          <div id="facilities" className={styles["product-detail-container"]}>
            <Divider orientation={"center"}>
              <Typography.Title level={3}>Facilities</Typography.Title>
            </Divider>
            <div
              dangerouslySetInnerHTML={{ __html: "Room Facilities" }}  // 假设房型设施
              style={{ margin: 50 }}
            ></div>
          </div>
          {/* Attractions */}
          <div id="attractions" className={styles["product-detail-container"]}>
            <Divider orientation={"center"}>
              <Typography.Title level={3}>Attractions</Typography.Title>
            </Divider>
            <div
              dangerouslySetInnerHTML={{ __html: "Nearby Attractions" }}  // 假设房型附近景点
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