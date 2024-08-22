import React from "react";
import { Header, Footer } from "../../components";
import { Row, Col, Typography, Button } from "antd";
import styles from "./RegisterPage.module.css";
import { useTranslation } from "react-i18next";

export const RegisterPage:React.FC = () => {
    
    const { t } = useTranslation();
    
    return (
      <>
        <Header />
        <div className={styles["page-content"]}>
          <Row style={{ marginTop: 20 }}>
            <h1>Register</h1>
          </Row>
        </div>
        <Footer />
      </>
    );
  };