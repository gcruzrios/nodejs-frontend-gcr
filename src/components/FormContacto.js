import React from "react";
import { useLocation } from "react-router-dom";
import FormAddContacto from "./FormAddContacto";
import FormEditContacto from "./FormEditContacto";

const FormContacto = () => {
  const location = useLocation();
  const isAdd = location.pathname === "/addcontacto";

  return (
    <main className="content">
      <div className="container-fluid p-0">
        <div className="row">
          <div className="col-12 col-lg-8">
            {isAdd ? <FormAddContacto /> : <FormEditContacto />}
          </div>
        </div>
      </div>
    </main>
  );
};

export default FormContacto;
