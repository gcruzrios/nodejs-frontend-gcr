import React from 'react'

import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import Footer from '../components/Footer'

import FormContacto from '../components/FormContacto'

const AddEmpleado = () => {
  return (
    <div>
     <div className="wrapper">
        <Sidebar />

        <div className="main">
          <Header />
          <FormContacto/>

          <Footer />
        </div>
      </div>
        
    </div>
  )
}

export default AddEmpleado