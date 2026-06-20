import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DashboardContent from "../components/DashboardContent";

const Index = () => {
  return (
    <div className="wrapper">
      <Sidebar />
      <div className="main">
        <Header />
        <DashboardContent />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
