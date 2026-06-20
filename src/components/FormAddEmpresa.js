import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { Briefcase, ArrowLeft, Save } from "react-feather";

const PAISES = [
  "Guatemala", "Honduras", "El Salvador", "Nicaragua",
  "Costa Rica", "Panamá", "México", "Brasil", "Colombia", "Argentina",
];

const SECTORES = [
  "Agrícola", "Energías", "Tecnologías", "Comercio", "Salud",
  "Servicios Públicos", "Pymes", "Turismo", "Medio Ambiente", "Startups",
];

const FormAddEmpresa = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nombre: "", email: "", telefono: "", pais: "", sector: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.nombre || !form.email || !form.pais || !form.sector) {
      Swal.fire({ text: "Complete todos los campos requeridos.", icon: "warning" });
      return;
    }
    try {
      setLoading(true);
      await axios.post("/api/empresas", form);
      Swal.fire({ text: "Empresa registrada con éxito.", icon: "success", timer: 1500, showConfirmButton: false });
      navigate("/empresas");
    } catch {
      Swal.fire({ text: "Error al registrar la empresa.", icon: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-header d-flex align-items-center gap-2">
        <Briefcase size={18} className="text-primary" />
        <h5 className="card-title mb-0">Nueva Empresa</h5>
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
                placeholder="Nombre de la empresa"
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
                placeholder="correo@empresa.com"
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
                País <span className="text-danger">*</span>
              </label>
              <select
                className="form-select"
                name="pais"
                value={form.pais}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione el país...</option>
                {PAISES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-4">
              <label className="form-label fw-semibold">
                Sector <span className="text-danger">*</span>
              </label>
              <select
                className="form-select"
                name="sector"
                value={form.sector}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione el sector...</option>
                {SECTORES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="d-flex gap-2">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm me-1" />
              ) : (
                <Save size={15} className="me-1" />
              )}
              Guardar
            </button>
            <Link to="/empresas" className="btn btn-outline-secondary">
              <ArrowLeft size={15} className="me-1" />
              Volver
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormAddEmpresa;
