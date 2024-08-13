import React from "react";
import { Image, Typography } from "antd";

interface PropsType {
  id: string | number;
  size: "large" | "small";
  imageSrc: string;
  price?: number | string;
  title?: string;
  asBackground?: boolean;
  isLeftOffer?: boolean;  // 新增，用于区分左侧Offer
}

export const OfferImage: React.FC<PropsType> = ({
  id,
  size,
  imageSrc,
  price,
  title,
  asBackground = false,
  isLeftOffer = false,  // 默认不是左侧Offer
}) => {
  // 将宽高比改为 4:1 用于左侧Offer
  const largeWidth = isLeftOffer ? 600 : 600;  // 左侧和右侧宽度保持相同
  const largeHeight = isLeftOffer ? largeWidth / 4 : largeWidth / 5;  // 左侧4:1，右侧5:1
  const smallWidth = 300;
  const smallHeight = smallWidth / 5;

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