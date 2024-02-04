import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const FormAddContacto = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [empresa, setEmpresa] = useState("");

  const [empresas, setEmpresas] = useState([]);

  const peticionGet = async () => {
    //console.log("en petición get")
    await axios.get("/api/empresa/obtenerempresas").then((response) => {
      setEmpresas(response.data);
      // console.log(empresas);
    });
  };

  useEffect(() => {
    //console.log("En el effect")
    peticionGet();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();

    const contacto = { nombre, email, telefono, empresa };

    console.log(contacto);

    const response = await axios.post(
      `/api/contacto/agregarcontacto`,
      contacto
    );
    const mensaje = response.data;
    console.log(mensaje);

    if (mensaje === null) {
      Swal.fire({
        text: "Error insertando contacto..",
        icon: "error",
      });
    } else {
      Swal.fire({
        text: "Contacto insertado con éxito..",
        icon: "success",
      });

      window.location.href = "/contactos";
    }
  };

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">Ingrese los datos de la empresa</h5>
        </div>
        <div className="card-body">
          <input
            type="text"
            className="form-control"
            placeholder="Nombre"
           
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="card-body">
          <input
            type="text"
            className="form-control"
            placeholder="Email"
          
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="card-body">
          <input
            type="text"
            className="form-control"
            placeholder="Telefóno"
            
            onChange={(e) => setTelefono(e.target.value)}
          />
        </div>
        <div className="card-body">
          <select
            className="form-select mb-3"
            
            onChange={(e) => setEmpresa(e.target.value)}
          >
            <option selected>Escoga la Empresa</option>
            {empresas.map((empresa) => ( 
            <option value={empresa.nombre}>{empresa.nombre}</option>
            ))} 
          </select>
        </div>

        <div className="card-body">
          <button className="btn btn-lg btn-primary" onClick={handleAdd}>
            Editar
          </button>{" "}
          <Link to="/contactos" className="btn btn-lg btn-secondary">
            Volver
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FormAddContacto;
