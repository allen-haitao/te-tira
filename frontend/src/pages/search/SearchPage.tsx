import styles from "./SearchPage.module.css";
import React, { useEffect } from "react";
import { SearchBar, FilterArea, ProductList } from "../../components";
import { useParams, useLocation } from "react-router-dom";
import { Spin } from "antd";
import { searchProduct } from "../../redux/productSearch/slice";
import { useSelector, useAppDispatch } from "../../redux/hooks";
import { MainLayout } from "../../layouts/mainLayout";

type MatchParams = {
  keywords: string;
};

export const SearchPage: React.FC = () => {
  const { keywords } = useParams<MatchParams>();

  const loading = useSelector((state) => state.productSearch.loading);
  const error = useSelector((s) => s.productSearch.error);
  const pagination = useSelector((s) => s.productSearch.pagination);
  const productList = useSelector((s) => s.productSearch.data);

  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    if (keywords) {
      // 解析keywords，提取location, dateRange, roomType
      const [location, dateRange, roomType] = keywords.split("-");

      // 处理日期范围
      let startDate: string | undefined = undefined;
      let endDate: string | undefined = undefined;
      if (dateRange && dateRange !== "any") {
        const dates = dateRange.split("_");
        if (dates.length === 2) {
          startDate = dates[0];
          endDate = dates[1];
        }
      }

      // 构建搜索参数字符串
      const searchParams = [
        location !== "any" ? location : "",
        startDate ? `${startDate}_${endDate}` : "any",
        roomType !== "any" ? roomType : ""
      ].join("-");

      // 触发搜索操作
      dispatch(searchProduct({ nextPage: 1, pageSize: 10, keywords: searchParams }));
    }
  }, [location]);

  const onPageChange = (nextPage: number, pageSize: number) => {
    if (keywords) {
      const [location, dateRange, roomType] = keywords.split("-");
      let startDate: string | undefined = undefined;
      let endDate: string | undefined = undefined;
      if (dateRange && dateRange !== "any") {
        const dates = dateRange.split("_");
        if (dates.length === 2) {
          startDate = dates[0];
          endDate = dates[1];
        }
      }

      const searchParams = [
        location !== "any" ? location : "",
        startDate ? `${startDate}_${endDate}` : "any",
        roomType !== "any" ? roomType : ""
      ].join("-");

      dispatch(searchProduct({ nextPage, pageSize, keywords: searchParams }));
    }
  };

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
        {/* 分类过滤器 */}
        <div className={styles["product-list-container"]}>
          <FilterArea />
        </div>
        {/* 产品列表  */}
        <div className={styles["product-list-container"]}>
          <ProductList
            data={productList}
            paging={pagination}
            onPageChange={onPageChange}
          />
        </div>
      </MainLayout>
    </>
  );
};