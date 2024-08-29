import React, { useState } from "react";
import image from "../../assets/image.png"
import styles from "./UserLayout.module.css";
import { Link } from "react-router-dom";
import { GlobalOutlined } from "@ant-design/icons";
import { Layout, Typography, Row, Col } from "antd";
import { changeLanguageActionCreator } from "../../redux/language/languageActions";
import { useSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
const { Header, Content } = Layout;

interface PropsTypes {
  children: React.ReactNode;
}

export const UserLayout: React.FC<PropsTypes> = (props) => {
  const [visibleDropdown, setVisibleDropdown] = useState<string | null>(null);
  const language = useSelector((state) => state.language.language);
  const languageList = useSelector((state) => state.language.languageList);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleIconClick = (type: string, e?: any) => {
    if (type === "language" && e) {
      dispatch(changeLanguageActionCreator(e.key)); // 仅处理已有语言的切换
    }
    // Toggle dropdown visibility for language selection
    setVisibleDropdown(visibleDropdown === type ? null : type);
  };

  const renderDropdown = (type: string, items: any[]) => {
    return (
      visibleDropdown === type && (
        <div className={styles["menu-list"]}>
          {items.map((item, index) => (
            <a
              href="javascript:void(0)"
              className={styles["dropdown-item"]}
              key={index}
              onClick={() => handleIconClick(type, { key: item.code })}
            >
              {item.flag && (
                <span role="img" aria-label={item.name}>
                  {item.flag}
                </span>
              )}
              {" " + item.name}
            </a>
          ))}
        </div>
      )
    );
  };

  const currentLanguageName = languageList.find(
    (l: { code: string; name: string }) => l.code === language
  )?.name;

  return (
    <Layout className={styles["user-layout-container"]}>
      <div className={styles['language']}>
        <Col onClick={() => handleIconClick("language")}>
          <GlobalOutlined className={styles["language-button"]} />
          <Typography.Text className={styles["selected-item"]}>{currentLanguageName || "Language"}</Typography.Text>
          {renderDropdown("language", languageList)}
        </Col>
      </div>
      <Content className={styles["content"]}>
        <Row className={styles["header"]}>
          <Col className={styles["image-container"]}>
            <img src={image} alt=" " className={styles.image}/>
          </Col>
          <Col className={styles["title-container"]}>
            <span className={styles["title"]}>Te Tira</span>
          </Col>
        </Row>
        <Row className={styles["desc"]}>
          Ka tīmata tō haerenga Kiwi i konei
        </Row>
          {props.children}
      </Content>
    </Layout>
  );
};