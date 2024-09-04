import React from "react";
import styles from "./Search.module.css";
import { Typography, Input, Button } from "antd";
import { EnvironmentOutlined, CalendarOutlined, UserOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

export const Search: React.FC = () => {
    
    const { t } = useTranslation();
    
    return (
        <div className={styles["search-container"]}>
            <div className={styles["search-block"]}>
                <div className={styles["search-text"]}>
                    <Typography.Text className={styles["search-title"]}>
                        {t("search.search-title")}
                    </Typography.Text>
                    <Typography.Text className={styles["search-subtitle"]}>
                        {t("search.search-subtitle")}
                    </Typography.Text>
                </div>
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
            </div>
        </div>
    );
};