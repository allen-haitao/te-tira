import styles from "./SearchPage.module.css";
import React, { useEffect } from "react";
import { Header, Footer, SearchBar, FilterArea, SearchResult } from "../../components";
import { useParams, useLocation } from "react-router-dom";
import { Spin } from "antd";
import { searchProduct } from "../../redux/productSearch/slice";
import { useSelector, useAppDispatch } from "../../redux/hooks";
import { MainLayout } from "../../layouts/mainLayout";

type MatchParams = {
  keywords: string;
}

export const SearchPage: React.FC = () => {
  const { keywords } = useParams<MatchParams>();
  
  const loading = useSelector((state) => state.productSearch.loading);
  const error = useSelector((s) => s.productSearch.error);
  const pagination = useSelector((s) => s.productSearch.pagination);
  const SearchResult = useSelector((s) => s.productSearch.data);

  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(()=>{
    if(keywords) {
      dispatch(searchProduct({nextPage:1, pageSize: 10, keywords}))
    }
  },[location])

  const onPageChange = (nextPage, pageSize) =>{
    if(keywords) {
      dispatch(searchProduct({nextPage, pageSize, keywords}))
    }
  }

  if (loading) {
    return (
      <Spin
        size="large"
        style={{
          marginTop: 200,
          marginBottom: 200,
          marginLeft: "auto",
          marginRight: "auto",
          width: "100%",
        }}
      />
    );
  }
  if (error) {
    return <div>error: {error}</div>;
  }
  
  return (
    <>
      <MainLayout>
        <SearchBar />
        <div className={styles["page-content"]}>
          {/* 分类过滤器 */}
          <div className={styles["product-list-container"]}>
            <FilterArea />
          </div>
          {/* 产品列表  */}
          <div className={styles["product-list-container"]}>
            <SearchResult
              data={SearchResult}
              paging={pagination}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      </MainLayout>
    </>
  );
};