import React from "react";
import "./index.css";

import { Layout } from "antd";
import { Route, Routes } from "react-router-dom";
import { Landing, Login, Register } from "./Page";
import PrivateRoute from "./HOC/PrivateRoute";

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh" }} className="w-full">
      <Header style={{ padding: 0 }} className="w-full" />
      <Content style={{ margin: "0 16px" }}>
        <Routes>
          <Route path="/" element={<PrivateRoute component={Landing} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Content>
      <Footer
        style={{ textAlign: "center" }}
        className="w-full bg-black text-white"
      >
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default App;
