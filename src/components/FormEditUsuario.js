import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

import { useParams } from "react-router-dom";

const FormEditUsuario = () => {

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { id } = useParams();

  const GetUsuario = async () => {
    const response = await axios.get(`/api/usuario/obtenerusuario/${id}`);
    const mensaje = response.data;

    setNombre(mensaje[0].nombre);
    setTelefono(mensaje[0].telefono);
    setEmail(mensaje[0].email);
    setPassword(mensaje[0].password);
   
    setRole(mensaje[0].role);
  };

 

  useEffect(() => {
    GetUsuario();
   
  }, []);

  const handleEdit = async (e) => {
    e.preventDefault();

    //    const token = data.Token;
    //    localStorage.setItem("Token", token);

    const usuario = { nombre, telefono, email, role };
    console.log(usuario);
    const response = await axios.put(
      `/api/usuario/actualizarusuario/${id}`, usuario
    );
    const respuesta = response.data;
    console.log(respuesta);

    if (respuesta === null) {
      Swal.fire({
        text: "Error actualizando registro..",
        icon: "error",
      });
    } else {
      Swal.fire({
        text: "Registro actualizado con éxito..",
        icon: "success",
      });

      window.location.href = "/usuarios";
    }
  };

  return (
    <div>

<div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">Ingrese los datos de la empresa</h5>
        </div>
        <div className="card-body">
          <input type="text" className="form-control" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)}/>
        </div>
        <div className="card-body">
          <input type="text" className="form-control" placeholder="Email" value={email} disabled onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="card-body">
          <input type="text" className="form-control" placeholder="Telefóno"  value={telefono} onChange={(e) => setTelefono(e.target.value)} />
        </div>
        <div className="card-body">
          <input type="password" className="form-control" placeholder="Password" value={password} disabled onChange={(e) => setPassword(e.target.value)} />
        </div>
        
        <div className="card-body">
          <select className="form-select mb-3"  value={role} onChange={(e) => setRole(e.target.value)}>
            <option selected>Escoga el Role</option>
            <option value="Admin">Administrador</option>
            <option value="Ventas">Ventas</option>
            <option value="Soporte">Soporte</option>
            <option value="TIC">TIC</option>
      
          </select>
        </div>
      
        <div className="card-body">

            <button className="btn btn-lg btn-primary" onClick={handleEdit} >Editar</button>
            {" "}
            <Link to="/usuarios" className="btn btn-lg btn-secondary">Volver</Link>
        </div>

      </div>

   
    </div>
  )
}

export default FormEditUsuario