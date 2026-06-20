import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { Edit2, Trash2, PlusCircle, PhoneCall, RefreshCw } from "react-feather";

const ContactoList = () => {
  const [contactos, setContactos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchContactos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("/api/contactos");
      setContactos(response.data.data);
    } catch {
      setError("No se pudieron cargar los contactos.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContactos();
  }, [fetchContactos]);

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
        await axios.delete(`/api/contactos/${id}`);
        await fetchContactos();
        Swal.fire("Borrado", "El contacto ha sido eliminado.", "success");
      } catch {
        Swal.fire("Error", "No se pudo eliminar el contacto.", "error");
      }
    }
  };

  return (
    <main className="content">
      <div className="container-fluid p-0">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3 mb-0">
            <PhoneCall className="me-2 text-success" size={22} />
            Contactos
          </h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <Link to="/index">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">Contactos</li>
            </ol>
          </nav>
        </div>

        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="card-title mb-0">Contactos registrados</h5>
            <div className="d-flex gap-2">
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={fetchContactos}
                title="Recargar"
              >
                <RefreshCw size={14} />
              </button>
              <Link to="/addcontacto" className="btn btn-sm btn-primary">
                <PlusCircle size={14} className="me-1" />
                Agregar Contacto
              </Link>
            </div>
          </div>

          {loading ? (
            <div className="card-body text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
              <p className="text-muted mt-2 mb-0">Cargando contactos...</p>
            </div>
          ) : error ? (
            <div className="card-body">
              <div className="alert alert-danger d-flex align-items-center mb-0">
                <span>{error}</span>
                <button
                  className="btn btn-sm btn-outline-danger ms-auto"
                  onClick={fetchContactos}
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
                    <th className="d-none d-md-table-cell">Empresa</th>
                    <th className="text-end">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {contactos.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center text-muted py-4">
                        No hay contactos registrados.{" "}
                        <Link to="/addcontacto">Agregar el primero</Link>
                      </td>
                    </tr>
                  ) : (
                    contactos.map((contacto) => (
                      <tr key={contacto._id}>
                        <td className="fw-semibold">{contacto.nombre}</td>
                        <td>{contacto.email}</td>
                        <td className="d-none d-md-table-cell">{contacto.telefono}</td>
                        <td className="d-none d-md-table-cell">
                          <span className="badge bg-light text-dark border">
                            {contacto.empresa}
                          </span>
                        </td>
                        <td className="text-end">
                          <Link
                            to={`/editcontacto/${contacto._id}`}
                            className="btn btn-sm btn-outline-primary me-1"
                            title="Editar"
                          >
                            <Edit2 size={13} />
                          </Link>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            title="Borrar"
                            onClick={() => eliminar(contacto._id, contacto.nombre)}
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

export default ContactoList;
