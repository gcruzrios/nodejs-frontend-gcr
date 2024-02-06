import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";


const FormAddUsuario = () => {

    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    
    
   const handleAdd = async (e) => {
        e.preventDefault();
    
        const usuario = { nombre, email, telefono, password, role };
    
        console.log(usuario);
    
        const response = await axios.post(`/api/usuario/agregarusuario`, usuario);
        const mensaje = response.data;
        console.log(mensaje);
    
        if (mensaje === null) {
          Swal.fire({
            text: "Error insertando usuario..",
            icon: "error",
          });
        } else {
          Swal.fire({
            text: "usuario insertada con éxito..",
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
          <input type="text" className="form-control" placeholder="Nombre" onChange={(e) => setNombre(e.target.value)}/>
        </div>
        <div className="card-body">
          <input type="text" className="form-control" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="card-body">
          <input type="text" className="form-control" placeholder="Telefóno" onChange={(e) => setTelefono(e.target.value)} />
        </div>
        <div className="card-body">
          <input type="password" className="form-control" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="card-body">
          <select className="form-select mb-3" onChange={(e) => setRole(e.target.value)}>
            <option selected>Escoga el Role</option>
            <option value="Admin">Administrador</option>
            <option value="Ventas">Ventas</option>
            <option value="Soporte">Soporte</option>
            <option value="TIC">TIC</option>
      
          </select>
        </div>
      
        <div className="card-body">

            <button className="btn btn-lg btn-primary" onClick={handleAdd} >Guardar</button>
            {" "}
            <Link to="/usuarios" className="btn btn-lg btn-secondary">Volver</Link>
        </div>

      </div>

   

    </div>
  )
}

export default FormAddUsuario