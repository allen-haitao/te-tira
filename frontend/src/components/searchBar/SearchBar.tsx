import React, { useState } from "react";
import styles from "./SearchBar.module.css";
import { Input, Button, DatePicker } from "antd";
import { EnvironmentOutlined, CalendarOutlined, UserOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { cityNames } from "../../assets/data/CityNames";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Moment } from "moment"; // 引入Moment类型而不是整个moment库

const { RangePicker } = DatePicker; // 导入 RangePicker 组件

export const SearchBar: React.FC = () => {
  const { t } = useTranslation();
  const [visibleDropdown, setVisibleDropdown] = useState<boolean>(false);
  const [roomTypeDropdownVisible, setRoomTypeDropdownVisible] = useState<boolean>(false);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedRoomType, setSelectedRoomType] = useState<string>(""); // 新增状态管理房型选择
  const [dateRange, setDateRange] = useState<[Moment | null, Moment | null] | null>(null); // 使用Moment类型
  const [isRangePickerOpen, setIsRangePickerOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLocationClick = () => {
    setVisibleDropdown(!visibleDropdown);
    setSearchTerm(""); // 清空输入框，显示所有城市
  };

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    setSearchTerm(location); // 填充选中的城市到输入框
    setVisibleDropdown(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setVisibleDropdown(true); // 输入时始终显示下拉菜单
  };

  const handleClearLocation = () => {
    setSelectedLocation("");
    setSearchTerm("");
  };

  const handleClearDateRange = () => {
    setDateRange(null);
  };

  const handleRoomTypeSelect = (roomType: string) => {
    setSelectedRoomType(roomType);
    setRoomTypeDropdownVisible(false);
  };

  const handleRoomTypeInputClick = () => {
    setRoomTypeDropdownVisible(!roomTypeDropdownVisible);
  };

  const filteredCities = cityNames.filter((city) =>
    city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRangePickerChange = (dates: [Moment | null, Moment | null] | null) => {
    setDateRange(dates);
    setIsRangePickerOpen(false); // 选择完日期后关闭日期选择器
  };

  const handleRangePickerOpenChange = (open: boolean) => {
    setIsRangePickerOpen(open);
  };

  const handleSearch = () => {
    // 将搜索条件转换为 URL 友好的字符串形式
    const keywords = [
      selectedLocation || 'any', // 如果没有选择地点，则使用默认值
      dateRange
        ? `${dateRange[0]?.format("YYYY-MM-DD")}_${dateRange[1]?.format("YYYY-MM-DD")}`
        : 'any', // 如果没有选择日期范围，则使用默认值
      selectedRoomType || 'any' // 如果没有选择房型，则使用默认值
    ].join('-'); // 使用连字符（-）分隔条件
  
    // 使用 navigate 函数传递路径参数
    navigate(`/search/${keywords}`); 
  };

  return (
    <div className={styles["search-box"]}>
      {/* 地点选择器输入框 */}
      <div className={styles["search-input-wrapper"]}>
        <Input
          prefix={
            <EnvironmentOutlined
              onClick={handleLocationClick}
              style={{ cursor: "pointer" }}
            />
          }
          suffix={
            searchTerm ? (
              <CloseCircleOutlined
                onClick={handleClearLocation}
                style={{ cursor: "pointer" }}
              />
            ) : null
          }
          placeholder={t("search.search-input1")}
          className={styles["search-input"]}
          value={searchTerm}
          onChange={handleInputChange}
          onClick={handleLocationClick}
        />
        {visibleDropdown && (
          <div className={styles["dropdown"]}>
            {filteredCities.map((city, index) => (
              <div
                key={index}
                className={styles["dropdown-item"]}
                onClick={() => handleLocationSelect(city)}
              >
                {city}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* 日期选择器输入框 */}
      <div className={styles["search-input-wrapper"]}>
        <Input
          prefix={
            <CalendarOutlined
              onClick={() => setIsRangePickerOpen(true)}
              style={{ cursor: "pointer" }}
            />
          }
          suffix={
            dateRange && dateRange[0] && dateRange[1] ? (
              <CloseCircleOutlined
                onClick={handleClearDateRange}
                style={{ cursor: "pointer" }}
              />
            ) : null
          }
          placeholder={t("search.search-input2")}
          className={styles["search-input"]}
          value={
            dateRange && dateRange[0] && dateRange[1]
              ? `${dateRange[0].format("YYYY-MM-DD")} - ${dateRange[1].format("YYYY-MM-DD")}`
              : ""
          }
          onClick={() => setIsRangePickerOpen(true)}
          readOnly // 设置为只读，以便点击时不触发输入事件，而是显示日期选择器
        />
        <RangePicker
          open={isRangePickerOpen}
          onChange={handleRangePickerChange}
          onOpenChange={handleRangePickerOpenChange}
          getPopupContainer={(trigger) => trigger.parentElement || document.body} // 确保 RangePicker 在父容器内
          style={{
            visibility: "hidden", // 隐藏 RangePicker 的输入框
            width: 0,
            height: 0,
            position: "absolute",
          }}
          dropdownClassName={styles["custom-range-picker"]} // 自定义 className 用于控制样式
        />
      </div>

      {/* 房型选择输入框 */}
      <div className={styles["search-input-wrapper"]}>
        <Input
          prefix={<UserOutlined />}
          suffix={
            selectedRoomType ? (
              <CloseCircleOutlined
                onClick={() => setSelectedRoomType("")}
                style={{ cursor: "pointer" }}
              />
            ) : null
          }
          placeholder={t("search.search-input3")}
          className={styles["search-input"]}
          value={selectedRoomType}
          onClick={handleRoomTypeInputClick}
          readOnly // 使输入框只读以防止手动输入
        />
        {roomTypeDropdownVisible && (
          <div className={styles["dropdown"]}>
            {["Single Room", "Suite Room", "Deluxe Room"].map((roomType, index) => (
              <div
                key={index}
                className={styles["dropdown-item"]}
                onClick={() => handleRoomTypeSelect(roomType)}
              >
                {roomType}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 搜索按钮 */}
      <Button type="primary" className={styles["search-button"]} onClick={() => handleSearch()}>
        {t("search.search-button")}
      </Button>
    </div>
  );
};