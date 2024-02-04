import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const FormAddEmpresa = () => {
    
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");
    const [pais, setPais] = useState("");
    const [sector, setSector] = useState("");
   
    
    
    



    const handleAdd = async (e) => {
        e.preventDefault();
    
        const empresa = { nombre, email, telefono, pais, sector };
    
        console.log(empresa);
    
        const response = await axios.post(`/api/empresa/agregarempresa`, empresa);
        const mensaje = response.data;
        console.log(mensaje);
    
        if (mensaje === null) {
          Swal.fire({
            text: "Error insertando empresa..",
            icon: "error",
          });
        } else {
          Swal.fire({
            text: "Empresa insertada con éxito..",
            icon: "success",
          });
    
          window.location.href = "/index";
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
          <select className="form-select mb-3" onChange={(e) => setPais(e.target.value)}>
            <option selected>Escoga el País</option>
            <option value="Guatemala">Guatemala</option>
            <option value="Honduras">Honduras</option>
            <option value="El Salvador">El Salvador</option>
            <option value="Nicaragua">Nicaragua</option>
            <option value="Costa Rica">Costa Rica</option>
            <option value="Panama">Panamá</option>
            <option value="Mexico">México</option>
            <option value="Brasil">Brasil</option>
            <option value="Colombia">Colombia</option>
            <option value="Argentina">Argentina</option>
          </select>
        </div>
        <div className="card-body">
          <select className="form-select mb-3" onChange={(e) => setSector(e.target.value)}>
            <option selected>Escoga el Sector</option>
            <option value="Agricultura">Agrícola</option>
            <option value="Energia">Energías</option>
            <option value="Tecnologias">Tecnologías</option>
            <option value="Comercial">Comercio</option>
            <option value="Salud">Salud</option>
            <option value="Servicios Publicos">Servicios Públicos</option>
            <option value="Pymes">Pymes</option>
            <option value="Turismo">Turismo</option>
            <option value="Medio Ambiente">Medio Ambiente</option>
            <option value="Startups">Startups</option>
          </select>
        </div>
        <div className="card-body">

            <button className="btn btn-lg btn-primary" onClick={handleAdd} >Guardar</button>
            {" "}
            <Link to="/index" className="btn btn-lg btn-secondary">Volver</Link>
        </div>

      </div>

      {/* <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">Textarea</h5>
        </div>
        <div className="card-body">
          <textarea
            className="form-control"
            rows="2"
            placeholder="Textarea"
          ></textarea>
        </div>
      </div> */}




    </div>
  );
};

export default FormAddEmpresa;
