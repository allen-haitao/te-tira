import React from "react";
import { Image, Typography } from "antd";

interface PropsType {
  id: string | number;
  size: "large" | "small";
  imageSrc: string;
  price?: number | string;
  title?: string;
  asBackground?: boolean;
}

export const OfferImage: React.FC<PropsType> = ({
  id,
  size,
  imageSrc,
  price,
  title,
  asBackground = false,
}) => {
  const largeWidth = 600;
  const largeHeight = largeWidth / 4;  // 左侧4:1
  const smallWidth = 300;
  const smallHeight = smallWidth / 4;

  if (asBackground) {
    return (
      <div
        style={{
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      >
        {title && (
          <Typography.Text
            type="secondary"
            style={{ color: "#fff", position: "absolute", bottom: 10, left: 10 }}
          >
            {title.slice(0, 25)}
          </Typography.Text>
        )}
        {price && (
          <Typography.Text
            type="danger"
            strong
            style={{ color: "#fff", position: "absolute", bottom: 10, right: 10 }}
          >
            ¥ {price} 起
          </Typography.Text>
        )}
      </div>
    );
  }

  return (
    <>
      {size === "large" ? (
        <Image src={imageSrc} height={largeHeight} width={largeWidth} />
      ) : (
        <Image src={imageSrc} height={smallHeight} width={smallWidth} />
      )}
      <div>
        {title && (
          <Typography.Text type="secondary">
            {title.slice(0, 25)}
          </Typography.Text>
        )}
        {price && (
          <Typography.Text type="danger" strong>
            ¥ {price} 起
          </Typography.Text>
        )}
      </div>
    </>
  );
};