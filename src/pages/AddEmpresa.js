import React from 'react'

import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import Footer from '../components/Footer'
import FormEmpresaAdd from '../components/FormEmpresaAdd'

const AddEmpresa = () => {
  return (
    <div>
     <div className="wrapper">
        <Sidebar />

        <div className="main">
          <Header />
          <FormEmpresaAdd/>

          <Footer />
        </div>
      </div>
        
    </div>
  )
}

export default AddEmpresa