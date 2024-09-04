import React, { useEffect, useState } from 'react';
import { Table, Button, Popover, DatePicker, Space } from 'antd';
import { UserOutlined, ShoppingCartOutlined, CalendarOutlined } from '@ant-design/icons';
import { useSelector, useAppDispatch } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { addShoppingCartItem } from "../../redux/shoppingCart/slice";
import { getRoomsByHotelId } from '../../redux/room/slice';
import { RootState } from '../../redux/store';
import { Moment } from 'moment';

const { RangePicker } = DatePicker;

interface Room {
  roomTypeId: string;
  hotelId: string;
  roomTypeName: string;
  price: number;
  total: number;
  available: number;
  createdAt?: string;
}

const RoomTable: React.FC<{ hotelId: string }> = ({ hotelId }) => {
  const [selectedDates, setSelectedDates] = useState<{ [key: string]: [Moment | null, Moment | null] | null }>({});
  const [visiblePopover, setVisiblePopover] = useState<{ [key: string]: boolean }>({});

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const jwt = useSelector((state: RootState) => state.user.token) as string;
  const shoppingCartLoading = useSelector((state: RootState) => state.shoppingCart.loading);
  const { loading, rooms } = useSelector((state: RootState) => state.room);

  useEffect(() => {
    if (hotelId) {
      dispatch(getRoomsByHotelId(hotelId));
    }
  }, [hotelId, dispatch]);

  const handleConfirm = (roomTypeId: string) => {
    setVisiblePopover(prev => ({ ...prev, [roomTypeId]: false }));
  };

  const handleRoomTypeClick = (roomTypeId: string) => {
    navigate(`/rooms/${roomTypeId}`);
  };

  const handleAddToCart = async (roomTypeId: string) => {
    const dates = selectedDates[roomTypeId];
    if (!dates || !dates[0] || !dates[1]) {
      alert("Please select check-in and check-out dates.");
      return;
    }

    try {
      await dispatch(addShoppingCartItem({
        jwt,
        roomTypeId,
        checkInDate: dates[0].format('YYYY-MM-DD'),
        checkOutDate: dates[1].format('YYYY-MM-DD')
      })).unwrap();

      // Reset the selected dates for the room type after adding to cart
      setSelectedDates(prev => ({ ...prev, [roomTypeId]: null }));
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  const columns = [
    {
      title: 'Accommodation Type',
      dataIndex: 'roomTypeName',
      key: 'roomTypeName',
      render: (roomTypeName: string, record: Room) => (
        <span
          style={{ color: '#1890ff', cursor: 'pointer' }}
          onClick={() => handleRoomTypeClick(record.roomTypeId)}
        >
          {roomTypeName}
        </span>
      ),
    },
    {
      title: 'Number of guests',
      dataIndex: 'roomTypeName',
      key: 'guests',
      render: (roomTypeName: string) => {
        let guestsCount = 1;

        switch (true) {
          case roomTypeName.toLowerCase().includes('double'):
            guestsCount = 2;
            break;
          case roomTypeName.toLowerCase().includes('triple'):
            guestsCount = 3;
            break;
          case roomTypeName.toLowerCase().includes('quad'):
            guestsCount = 4;
            break;
          case roomTypeName.toLowerCase().includes('suite'):
            guestsCount = 4;
            break;
          default:
            guestsCount = 1;
            break;
        }

        return (
          <>
            {[...Array(guestsCount)].map((_, index) => (
              <UserOutlined key={index} style={{ marginRight: 4 }} />
            ))}
          </>
        );
      },
    },
    {
      title: 'Available',
      dataIndex: 'available',
      key: 'available',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text: number) => <span style={{ color: 'red' }}>${text}</span>,
    },
    {
      title: 'Select Dates',
      key: 'calendar',
      render: (_: any, record: Room) => (
        <Space>
          <Popover
            content={
              <>
                <RangePicker
                  value={selectedDates[record.roomTypeId] || null}
                  onChange={(dates) => setSelectedDates(prev => ({ ...prev, [record.roomTypeId]: dates }))}
                  style={{ marginBottom: 10 }}
                />
                <Button onClick={() => handleConfirm(record.roomTypeId)}>
                  OK
                </Button>
              </>
            }
            title="Select Dates"
            trigger="click"
            visible={visiblePopover[record.roomTypeId] || false}
            onVisibleChange={(visible) => setVisiblePopover(prev => ({ ...prev, [record.roomTypeId]: visible }))}
          >
            <Button icon={<CalendarOutlined />}>
              {selectedDates[record.roomTypeId]
                ? `${selectedDates[record.roomTypeId]?.[0]?.format('YYYY-MM-DD')} to ${selectedDates[record.roomTypeId]?.[1]?.format('YYYY-MM-DD')}`
                : 'Select Dates'}
            </Button>
          </Popover>
        </Space>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: Room) => (
        <Button
          type="primary"
          icon={<ShoppingCartOutlined />}
          loading={shoppingCartLoading}
          onClick={() => handleAddToCart(record.roomTypeId)}
        >
          Add to Cart
        </Button>
      ),
    },
  ];

  return (
    <Table dataSource={rooms} columns={columns} loading={loading} rowKey="roomTypeId" />
  );
};

export default RoomTable;