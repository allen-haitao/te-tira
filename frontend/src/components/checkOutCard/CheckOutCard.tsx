import React, { useRef } from "react";
import { Skeleton, Card, Button, Typography } from "antd";
import { CheckCircleOutlined, HomeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;
const { Title, Text } = Typography;

interface PropsType {
  loading: boolean;
  order: any;
  onCheckout: (orderDetails: any) => void; // Add orderDetails to onCheckout signature
  totalPrice: number; // The total price prop
}

export const CheckOutCard: React.FC<PropsType> = ({
  loading,
  order,
  onCheckout,
  totalPrice,
}) => {
  const navigate = useNavigate();
  const paymentFormRef = useRef<HTMLDivElement | null>(null);

  const handlePayClick = () => {
    if (paymentFormRef.current) {
      const cardNumber = (paymentFormRef.current.querySelector('input[name="cardNumber"]') as HTMLInputElement)?.value;
      const expiryDate = (paymentFormRef.current.querySelector('input[name="expiryDate"]') as HTMLInputElement)?.value;
      const cvc = (paymentFormRef.current.querySelector('input[name="cvc"]') as HTMLInputElement)?.value;

      const orderDetails = { cardNumber, expiryDate, cvc };
      onCheckout(orderDetails); // Pass order details when calling onCheckout
    }
  };

  return (
    <Card
      style={{ width: 300, marginTop: 50 }}
      actions={[
        order && order.state === "Completed" ? (
          <Button
            type="primary"
            onClick={() => {
              navigate("/");
            }}
            loading={loading}
          >
            <HomeOutlined />
            Homepage
          </Button>
        ) : (
          <Button
            type="primary"
            danger
            onClick={handlePayClick}
            loading={loading}
          >
            <CheckCircleOutlined />
            Pay
          </Button>
        ),
      ]}
    >
      <Skeleton loading={loading} active>
        <Meta
          title={<Title level={2}>Amount</Title>}
          description={
            <div style={{ marginBottom: 16 }}>
              {/* Display total price */}
              <div style={{ display: "flex", alignItems: "center" }}>
                <Text style={{ marginRight: 10 }}>price</Text>
                <Title
                  level={2}
                  type="danger"
                  style={{ fontWeight: "bold", margin: 0 }}
                >
                  $ {totalPrice}
                </Title>
              </div>
            </div>
          }
        />
      </Skeleton>
    </Card>
  );
};