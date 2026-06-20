import React from "react";
import FormAddEmpresa from "./FormAddEmpresa";
import FormEditEmpresa from "./FormEditEmpresa";
import { useLocation } from "react-router-dom";

const FormEmpresaEdit = () => {
  const location = useLocation();
  const isAdd = location.pathname === "/addempresa";

  return (
    <main className="content">
      <div className="container-fluid p-0">
        <div className="row">
          <div className="col-12 col-lg-8">
            {isAdd ? <FormAddEmpresa /> : <FormEditEmpresa />}
          </div>
        </div>
      </div>
    </main>
  );
};

export default FormEmpresaEdit;
