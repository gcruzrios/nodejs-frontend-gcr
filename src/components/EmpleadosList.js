import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Edit2, Trash2, PlusCircle, Users, ArrowLeft, RefreshCw } from "react-feather";

const EmpleadoList = () => {
  const [empleados, setEmpleados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const fetchEmpleados = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`/api/empleados?id_empresa=${id}`);
      setEmpleados(response.data.data);
    } catch {
      setError("No se pudieron cargar los empleados.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchEmpleados();
  }, [fetchEmpleados]);

  const eliminar = async (empleadoId, nombre) => {
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
        await axios.delete(`/api/empleados/${empleadoId}`);
        await fetchEmpleados();
        Swal.fire("Borrado", "El empleado ha sido eliminado.", "success");
      } catch {
        Swal.fire("Error", "No se pudo eliminar el empleado.", "error");
      }
    }
  };

  const contratoColor = (tipo) => {
    if (tipo === "Fijo") return "success";
    if (tipo === "Temporal") return "warning";
    if (tipo === "Pasante") return "info";
    return "secondary";
  };

  return (
    <main className="content">
      <div className="container-fluid p-0">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3 mb-0">
            <Users className="me-2 text-primary" size={22} />
            Empleados
          </h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <Link to="/index">Dashboard</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/empresas">Empresas</Link>
              </li>
              <li className="breadcrumb-item active">Empleados</li>
            </ol>
          </nav>
        </div>

        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="card-title mb-0">Empleados registrados</h5>
            <div className="d-flex gap-2">
              <Link to="/empresas" className="btn btn-sm btn-outline-secondary">
                <ArrowLeft size={14} className="me-1" />
                Volver
              </Link>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={fetchEmpleados}
                title="Recargar"
              >
                <RefreshCw size={14} />
              </button>
              <Link to={`/addempleado/${id}`} className="btn btn-sm btn-primary">
                <PlusCircle size={14} className="me-1" />
                Agregar Empleado
              </Link>
            </div>
          </div>

          {loading ? (
            <div className="card-body text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
              <p className="text-muted mt-2 mb-0">Cargando empleados...</p>
            </div>
          ) : error ? (
            <div className="card-body">
              <div className="alert alert-danger d-flex align-items-center mb-0">
                <span>{error}</span>
                <button
                  className="btn btn-sm btn-outline-danger ms-auto"
                  onClick={fetchEmpleados}
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
                    <th>Puesto</th>
                    <th className="d-none d-lg-table-cell">Salario</th>
                    <th>Contrato</th>
                    <th className="text-end">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {empleados.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center text-muted py-4">
                        No hay empleados en esta empresa.{" "}
                        <Link to={`/addempleado/${id}`}>Agregar el primero</Link>
                      </td>
                    </tr>
                  ) : (
                    empleados.map((empleado) => (
                      <tr key={empleado._id}>
                        <td className="fw-semibold">{empleado.nombre}</td>
                        <td>{empleado.email}</td>
                        <td className="d-none d-md-table-cell">{empleado.telefono}</td>
                        <td>{empleado.puesto}</td>
                        <td className="d-none d-lg-table-cell">
                          {empleado.salario
                            ? `Q ${Number(empleado.salario).toLocaleString()}`
                            : "-"}
                        </td>
                        <td>
                          <span className={`badge bg-${contratoColor(empleado.tipo_contrato)}`}>
                            {empleado.tipo_contrato || "-"}
                          </span>
                        </td>
                        <td className="text-end">
                          <Link
                            to={`/editempleado/${empleado._id}`}
                            className="btn btn-sm btn-outline-primary me-1"
                            title="Editar"
                          >
                            <Edit2 size={13} />
                          </Link>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            title="Borrar"
                            onClick={() => eliminar(empleado._id, empleado.nombre)}
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

export default EmpleadoList;
