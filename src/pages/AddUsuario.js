import React from 'react'

import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import Footer from '../components/Footer'

import FormUsuario from '../components/FormUsuario'

const AddUsuario = () => {
  return (
    <div>
     <div className="wrapper">
        <Sidebar />

        <div className="main">
          <Header />
          <FormUsuario/>

          <Footer />
        </div>
      </div>
        
    </div>
  )
}

export default AddUsuario