import React from "react";
import { Header, Footer } from "../../components";
import { Row, Col, Typography, Button } from "antd";
import styles from "./LogInPage.module.css";
import { useTranslation } from "react-i18next";

export const LogInPage:React.FC = () => {
    
    const { t } = useTranslation();
    
    return (
      <>
        <Header />
        <div className={styles["page-content"]}>
          <Row style={{ marginTop: 20 }}>
            <h1>Log In</h1>
          </Row>
        </div>
        <Footer />
      </>
    );
  };