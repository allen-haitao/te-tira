import React, { useEffect, useState } from 'react';
import { Table, Button, Popover, DatePicker, Space } from 'antd';
import { UserOutlined, ShoppingCartOutlined, CalendarOutlined } from '@ant-design/icons';
import { useSelector, useAppDispatch } from "../../redux/hooks";
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
  const [visiblePopover, setVisiblePopover] = useState<{ [key: string]: boolean }>({}); // 控制Popover的显示

  const dispatch = useAppDispatch();
  const jwt = useSelector((state: RootState) => state.user.token) as string;
  const shoppingCartLoading = useSelector((state: RootState) => state.shoppingCart.loading);
  const { loading, rooms } = useSelector((state: RootState) => state.room);

  useEffect(() => {
    // 从redux中获取房间信息
    if (hotelId) {
      dispatch(getRoomsByHotelId(hotelId));
    }
  }, [hotelId, dispatch]);

  // 确认选择日期后关闭 Popover
  const handleConfirm = (roomTypeId: string) => {
    setVisiblePopover(prev => ({ ...prev, [roomTypeId]: false }));
  };

  // 表格的列定义
  const columns = [
    {
      title: 'Accommodation Type',
      dataIndex: 'roomTypeName',
      key: 'roomTypeName',
    },
    {
      title: 'Number of guests',
      dataIndex: 'roomTypeName',
      key: 'guests',
      render: (roomTypeName: string) => {
        let guestsCount = 1; // 默认是 1 个客人

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
            guestsCount = 4; // 假设套房可以容纳 4 人
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
          onClick={() => {
            dispatch(addShoppingCartItem({ jwt, roomTypeId: record.roomTypeId }));
          }}
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