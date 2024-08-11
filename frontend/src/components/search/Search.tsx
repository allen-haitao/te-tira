import React from "react";
import styles from "./Search.module.css";
import {Input} from "antd";


export const Search: React.FC = () => {
    return (
        <Input.Search
        placeholder="Please enter a travel destination, theme, or keyword"
        className={styles["search-input"]}
        />
    );
}