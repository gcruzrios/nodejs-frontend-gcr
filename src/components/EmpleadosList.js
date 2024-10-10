import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { useParams } from "react-router-dom";

const EmpleadoList = () => {
  const [empleados, setEmpleados] = useState([]);
  const { id } = useParams();


 


  const peticionGetEmpleados = async () => {
    //console.log("en petición get")         
    await axios.get(`/api/empleado/obtenerempleados/${id}`).then((response) => {
    
      setEmpleados(response.data);
      console.log(empleados);
    });


  };

  useEffect(() => {
   
    peticionGetEmpleados();
  }, []);


  const eliminar_completo = async (id) => {
    const respuesta = await axios.delete(`api/empleado/borrarempleado/${id}`);
    peticionGetEmpleados();
  }  
  const eliminar = async (id) => {


    Swal.fire({
      title: 'Está seguro de borrar el registro?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Borrar',
      denyButtonText: `No borrar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        eliminar_completo(id);
        Swal.fire('Registro borrado!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('El Registro no ha sido borrado', '', 'info')
      }
    })
    
   
  };


  return (
    <div>
      <main className="content">
        <div className="container-fluid p-0">
          <h1 className="h3 mb-3">Empleados</h1>

         

            <div class="col-12 col-xl-12">
							<div class="card">
								<div class="card-header">
									<h5 class="card-title">Empleados registrados</h5>
									
                    <Link to="/addempleado" className="btn btn-primary float-end">Agregar Empleado</Link>
                
								</div>
								<table class="table table-striped">
									<thead>
										<tr>
											<th >Nombre</th>
											<th >Email</th>
                      <th >Telefono</th>
                      
                      <th >Puesto</th>
                      <th >Salario</th>
                      <th >Tipo Contrato</th>
                      <th >Estado</th>
											<th>Actions</th>
										</tr>
									</thead>
									<tbody>
                  {/* {empleados.map((empleado) => ( 
										<tr  key={empleado._id}>
											<td>{empleado.nombre}</td>
                      <td>{empleado.email}</td>
											<td>{empleado.telefono}</td>
                                     
                      <td>{empleado.puesto}</td>
                      <td>{empleado.salario}</td>
											<td>{empleado.tcontrato}</td>    
                      <td>{empleado.estatus}</td>             
											<td class="table-action">
												<Link to={`/editempleado/${empleado._id}`} className="btn btn-info">Editar</Link>{" "}
												<button className="btn btn-danger" onClick={()=>eliminar(empleado._id)}> Borrar</button>
											</td>
										</tr>
									   ))}  */}
									</tbody>
								</table>
							</div>
						</div>

        </div>



        
      </main>
    </div>
  );
};

export default EmpleadoList;
