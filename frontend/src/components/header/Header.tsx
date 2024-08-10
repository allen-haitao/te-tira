import React from "react";
import styles from "./Header.module.css";
import logo from "../../assets/logo.svg"
import { Layout, Typography, Input, Menu, Button, Dropdown } from "antd";
import { GlobalOutlined } from "@ant-design/icons";

export const Header: React.FC = () => {
    return (
      <div className={styles["app-header"]}>
            {/* top-header */}
            <div className={styles["top-header"]}>
                <div className={styles.inner}>
                <Typography.Text>Kia pai te whenua o Aotearoa</Typography.Text>
                <Dropdown.Button
                    style={{ marginLeft: 15 }}
                    overlay={
                    <Menu
                        items={[
                        { key: "1", label: "English" },
                        { key: "2", label: "Māori" },
                        { key: "3", label: "简体中文" },
                        { key: "3", label: "繁體中文" },
                        ]}
                    />
                    }
                    icon={<GlobalOutlined />}
                >
                    Language
                </Dropdown.Button>
                <Button.Group className={styles["button-group"]}>
                    <Button>Register</Button>
                    <Button>Login</Button>
                </Button.Group>
                </div>
            </div>
            <div className={styles["app-header"]}>
                <Layout.Header className={styles["main-header"]}>
                <img src={logo} alt="logo" className={styles["App-logo"]} />
                <Typography.Title level={3} className={styles.title}>
                    Te Tira
                </Typography.Title>
                <Input.Search
                    placeholder="Please enter a travel destination, theme, or keyword"
                    className={styles["search-input"]}
                />
                </Layout.Header>
                <Menu
                    mode={"horizontal"}
                    className={styles["main-menu"]}
                    items={[
                        { key: "1", label: "Home" },
                        { key: "2", label: "Weekend Tours" },
                        { key: "3", label: "Group Tours" },
                        { key: "4", label: "Individual Travel" },
                        { key: "5", label: "Private Tours" },
                        { key: "6", label: "Cruises" },
                        { key: "7", label: "Hotel + Attractions" },
                        { key: "8", label: "Local Activities" },
                        { key: "9", label: "Themed Tours" },
                        { key: "10", label: "Customized Tours" },
                        { key: "11", label: "Study Tours" },
                        { key: "12", label: "Visa" },
                        { key: "13", label: "Corporate Travel" },
                        { key: "14", label: "Luxury Travel" },
                        { key: "15", label: "Outdoor Adventures" },
                        { key: "16", label: "Insurance" },
                    ]}
                />
            </div>
      </div>
    );
}