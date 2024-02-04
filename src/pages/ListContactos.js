import React from 'react'
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ContactoList from '../components/ContactosList';
const ListContactos = () => {
  return (
    <div>

<div className="wrapper">
        <Sidebar />

        <div className="main">
          <Header />
          <ContactoList/>

          <Footer />
        </div>
      </div>
    </div>
  )
}

export default ListContactos