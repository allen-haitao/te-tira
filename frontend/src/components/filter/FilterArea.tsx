// filterArea.tsx
import React, { useState } from "react";
import { Divider, Button } from "antd";
import { Filter } from "./Filter";
import styles from "./FilterArea.module.css";

export const FilterArea: React.FC = () => {
  const [filters, setFilters] = useState({
    location: "",
    star: "",
    roomType: "",
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <>
      <Filter
        title="路线评价"
        tags={["1星", "2星", "3星", "4星", "5星"]}
        onChange={(value) => handleFilterChange("star", value)}
      />
      <Divider dashed className={styles["filter-divider"]} />
      <Filter
        title="出发城市"
        tags={["北京", "上海", "广州", "深圳"]}
        onChange={(value) => handleFilterChange("location", value)}
      />
      {/* Add more filters as needed */}
      <Button type="primary" onClick={() => {/* Trigger search with filters */}}>
        Apply Filters
      </Button>
    </>
  );
};