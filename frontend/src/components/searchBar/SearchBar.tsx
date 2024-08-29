import React from "react";
import styles from "./SearchBar.module.css";
import { Typography, Input, Button } from "antd";
import { EnvironmentOutlined, CalendarOutlined, UserOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

export const SearchBar: React.FC = () => {
    
    const { t } = useTranslation();
    
    return (     
        <div className={styles["search-box"]}>
            <Input 
                prefix={<EnvironmentOutlined />}
                placeholder={t("search.search-input1")}
                className={styles["search-input"]}
            />
            <Input
                prefix={<CalendarOutlined />}
                placeholder={t("search.search-input2")}
                className={styles["search-input"]}
            />
            <Input
                prefix={<UserOutlined />}
                placeholder={t("search.search-input3")}
                className={styles["search-input"]}
            />
            <Button type="primary" className={styles["search-button"]}>
                {t("search.search-button")}
            </Button>
        </div>
    );
};