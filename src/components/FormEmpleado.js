import React from "react";
import { useLocation } from "react-router-dom";
import FormAddEmpleado from "./FormAddEmpleado";
import FormEditEmpleado from "./FormEditEmpleado";

const FormEmpleado = () => {
  const location = useLocation();
  const isAdd = location.pathname.startsWith("/addempleado");

  return (
    <main className="content">
      <div className="container-fluid p-0">
        <div className="row">
          <div className="col-12 col-lg-10">
            {isAdd ? <FormAddEmpleado /> : <FormEditEmpleado />}
          </div>
        </div>
      </div>
    </main>
  );
};

export default FormEmpleado;
