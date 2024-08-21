import React from "react";
import { useParams } from 'react-router-dom';
import { Header, Footer, Search, Carousel, SideMenu, Offer1, Offer2, ProductCollection, CountryRecommend, HotelRec} from "../../components";
import { Row, Col, Typography, Button } from "antd";
import styles from "./DetailPage.module.css";
import { useTranslation } from "react-i18next";

type MatchParams = {
    touristRouteId : string,
    other : string
}

export const DetailPage:React.FC = () => {
    
    const { t } = useTranslation();
    var parmas = useParams<MatchParams>();

    return (
      <>
        <Header />
        <div className={styles["page-content"]}>
          <Row style={{ marginTop: 20 }}>
            <h1>Detail, id: {parmas.touristRouteId} {parmas.other}</h1>;
          </Row>
        </div>
        <Footer />
      </>
    );
  };