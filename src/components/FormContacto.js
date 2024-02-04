import React from "react";

import { useLocation } from 'react-router-dom';
import FormAddContacto from "./FormAddContacto";
import FormEditContacto from "./FormEditContacto";

const FormContacto = () => {

  const location = useLocation();
  console.log(location.pathname);

  return (
    <div>
   <main className="content">
        <div className="container-fluid p-0">
          <div className="mb-3">
            <h1 className="h3 d-inline align-middle">Formularios de Contactos</h1>
            
          </div>
          <div className="row">
            <div className="col-12 col-lg-8">

            { location.pathname==="/addcontacto" ? <FormAddContacto /> : <FormEditContacto />}  
            </div>

            
          </div>
        </div>
      </main>

    </div>
  )
}

export default FormContacto