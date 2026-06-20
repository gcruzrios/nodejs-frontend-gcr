import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserCheck, ArrowLeft, Save } from "react-feather";

const ROLES = ["Admin", "Ventas", "Soporte", "TIC"];

const FormEditUsuario = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [form, setForm] = useState({
    nombre: "", email: "", telefono: "", role: "",
  });

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await axios.get(`/api/usuarios/${id}`);
        const data = response.data.data;
        setForm({
          nombre: data.nombre || "",
          email: data.email || "",
          telefono: data.telefono || "",
          role: data.role || "",
        });
      } catch {
        Swal.fire({ text: "Error al cargar el usuario.", icon: "error" });
        navigate("/usuarios");
      } finally {
        setFetching(false);
      }
    };
    fetchUsuario();
  }, [id, navigate]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.put(`/api/usuarios/${id}`, form);
      Swal.fire({ text: "Usuario actualizado con éxito.", icon: "success", timer: 1500, showConfirmButton: false });
      navigate("/usuarios");
    } catch {
      Swal.fire({ text: "Error al actualizar el usuario.", icon: "error" });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="card shadow-sm">
        <div className="card-body text-center py-5">
          <div className="spinner-border text-primary" role="status" />
          <p className="text-muted mt-2 mb-0">Cargando datos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card shadow-sm">
      <div className="card-header d-flex align-items-center gap-2">
        <UserCheck size={18} className="text-warning" />
        <h5 className="card-title mb-0">Editar Usuario</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleEdit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">
                Nombre <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={form.email}
                disabled
                onChange={handleChange}
              />
              <small className="text-muted">El email no se puede modificar.</small>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Teléfono</label>
              <input
                type="tel"
                className="form-control"
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6 mb-4">
              <label className="form-label fw-semibold">
                Rol <span className="text-danger">*</span>
              </label>
              <select
                className="form-select"
                name="role"
                value={form.role}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione un rol...</option>
                {ROLES.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? (
                <span className="spinner-border spinner-border-sm me-1" />
              ) : (
                <Save size={15} className="me-1" />
              )}
              Actualizar
            </button>
            <Link to="/usuarios" className="btn btn-outline-secondary">
              <ArrowLeft size={15} className="me-1" />
              Volver
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormEditUsuario;
