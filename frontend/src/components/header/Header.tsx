import React, { useState, /*useEffect*/} from "react";
import image from "../../assets/image.png"
import styles from "./Header.module.css";
import { Typography, Button, Row, Col } from "antd";
import { EnvironmentOutlined, DollarCircleOutlined, GlobalOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { currencyItems } from "../../assets/data/Array";
import { useSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import {
    LanguageActionTypes,
    addLanguageActionCreator,
    changeLanguageActionCreator,
  } from "../../redux/language/languageActions";
import { useTranslation } from "react-i18next";

export const Header: React.FC = () => {
    const [visibleDropdown, setVisibleDropdown] = useState<string | null>(null);
    const [location, setLocation] = useState<string>("Unknown Location");
    const [selectedCurrency, setSelectedCurrency] = useState<string>("NZD");
    //const [selectedLanguage, setSelectedLanguage] = useState<string>("English");
    const navigate = useNavigate();
    //const location = useLocation();
    const params = useParams();

    const language = useSelector((state) => state.language);
    const languageList = useSelector((state) => state.languageList);
    const dispatch: Dispatch<LanguageActionTypes> = useDispatch();
    const { t } = useTranslation();
    
    /*
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

    */
   
    const handleIconClick = (type: string, e?: any) => {
        if (type === "language") {
            if (e?.key === "new") {
                dispatch(addLanguageActionCreator("new lang", "new_lang"));
            } else if (e) {
                dispatch(changeLanguageActionCreator(e.key));
            }
        } 
        // Toggle dropdown visibility for other types
        setVisibleDropdown(visibleDropdown === type ? null : type);
        
    };

    const renderDropdown = (type: string, items: any[]) => {
        return visibleDropdown === type && (
            <div className={styles["menu-list"]}>
                {items.map((item, index) => (
                    <a href="javascript:void(0)" 
                       className={styles["dropdown-item"]} 
                       key={index}
                       onClick={() => handleIconClick(type, { key: item.code })}>
                        {item.flag && (
                            <span role="img" aria-label={item.name}>
                                {item.flag}
                            </span>
                        )}
                        {" " + item.name}
                    </a>
                ))}
                <a href="javascript:void(0)" 
                className={styles["dropdown-item"]} 
                onClick={() => handleIconClick(type, { key: "new" })}>
                    <span role="img" aria-label={t("header.new_language")}>
                        ➕ {/* 可以用适当的图标替换 */}
                    </span>
                    {" " + t("header.new_language")}
                </a>
            </div>
        );
    };

    const currentLanguageName = languageList.find(
        (l: { code: string; name: string }) => l.code === language
      )?.name;
    
    return (
        <div className={styles["app-header"]}>
            <Row className={styles['top-header']}>
                <Col span={7}>
                    <span onClick={() => navigate("/")}>
                        <Typography.Title level={3} className={styles.title}>
                            Te Tira
                        </Typography.Title>
                        <Typography.Text className={styles.slogan}>
                            Ka tīmata tō haerenga Kiwi i konei
                        </Typography.Text>
                    </span>    
                </Col>
                    <Col className={styles["header-image"]}>
                        <img src={image} alt=" " className={styles.image}/>
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
                        <Typography.Text className={styles["selected-item"]}>{currentLanguageName || "Language"}</Typography.Text>
                        {renderDropdown("language", languageList)}
                    </Col>
                    <Col className={styles["top-button"]} onClick={() => window.location.href = "/help"}>
                        <QuestionCircleOutlined className={styles["button-icon"]} />
                        <Typography.Text className={styles["selected-item"]}>{t("header.help")}</Typography.Text>
                    </Col>
                    <Col>
                        <Button.Group className={styles["user-auth"]}>
                            <Button className={styles["auth-btn"]} onClick={()=>navigate("/register")}>{t("header.register")}</Button>
                            <Button className={styles["auth-btn"]} onClick={()=>navigate("/login")}>{t("header.login")}</Button>
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