import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { Edit2, Trash2, PlusCircle, UserCheck, RefreshCw } from "react-feather";

const roleBadge = (role) => {
  const map = { Admin: "danger", Ventas: "primary", Soporte: "warning", TIC: "info" };
  return map[role] || "secondary";
};

const UsuariosList = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsuarios = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("/api/usuarios");
      setUsuarios(response.data.data);
    } catch {
      setError("No se pudieron cargar los usuarios.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsuarios();
  }, [fetchUsuarios]);

  const eliminar = async (id, nombre) => {
    const result = await Swal.fire({
      title: `¿Borrar "${nombre}"?`,
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/api/usuarios/${id}`);
        await fetchUsuarios();
        Swal.fire("Borrado", "El usuario ha sido eliminado.", "success");
      } catch {
        Swal.fire("Error", "No se pudo eliminar el usuario.", "error");
      }
    }
  };

  return (
    <main className="content">
      <div className="container-fluid p-0">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3 mb-0">
            <UserCheck className="me-2 text-warning" size={22} />
            Usuarios
          </h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <Link to="/index">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">Usuarios</li>
            </ol>
          </nav>
        </div>

        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="card-title mb-0">Usuarios del sistema</h5>
            <div className="d-flex gap-2">
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={fetchUsuarios}
                title="Recargar"
              >
                <RefreshCw size={14} />
              </button>
              <Link to="/addusuario" className="btn btn-sm btn-primary">
                <PlusCircle size={14} className="me-1" />
                Agregar Usuario
              </Link>
            </div>
          </div>

          {loading ? (
            <div className="card-body text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
              <p className="text-muted mt-2 mb-0">Cargando usuarios...</p>
            </div>
          ) : error ? (
            <div className="card-body">
              <div className="alert alert-danger d-flex align-items-center mb-0">
                <span>{error}</span>
                <button
                  className="btn btn-sm btn-outline-danger ms-auto"
                  onClick={fetchUsuarios}
                >
                  Reintentar
                </button>
              </div>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th className="d-none d-md-table-cell">Teléfono</th>
                    <th>Rol</th>
                    <th className="text-end">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center text-muted py-4">
                        No hay usuarios registrados.{" "}
                        <Link to="/addusuario">Agregar el primero</Link>
                      </td>
                    </tr>
                  ) : (
                    usuarios.map((usuario) => (
                      <tr key={usuario._id}>
                        <td className="fw-semibold">{usuario.nombre}</td>
                        <td>{usuario.email}</td>
                        <td className="d-none d-md-table-cell">{usuario.telefono}</td>
                        <td>
                          <span className={`badge bg-${roleBadge(usuario.role)}`}>
                            {usuario.role}
                          </span>
                        </td>
                        <td className="text-end">
                          <Link
                            to={`/editusuario/${usuario._id}`}
                            className="btn btn-sm btn-outline-primary me-1"
                            title="Editar"
                          >
                            <Edit2 size={13} />
                          </Link>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            title="Borrar"
                            onClick={() => eliminar(usuario._id, usuario.nombre)}
                          >
                            <Trash2 size={13} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default UsuariosList;
