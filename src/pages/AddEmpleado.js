import React from 'react'

import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import Footer from '../components/Footer'


import FormEmpleado from '../components/FormEmpleado'

const AddEmpleado = () => {
  return (
    <div>
     <div className="wrapper">
        <Sidebar />

        <div className="main">
          <Header />
          <FormEmpleado/>

          <Footer />
        </div>
      </div>
        
    </div>
  )
}

export default AddEmpleado