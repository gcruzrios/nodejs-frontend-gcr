import React from 'react'
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";



const Blank = () => {
  return (
    <div>
  <div className="wrapper">
        <Sidebar />

        <div className="main">
          <Header />
          

          <Footer />
        </div>
      </div>

    </div>
  )
}

export default Blank