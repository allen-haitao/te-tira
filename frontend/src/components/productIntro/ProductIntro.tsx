import styles from "./ProductIntro.module.css";
import React from "react";
import { Typography, Carousel, Image, Rate, Table } from "antd";
import { ColumnsType } from "antd/es/table";

import hotel1 from "../../assets/images/hotel_1.jpg";
import hotel2 from "../../assets/images/hotel_2.jpg";
import hotel3 from "../../assets/images/hotel_3.jpg";
import hotel4 from "../../assets/images/hotel_4.jpg";

interface PropsType {
  title: string;
  city: string;
  address: string | number;
  contact: number | string;
  location: string;
  price: string | number;
  rating: string | number;
  pictures: string[];
}

const columns: ColumnsType<RowType> = [
  {
    title: "title",
    dataIndex: "title",
    key: "title",
    align: "left",
    width: 120,
  },
  {
    title: "description",
    dataIndex: "description",
    key: "description",
    align: "center",
  },
];

interface RowType {
  title: string;
  description: string | number | JSX.Element;
  key: number;
}

export const ProductIntro: React.FC<PropsType> = ({
  title,
  city,
  address,
  contact,
  location,
  price,
  rating,
}) => {
  
  
  const convertRating = (rating: string | number): number => {
    if (typeof rating === 'number') return rating; 
    switch (rating) {
      case "OneStar":
        return 1;
      case "TwoStar":
        return 2;
      case "ThreeStar":
        return 3;
      case "FourStar":
        return 4;
      case "FiveStar":
        return 5;
      default:
        return 0; 
    }
  };

  const tableDataSource: RowType[] = [
    {
      key: 0,
      title: "Address",
      description: address,
    },
    {
      key: 1,
      title: "Contact",
      description: contact,
    },
    {
      key: 2,
      title: "Rate",
      description: (
        <>
          <Rate allowHalf disabled defaultValue={convertRating(rating)} />
          <Typography.Text style={{ marginLeft: 10 }}>
            {convertRating(rating)} Stars
          </Typography.Text>
        </>
      ),
    },
  ];

  return (
    <div className={styles["intro-container"]}>
      <Typography.Title level={4}>{title}</Typography.Title>
      <Typography.Text>{city}</Typography.Text>
      <div className={styles["intro-detail-content"]}>
        <Typography.Text style={{ marginLeft: 20 }}>
          Starting at
          $ <span className={styles["intro-detail-strong-text"]}>{price}</span>{" "}
        </Typography.Text>
      </div>
      <Carousel autoplay slidesToShow={3}>
        {[hotel1, hotel2, hotel3, hotel4].map((src, index) => (
          <Image key={index} height={150} src={src} />
        ))}
      </Carousel>
      <Table<RowType>
        columns={columns}
        dataSource={tableDataSource}
        size="small"
        bordered={false}
        pagination={false}
        showHeader={false}
      />
    </div>
  );
};