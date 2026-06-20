import React from "react";
import { useLocation } from "react-router-dom";
import FormAddUsuario from "./FormAddUsuario";
import FormEditUsuario from "./FormEditUsuario";

const FormUsuario = () => {
  const location = useLocation();
  const isAdd = location.pathname === "/addusuario";

  return (
    <main className="content">
      <div className="container-fluid p-0">
        <div className="row">
          <div className="col-12 col-lg-10">
            {isAdd ? <FormAddUsuario /> : <FormEditUsuario />}
          </div>
        </div>
      </div>
    </main>
  );
};

export default FormUsuario;
