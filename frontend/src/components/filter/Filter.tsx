import React from "react";
import { FilterTag } from "./FilterTag";
import { Typography, Divider } from "antd";

const { Text } = Typography;

interface PropsType {
  title: string;
  tags: string[];
  onChange?: (value: string) => void;  // 回调函数，当标签被选中时触发
}

export const Filter: React.FC<PropsType> = ({ title, tags, onChange }) => {
  return (
    <div>
      <Text style={{ marginRight: 40, fontSize: 15, fontWeight: 500 }}>
        {title} :{" "}
      </Text>
      {tags.map((tag, index) => {
        const isLastTag = index === tags.length - 1;

        return (
          <React.Fragment key={`filter${index}`}>
            <FilterTag onSelect={() => onChange && onChange(tag)}>
              {tag}
            </FilterTag>
            {!isLastTag && <Divider type="vertical" />}
          </React.Fragment>
        );
      })}
    </div>
  );
};