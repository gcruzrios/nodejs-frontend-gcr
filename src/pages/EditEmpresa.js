import React from 'react'


import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import Footer from '../components/Footer'
import FormEmpresaEdit from '../components/FormEmpresaEdit'

const EditEmpresa = () => {
  return (
    <div>
        <div className="wrapper">
        <Sidebar />

        <div className="main">
          <Header />
          <FormEmpresaEdit/>

          <Footer />
        </div>
      </div>
    </div>
  )
}

export default EditEmpresa