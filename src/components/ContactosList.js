import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const ContactoList = () => {
  const [contactos, setContactos] = useState([]);



 


  const peticionGetContactos = async () => {
    //console.log("en petición get")         
    await axios.get("/api/contacto/obtenercontactos").then((response) => {
      setContactos(response.data);
     // console.log(empresas);
    });


  };

  useEffect(() => {
   
    peticionGetContactos();
  }, []);


  const eliminar_completo = async (id) => {
    const respuesta = await axios.delete(`api/contacto/borrarcontacto/${id}`);
    peticionGetContactos();
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
          <h1 className="h3 mb-3">Contactos</h1>

         

<div class="col-12 col-xl-12">
							<div class="card">
								<div class="card-header">
									<h5 class="card-title">Contactos registrados</h5>
									
                                 <Link to="/addcontacto" className="btn btn-primary float-end">Agregar Contacto</Link>
                
								</div>
								<table class="table table-striped">
									<thead>
										<tr>
											<th >Nombre</th>
											<th >Email</th>
                                            <th >Telefono</th>
                                            <th >Empresa</th>
											<th>Actions</th>
										</tr>
									</thead>
									<tbody>
                                        {contactos.map((contacto) => ( 
										<tr  key={contacto._id}>
											<td>{contacto.nombre}</td>
                                            <td>{contacto.email}</td>
											<td>{contacto.telefono}</td>
                                            
                                            
											<td class="d-none d-md-table-cell">{contacto.empresa}</td>
                                            
											<td class="table-action">
												<Link to={`/editcontacto/${contacto._id}`} className="btn btn-info">Editar</Link>{" "}
												<button className="btn btn-danger" onClick={()=>eliminar(contacto._id)}> Borrar</button>
											</td>
										</tr>
									   ))} 
									</tbody>
								</table>
							</div>
						</div>

        </div>



        
      </main>
    </div>
  );
};

export default ContactoList;
