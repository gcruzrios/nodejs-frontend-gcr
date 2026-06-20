import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { Edit2, Trash2, PlusCircle, Briefcase, RefreshCw } from "react-feather";

const ContentMain = () => {
  const [empresas, setEmpresas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEmpresas = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("/api/empresas");
      setEmpresas(response.data.data);
    } catch {
      setError("No se pudieron cargar las empresas. Verifique su conexión.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmpresas();
  }, [fetchEmpresas]);

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
        await axios.delete(`/api/empresas/${id}`);
        await fetchEmpresas();
        Swal.fire("Borrado", "La empresa ha sido eliminada.", "success");
      } catch {
        Swal.fire("Error", "No se pudo eliminar la empresa.", "error");
      }
    }
  };

  return (
    <main className="content">
      <div className="container-fluid p-0">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3 mb-0">
            <Briefcase className="me-2 text-primary" size={22} />
            Empresas
          </h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <Link to="/index">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">Empresas</li>
            </ol>
          </nav>
        </div>

        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="card-title mb-0">Empresas registradas</h5>
            <div className="d-flex gap-2">
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={fetchEmpresas}
                title="Recargar"
              >
                <RefreshCw size={14} />
              </button>
              <Link to="/addempresa" className="btn btn-sm btn-primary">
                <PlusCircle size={14} className="me-1" />
                Agregar Empresa
              </Link>
            </div>
          </div>

          {loading ? (
            <div className="card-body text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
              <p className="text-muted mt-2 mb-0">Cargando empresas...</p>
            </div>
          ) : error ? (
            <div className="card-body">
              <div className="alert alert-danger d-flex align-items-center mb-0">
                <span>{error}</span>
                <button
                  className="btn btn-sm btn-outline-danger ms-auto"
                  onClick={fetchEmpresas}
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
                    <th>Teléfono</th>
                    <th>Email</th>
                    <th className="d-none d-md-table-cell">País</th>
                    <th className="d-none d-md-table-cell">Sector</th>
                    <th className="text-end">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {empresas.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center text-muted py-4">
                        No hay empresas registradas.{" "}
                        <Link to="/addempresa">Agregar la primera</Link>
                      </td>
                    </tr>
                  ) : (
                    empresas.map((empresa) => (
                      <tr key={empresa._id}>
                        <td>
                          <Link
                            to={`/empleados/${empresa._id}`}
                            className="fw-semibold text-decoration-none"
                          >
                            {empresa.nombre}
                          </Link>
                        </td>
                        <td>{empresa.telefono}</td>
                        <td>{empresa.email}</td>
                        <td className="d-none d-md-table-cell">{empresa.pais}</td>
                        <td className="d-none d-md-table-cell">
                          <span className="badge bg-light text-dark border">
                            {empresa.sector}
                          </span>
                        </td>
                        <td className="text-end">
                          <Link
                            to={`/editempresa/${empresa._id}`}
                            className="btn btn-sm btn-outline-primary me-1"
                            title="Editar"
                          >
                            <Edit2 size={13} />
                          </Link>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            title="Borrar"
                            onClick={() => eliminar(empresa._id, empresa.nombre)}
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

export default ContentMain;
