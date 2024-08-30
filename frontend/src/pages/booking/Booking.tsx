import React from "react";
import { PaymentForm, CheckOutCard } from "../../components";
import { MainLayout } from "../../layouts/mainLayout";
import { Row, Col } from "antd";
import { useSelector, useAppDispatch } from "../../redux/hooks";
import { booking } from "../../redux/booking/slice";

export const BookingPage: React.FC = (props) => {
  const jwt = useSelector((s) => s.user.token) as string;
  const loading = useSelector((s) => s.booking.loading);
  const order = useSelector((s) => s.booking.currentOrder);
  const dispatch = useAppDispatch();

  return (
    <MainLayout>
      <Row>
        <Col span={12}>
          <PaymentForm />
        </Col>
        <Col span={12}>
          <CheckOutCard
            loading={loading}
            order={order}
            onCheckout={() => {
              dispatch(booking({ jwt, orderId: order.id }));
            }}
          />
        </Col>
      </Row>
    </MainLayout>
  );
};