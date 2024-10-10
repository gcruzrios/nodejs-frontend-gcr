import React from "react";

import { useLocation } from 'react-router-dom';

import FormAddEmpleado from "./FormAddEmpleado";
import FormEditEmpleado from "./FormEditEmpleado";

const FormEmpleado = () => {

  const location = useLocation();
  console.log(location.pathname);

  return (
    <div>
   <main className="content">
        <div className="container-fluid p-0">
          <div className="mb-3">
            <h1 className="h3 d-inline align-middle">Formularios de Empleados</h1>
            
          </div>
          <div className="row">
            <div className="col-12 col-lg-8">

            { location.pathname==="/addempleado" ? <FormAddEmpleado /> : <FormEditEmpleado />}  
            </div>

            
          </div>
        </div>
      </main>

    </div>
  )
}

export default FormEmpleado