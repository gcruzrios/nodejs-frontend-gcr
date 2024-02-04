import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const ContentMain = () => {
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


  const eliminar_completo = async (id) => {
    const respuesta = await axios.delete(`api/empresa/borrarempresa/${id}`);
    peticionGet();
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
        Swal.fire('Empresa borrada!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('La empresa no ha sido borrado', '', 'info')
      }
    })
    
   
  };


  return (
    <div>
      <main className="content">
        <div className="container-fluid p-0">
          <h1 className="h3 mb-3">Empresas</h1>

          {/* <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title mb-0">Empty card</h5>
                </div>
                <div className="card-body"></div>
              </div>
            </div>
          </div> */}

<div class="col-12 col-xl-12">
							<div class="card">
								<div class="card-header">
									<h5 class="card-title">Empresas registradas</h5>
									
                  <Link to="/addempresa" className="btn btn-primary float-end">Agregar Empresa</Link>
                  {/* <button className="btn btn-secondary float-end">Agregar Empresa</button>   */}
								</div>
								<table class="table table-striped">
									<thead>
										<tr>
											<th >Name</th>
											<th >Phone Number</th>
											<th >Pais</th>
                      <th >Sector</th>
											<th>Actions</th>
										</tr>
									</thead>
									<tbody>
                    {empresas.map((empresa) => ( 
										<tr>
											<td>{empresa.nombre}</td>
											<td>{empresa.telefono}</td>
											<td class="d-none d-md-table-cell">{empresa.pais}</td>
                      <td class="d-none d-md-table-cell">{empresa.sector}</td>
											<td class="table-action">
												<Link to={`/editempresa/${empresa._id}`} className="btn btn-info">Editar</Link>{" "}
												<button className="btn btn-danger" onClick={()=>eliminar(empresa._id)}> Borrar</button>
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

export default ContentMain;
