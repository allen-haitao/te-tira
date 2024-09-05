import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./DetailPage.module.css";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

interface MapProps {
  location: string; // 修改 location 为 string 类型
}

const Map: React.FC<MapProps> = ({ location }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null); // 新增一个 ref 来保存地图实例

  // 将字符串转换为 [latitude, longitude] 格式的数组
  const parseLocation = (location: string): [number, number] => {
    const [lat, lng] = location.split('|').map(Number); // 将字符串拆分并转换为数字
    return [lat, lng];
  };

  useEffect(() => {
    if (mapRef.current && location && !mapInstanceRef.current) {
      const position = parseLocation(location); // 解析位置

      // 初始化地图，设置视图为酒店的位置
      mapInstanceRef.current = L.map(mapRef.current).setView(position, 10);

      // 添加 TileLayer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstanceRef.current);

      // 在酒店位置添加标记
      L.marker(position).addTo(mapInstanceRef.current);
    }

    // 清理地图实例，确保不会重复初始化
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove(); // 移除地图实例
        mapInstanceRef.current = null; // 重置地图实例
      }
    };
  }, [location]);

  return (
    <div className={styles.mapContainer}>
      <div ref={mapRef} className={styles.map}></div>
    </div>
  );
};

export default Map;