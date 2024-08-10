import React from "react";
import { Layout, Typography, Input, Menu, Button, Dropdown } from "antd";

export const Footer: React.FC = () => {
    return (
        <Layout.Footer>
        <Typography.Title level={3} style={{ textAlign: "center" }}>
          Copyright @ Te Tira
        </Typography.Title>
      </Layout.Footer>
    );
};