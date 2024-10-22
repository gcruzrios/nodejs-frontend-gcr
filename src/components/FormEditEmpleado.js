import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

import { useParams } from "react-router-dom";

const FormEditEmpleado = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  //const [empresa, setEmpresa] = useState("");
  //const [empresas, setEmpresas] = useState([]);

  const [puesto, setPuesto] = useState("");
  const [salario, setSalario] = useState(0);
  const [tcontrato, setTcontrato] = useState("");
  const [estatus, setEstatus] = useState(true);

  const { id } = useParams();
  const id_empresa = localStorage.getItem('id_empresa');


  // const [true, setTrue] = useState(true);
  // const [false, setFalse] = useState(false);

  const GetEmpleado = async () => {
    const response = await axios.get(`/api/empleado/obtenerempleado/${id}`);
    const mensaje = response.data;

    setNombre(mensaje[0].nombre);
    setTelefono(mensaje[0].telefono);
    setEmail(mensaje[0].email);
    setPuesto(mensaje[0].puesto);
    
    setSalario(mensaje[0].salario);
    setTcontrato(mensaje[0].tcontrato);
    setEstatus(mensaje[0].estatus);
    
  };

 

  useEffect(() => {
    GetEmpleado();
  }, []);

  const handleEdit = async (e) => {
    e.preventDefault();

    //    const token = data.Token;
    //    localStorage.setItem("Token", token);

    const empleado = { nombre, telefono, email, id_empresa, puesto, salario, tcontrato, estatus  };
    console.log(empleado);
    const response = await axios.put(
      `/api/empleado/actualizarempleado/${id}`,
      empleado
    );
    const respuesta = response.data;
    console.log(respuesta);

    if (respuesta === null) {
      Swal.fire({
        text: "Error actualizando empleado..",
        icon: "error",
      });
    } else {
      Swal.fire({
        text: "Empleado actualizado con éxito..",
        icon: "success",
      });

      window.location.href = "/empleados/"+id_empresa;
    }
  };

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">Ingrese los datos de empleado</h5>
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
          <input type="text" className="form-control" placeholder="Puesto" 
          onChange={(e) => setPuesto(e.target.value)}
          value={puesto}/>
        </div>
        <div className="card-body">
          <input type="text" className="form-control" placeholder="Salario" 
          onChange={(e) => setSalario(e.target.value)}
          value={salario} />
        </div>
        <div className="card-body">
          {/* <input type="text" className="form-control" placeholder="Tipo Contrato" onChange={(e) => setTcontrato(e.target.value)} /> */}
          <select className="form-select mb-3" value={tcontrato} onChange={(e) => setTcontrato(e.target.value)}>
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
          <button className="btn btn-lg btn-primary" onClick={handleEdit}>
            Editar
          </button>{" "}
          <Link to={`/empleados/${id_empresa}`} className="btn btn-lg btn-secondary">
            Volver
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FormEditEmpleado;
