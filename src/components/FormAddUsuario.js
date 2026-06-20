import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { UserCheck, ArrowLeft, Save } from "react-feather";

const ROLES = ["Admin", "Ventas", "Soporte", "TIC"];

const FormAddUsuario = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({
    nombre: "", email: "", telefono: "", password: "", role: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.nombre || !form.email || !form.password || !form.role) {
      Swal.fire({ text: "Complete todos los campos requeridos.", icon: "warning" });
      return;
    }
    try {
      setLoading(true);
      await axios.post("/api/usuarios", form);
      Swal.fire({ text: "Usuario registrado con éxito.", icon: "success", timer: 1500, showConfirmButton: false });
      navigate("/usuarios");
    } catch {
      Swal.fire({ text: "Error al registrar el usuario.", icon: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-header d-flex align-items-center gap-2">
        <UserCheck size={18} className="text-warning" />
        <h5 className="card-title mb-0">Nuevo Usuario</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleAdd}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">
                Nombre <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="nombre"
                placeholder="Nombre completo"
                value={form.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">
                Email <span className="text-danger">*</span>
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="correo@usuario.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Teléfono</label>
              <input
                type="tel"
                className="form-control"
                name="telefono"
                placeholder="+(502) 0000-0000"
                value={form.telefono}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6 mb-3">
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

          <div className="row">
            <div className="col-md-6 mb-4">
              <label className="form-label fw-semibold">
                Contraseña <span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <input
                  type={showPass ? "text" : "password"}
                  className="form-control"
                  name="password"
                  placeholder="Mínimo 6 caracteres"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? "Ocultar" : "Mostrar"}
                </button>
              </div>
            </div>
          </div>

          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? (
                <span className="spinner-border spinner-border-sm me-1" />
              ) : (
                <Save size={15} className="me-1" />
              )}
              Guardar
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

export default FormAddUsuario;
