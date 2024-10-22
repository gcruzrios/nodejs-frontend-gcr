import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const FormAddEmpleado = () => {

    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");
    
    const [puesto, setPuesto] = useState("");
    const [salario, setSalario] = useState(0);
    const [tcontrato, setTcontrato] = useState("");
    const [estatus, setEstatus] = useState(true);

    const id_empresa = localStorage.getItem('id_empresa');

   const handleAdd = async (e) => {
        e.preventDefault();
    
        const empleado = { nombre, email, telefono, id_empresa, puesto, salario, tcontrato };
    
        console.log(empleado);
    
        const response = await axios.post(`/api/empleado/agregarempleado`, empleado);
        const mensaje = response.data;
        console.log(mensaje);
    
        if (mensaje === null) {
          Swal.fire({
            text: "Error insertando empleado..",
            icon: "error",
          });
        } else {
          Swal.fire({
            text: "empleado insertada con éxito..",
            icon: "success",
          });
    
         // window.location.href = `/empleados/${id_empresa}`;
          window.location.href = "/empleados/"+id_empresa


        }
      };
  return (
    <div>
         <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">Ingrese los datos de la empleado</h5>
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
          <input type="text" className="form-control" placeholder="Puesto" onChange={(e) => setPuesto(e.target.value)}/>
        </div>
        <div className="card-body">
          <input type="text" className="form-control" placeholder="Salario" onChange={(e) => setSalario(e.target.value)} />
        </div>
        <div className="card-body">
          {/* <input type="text" className="form-control" placeholder="Tipo Contrato" onChange={(e) => setTcontrato(e.target.value)} /> */}
          <select className="form-select mb-3" onChange={(e) => setTcontrato(e.target.value)}>
            <option selected>Escoga tipo de contrato</option>
            <option value="Pasante">Pasante</option>
            <option value="Temporal">Temporal</option>
            <option value="Fijo">Fijo</option>
            
          </select>

        </div>
        <div className="card-body">
          {/* <input type="text" className="form-control" placeholder="Estado" onChange={(e) => setEstado(e.target.value)} /> */}
          <select className="form-select mb-3" onChange={(e) => setEstatus(e.target.value)}>
            <option selected>Escoga el Estado</option>
            <option value={true}>Activo</option>
            <option value={false}>Inactivo</option>
            
          </select>
        
        </div>

    

        
       




        <div className="card-body">
        </div>
      
        <div className="card-body">

            <button className="btn btn-lg btn-primary" onClick={handleAdd} >Guardar</button>
            {" "}
            <Link to= {`/empleados/${id_empresa}`} className="btn btn-lg btn-secondary">Volver</Link>
        </div>

      </div>

   

    </div>
  )
}

export default FormAddEmpleado