import React from "react";
import FormAddEmpresa from "./FormAddEmpresa";
import FormEditEmpresa from "./FormEditEmpresa";
import { useLocation } from 'react-router-dom';


const FormEmpresaEdit = () => {

 

  const location = useLocation();
  console.log(location.pathname);
  
   return (
    <div>
      <main className="content">
        <div className="container-fluid p-0">
          <div className="mb-3">
            <h1 className="h3 d-inline align-middle">Formularios</h1>
          </div>
          <div className="row">
            <div className="col-12 col-lg-8">
            {/* <FormEditEmpresa />  */}
            {location.pathname ==="/addempresa"? <FormAddEmpresa /> : <FormEditEmpresa />}   
              
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FormEmpresaEdit;
