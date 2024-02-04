import React, { useState } from "react";
import FormAddEmpresa from "./FormAddEmpresa";
import FormEditEmpresa from "./FormEditEmpresa";
import { Route, Link, Routes, useLocation } from 'react-router-dom';


const FormEmpresaAdd = () => {

  // const [isEdit, setIsEdit] = useState(false);
  // const location = useLocation();
  // console.log(location);
  
  // if (location.pathname ==="/addempresa"){
  //   setIsEdit(true)

  // }else{
  //   setIsEdit(false)
  // }

  return (
    <div>
      <main className="content">
        <div className="container-fluid p-0">
          <div className="mb-3">
            <h1 className="h3 d-inline align-middle">Formularios</h1>
          </div>
          <div className="row">
            <div className="col-12 col-lg-8">
            <FormAddEmpresa />
            {/* {isEdit ? <FormAddEmpresa /> : <FormEditEmpresa />}   */}
              
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FormEmpresaAdd;
