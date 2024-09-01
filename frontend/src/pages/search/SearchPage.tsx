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

  const loading = useSelector((state: any) => state.productSearch.loading);
  const error = useSelector((state: any) => state.productSearch.error);
  const pagination = useSelector((state: any) => state.productSearch.pagination);
  const productList = useSelector((state: any) => state.productSearch.data);

  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    if (keywords) {
      dispatch(searchProduct({ nextPage: 1, pageSize: 10, keywords }));
    }
  }, [location, dispatch, keywords]);

  const onPageChange = (nextPage: number, pageSize: number) => {
    if (keywords) {
      dispatch(searchProduct({ nextPage, pageSize, keywords }));
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
            data={productList || []}  // 确保传递的数据不是 null 或 undefined
            paging={pagination || undefined}  // 确保 pagination 对象符合预期
            onPageChange={onPageChange}  // 处理分页逻辑
          />
        </div>
      </MainLayout>
    </>
  );
};