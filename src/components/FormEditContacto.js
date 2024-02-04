import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

import { useParams } from "react-router-dom";

const FormEditContacto = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [empresas, setEmpresas] = useState([]);

  const { id } = useParams();

  const GetContacto = async () => {
    const response = await axios.get(`/api/contacto/obtenercontacto/${id}`);
    const mensaje = response.data;

    setNombre(mensaje[0].nombre);
    setTelefono(mensaje[0].telefono);
    setEmail(mensaje[0].email);
    setEmpresa(mensaje[0].empresa);
  };

  const peticionGetEmpresas = async () => {
    //console.log("en petición get")
    await axios.get("/api/empresa/obtenerempresas").then((response) => {
      setEmpresas(response.data);
      // console.log(empresas);
    });
  };

  useEffect(() => {
    GetContacto();
    peticionGetEmpresas();
  }, []);

  const handleEdit = async (e) => {
    e.preventDefault();

    //    const token = data.Token;
    //    localStorage.setItem("Token", token);

    const contacto = { nombre, telefono, email, empresa };
    console.log(contacto);
    const response = await axios.put(
      `/api/contacto/actualizarcontacto/${id}`,
      contacto
    );
    const respuesta = response.data;
    console.log(respuesta);

    if (respuesta === null) {
      Swal.fire({
        text: "Error actualizando contacto..",
        icon: "error",
      });
    } else {
      Swal.fire({
        text: "Contacto actualizado con éxito..",
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
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="card-body">
          <input
            type="text"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="card-body">
          <input
            type="text"
            className="form-control"
            placeholder="Telefóno"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </div>
        <div className="card-body">
          <select
            className="form-select mb-3"
            value={empresa}
            onChange={(e) => setEmpresa(e.target.value)}
          >
            <option selected>Escoga la Empresa</option>
            {empresas.map((empresa) => (
              <option value={empresa.nombre}>{empresa.nombre}</option>
            ))}
          </select>
        </div>

        <div className="card-body">
          <button className="btn btn-lg btn-primary" onClick={handleEdit}>
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

export default FormEditContacto;
