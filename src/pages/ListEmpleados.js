import React from 'react'
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

import EmpleadoList from '../components/EmpleadosList';
const ListEmpleados = () => {
  return (
    <div>

<div className="wrapper">
        <Sidebar />

        <div className="main">
          <Header />
          <EmpleadoList/>

          <Footer />
        </div>
      </div>
    </div>
  )
}

export default ListEmpleados