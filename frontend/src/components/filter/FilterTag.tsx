import React, { useState } from "react";
import { Tag } from "antd";

const { CheckableTag } = Tag;

interface PropsType {
  onSelect?: () => void;  // 选择后的回调函数
  children?: React.ReactNode;  // 子元素
}

export const FilterTag: React.FC<PropsType> = ({ onSelect, children }) => {
  const [checked, setChecked] = useState(false);  // 选中状态

  const handleChange = (checked: boolean) => {
    setChecked(checked);
    if (onSelect) {
      onSelect();  // 调用 onSelect 回调函数
    }
  };

  return (
    <CheckableTag checked={checked} onChange={handleChange}>
      {children}
    </CheckableTag>
  );
};