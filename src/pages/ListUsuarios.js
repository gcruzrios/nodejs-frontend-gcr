import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UsuariosList from "../components/UsuariosList";

const ListUsuarios = () => {
  return (
    <div>
      <div className="wrapper">
        <Sidebar />

        <div className="main">
          <Header />
          <UsuariosList/>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ListUsuarios;
