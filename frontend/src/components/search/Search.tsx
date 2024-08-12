import React from "react";
import styles from "./Search.module.css";
import { Typography, Input, Button } from "antd";
import { EnvironmentOutlined, CalendarOutlined, UserOutlined } from "@ant-design/icons";

export const Search: React.FC = () => {
    return (
        <div className={styles["search-container"]}>
            <div className={styles["search-block"]}>
                <div className={styles["search-text"]}>
                    <Typography.Text className={styles["search-title"]}>
                        Find your next stay
                    </Typography.Text>
                    <Typography.Text className={styles["search-subtitle"]}>
                        Search low prices on hotels, homes and much more...
                    </Typography.Text>
                </div>
                <div className={styles["search-box"]}>
                    <Input
                        prefix={<EnvironmentOutlined />}
                        placeholder="Where are you going?"
                        className={styles["search-input"]}
                    />
                    <Input
                        prefix={<CalendarOutlined />}
                        placeholder="Check-in date - Check-out date"
                        className={styles["search-input"]}
                    />
                    <Input
                        prefix={<UserOutlined />}
                        placeholder="2 adults · 0 children · 1 room"
                        className={styles["search-input"]}
                    />
                    <Button type="primary" className={styles["search-button"]}>
                        Search
                    </Button>
                </div>
            </div>
        </div>
    );
};