import React, { useState, useEffect } from "react";
import image from "../../assets/image.png"
// import { useNavigate } from "react-router-dom"; // 先注释掉导航相关的代码
import styles from "./Header.module.css";
import { Typography, Menu, Button, Row, Col } from "antd";
import { EnvironmentOutlined, DollarCircleOutlined, GlobalOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { currencyItems, langItems, menuItems } from "../../assets/data/Array";

export const Header: React.FC = () => {
    const [visibleDropdown, setVisibleDropdown] = useState<string | null>(null);
    const [location, setLocation] = useState<string>("Unknown Location");
    const [selectedCurrency, setSelectedCurrency] = useState<string>("NZD");
    const [selectedLanguage, setSelectedLanguage] = useState<string>("English");

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    fetchLocationName(position.coords.latitude, position.coords.longitude)
                        .then((locationName) => setLocation(locationName))
                        .catch((error) => {
                            console.error("Error fetching location:", error);
                            setLocation("Unknown Location");
                        });
                },
                (error) => {
                    console.error("Error fetching location:", error);
                }
            );
        }
    }, []);

    const handleIconClick = (type: string) => {
        setVisibleDropdown(visibleDropdown === type ? null : type);
    };

    const renderDropdown = (type: string, items: any[]) => {
        return visibleDropdown === type && (
            <div className={styles["menu-list"]}>
                {items.map((item, index) => (
                    <a href="#" className={styles["dropdown-item"]} key={index}>
                        {typeof item === "string" ? item : (
                            <>
                                <span role="img" aria-label={item.label}>
                                    {item.flag}
                                </span>
                                {" " + item.label}
                            </>
                        )}
                    </a>
                ))}
            </div>
        );
    };

    return (
        <div className={styles["app-header"]}>
            <Row className={styles['top-header']}>
                <Col span={7}>
                    <Typography.Title level={3} className={styles.title}>
                        Te Tira
                    </Typography.Title>
                    <Typography.Text className={styles.slogan}>
                        Ka tīmata tō haerenga Kiwi i konei
                    </Typography.Text>
                </Col>
                    <Col className={styles["header-image"]}>
                        <img src={image} alt="image" className={styles.image}/>
                    </Col>
                    <Col className={styles["top-button"]} onClick={() => handleIconClick("location")}>
                        <EnvironmentOutlined className={styles["button-icon"]} />
                        <Typography.Text className={styles["selected-item"]}>{location}</Typography.Text>
                        {renderDropdown("location", [location])}
                    </Col>
                    <Col className={styles["top-button"]} onClick={() => handleIconClick("currency")}>
                        <DollarCircleOutlined className={styles["button-icon"]} />
                        <Typography.Text className={styles["selected-item"]}>{selectedCurrency}</Typography.Text>
                        {renderDropdown("currency", currencyItems)}
                    </Col>
                    <Col className={styles["top-button"]} onClick={() => handleIconClick("language")}>
                        <GlobalOutlined className={styles["button-icon"]} />
                        <Typography.Text className={styles["selected-item"]}>{selectedLanguage}</Typography.Text>
                        {renderDropdown("language", langItems)}
                    </Col>
                    <Col className={styles["top-button"]} onClick={() => window.location.href = "/help"}>
                        <QuestionCircleOutlined className={styles["button-icon"]} />
                        <Typography.Text className={styles["selected-item"]}>Help</Typography.Text>
                    </Col>
                    <Col>
                        <Button.Group className={styles["user-auth"]}>
                            <Button className={styles["auth-btn"]}>Register</Button>
                            <Button className={styles["auth-btn"]}>Login</Button>
                        </Button.Group>
                    </Col>
            </Row>
        </div>
    );
}

// 使用Google Maps Geocoding API获取地名
async function fetchLocationName(latitude: number, longitude: number): Promise<string> {
    const apiKey = "YOUR_GOOGLE_MAPS_API_KEY"; // 将此替换为您的Google Maps API密钥
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`);
    const data = await response.json();
    if (data.status === "OK" && data.results.length > 0) {
        return data.results[0].formatted_address;
    } else {
        throw new Error("Unable to fetch location name");
    }
}