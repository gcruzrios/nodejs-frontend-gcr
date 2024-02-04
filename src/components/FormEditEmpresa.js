import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';

const FormEditEmpresa = () => {

    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");
    const [pais, setPais] = useState("");
    const [sector, setSector] = useState("");
    const { id } = useParams();

    //console.log(id);

    const GetEmpresa = async () => {

        const response = await axios.get(`/api/empresa/obtenerempresa/${id}`);
        const mensaje = response.data;
       
        setNombre(mensaje[0].nombre);
        setTelefono(mensaje[0].telefono);
        setEmail(mensaje[0].email);

        setPais(mensaje[0].pais);
        setSector(mensaje[0].sector);
            
        
        
    }
    
    const handleEdit = async (e) => {
        e.preventDefault();
    
    //    const token = data.Token;
    //    localStorage.setItem("Token", token);
    
        const empresa = { nombre, telefono, email,pais, sector };
        console.log(empresa);
        const response = await axios.put(`/api/empresa/actualizarempresa/${id}`, empresa);
        const respuesta = response.data;
        console.log(respuesta);
        
        
        if (respuesta ===null) {
          Swal.fire({
            text: "Error actualizando empresa..",
            icon: "error",
          });
        } else {
            Swal.fire({
                text: "Empresa actualizado con éxito..",
                icon: "success",
              });
         
          window.location.href = "/index";
        }
      };
    
      useEffect(() => {
        GetEmpresa();
        
      }, []);
    



  return (
    <div>
         <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">Actualice los datos de la empresa</h5>
        </div>
        <div className="card-body">
          <input type="text" className="form-control" placeholder="Nombre"  value={nombre} onChange={(e) => setNombre(e.target.value)}/>
        </div>
        <div className="card-body">
          <input type="text" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="card-body">
          <input type="text" className="form-control" placeholder="Telefóno" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
        </div>
        <div className="card-body">
          <select className="form-select mb-3" value={pais} onChange={(e) => setPais(e.target.value)}>
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
          <select className="form-select mb-3" value={sector} onChange={(e) => setSector(e.target.value)}>
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

            <button className="btn btn-lg btn-primary" onClick={handleEdit} >Editar</button>
            {" "}
            <Link to="/index" className="btn btn-lg btn-secondary">Volver</Link>
        </div>

      </div>
    </div>
  )
}

export default FormEditEmpresa