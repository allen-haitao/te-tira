import React from "react";
import styles from "./ProductCollection.module.css";
import { Image, Typography } from "antd";
import {Link} from 'react-router-dom'

interface PropsType {
    id: string | number;
    size: "large" | "small";
    imageSrc: string;
    price: number | string;
    title: string;
}

export const ProductImage: React.FC<PropsType> = ({id, size, imageSrc, price, title}) => {
    return (
      <Link to={`/detail/${id}`}>
        {size == "large" ? (
          <Image src={imageSrc} 
          className={styles.image_large}
          preview={false}  // 禁用预览功能
          />
        ) : (
          <Image src={imageSrc} 
          className={styles.image_small} 
          preview={false}  // 禁用预览功能
          />
        )}
        <div>
          <Typography.Text type="secondary">
            {title}
          </Typography.Text>
          <Typography.Text type="danger" strong>
            $ {price}
          </Typography.Text>
        </div>
      </Link>
    );
}