import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const UsuariosList = () => {
  const [usuarios, setUsuarios] = useState([]);

  const peticionGetUsuarios = async () => {
    //console.log("en petición get")
    await axios.get("/api/usuario/obtenerusuarios").then((response) => {
      setUsuarios(response.data);
    });
  };

  useEffect(() => {
    peticionGetUsuarios();
  }, []);

  const eliminar_completo = async (id) => {
    const respuesta = await axios.delete(`api/usuario/borrarusuario/${id}`);
    console.log(respuesta)
    peticionGetUsuarios();
  };
  const eliminar = async (id) => {
    Swal.fire({
      title: "Está seguro de borrar el registro?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Borrar",
      denyButtonText: `No borrar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        eliminar_completo(id);
        Swal.fire("Registro borrado!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("El Registro no ha sido borrado", "", "info");
      }
    });
  };

  return (
    <div>
      <main className="content">
        <div className="container-fluid p-0">
          <h1 className="h3 mb-3">Usuarios</h1>

          <div class="col-12 col-xl-12">
            <div class="card">
              <div class="card-header">
                <h5 class="card-title">Usuarios registrados</h5>

                <Link to="/addusuario" className="btn btn-primary float-end">
                  Agregar Usuario
                </Link>
              </div>
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Telefono</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((usuario) => (
                    <tr key={usuario._id}>
                      <td>{usuario.nombre}</td>
                      <td>{usuario.email}</td>
                      <td>{usuario.telefono}</td>

                      <td class="d-none d-md-table-cell">{usuario.role}</td>

                      <td class="table-action">
                        <Link
                          to={`/editusuario/${usuario._id}`}
                          className="btn btn-info"
                        >
                          Editar
                        </Link>{" "}
                        <button
                          className="btn btn-danger"
                          onClick={() => eliminar(usuario._id)}
                        >
                          {" "}
                          Borrar
                        </button>
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

export default UsuariosList;
