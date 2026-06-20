import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Briefcase, ArrowLeft, Save } from "react-feather";

const PAISES = [
  "Guatemala", "Honduras", "El Salvador", "Nicaragua",
  "Costa Rica", "Panamá", "México", "Brasil", "Colombia", "Argentina",
];

const SECTORES = [
  "Agrícola", "Energías", "Tecnologías", "Comercio", "Salud",
  "Servicios Públicos", "Pymes", "Turismo", "Medio Ambiente", "Startups",
];

const FormEditEmpresa = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [form, setForm] = useState({
    nombre: "", email: "", telefono: "", pais: "", sector: "",
  });

  useEffect(() => {
    const fetchEmpresa = async () => {
      try {
        const response = await axios.get(`/api/empresas/${id}`);
        const data = response.data.data;
        setForm({
          nombre: data.nombre || "",
          email: data.email || "",
          telefono: data.telefono || "",
          pais: data.pais || "",
          sector: data.sector || "",
        });
      } catch {
        Swal.fire({ text: "Error al cargar la empresa.", icon: "error" });
        navigate("/empresas");
      } finally {
        setFetching(false);
      }
    };
    fetchEmpresa();
  }, [id, navigate]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.put(`/api/empresas/${id}`, form);
      Swal.fire({ text: "Empresa actualizada con éxito.", icon: "success", timer: 1500, showConfirmButton: false });
      navigate("/empresas");
    } catch {
      Swal.fire({ text: "Error al actualizar la empresa.", icon: "error" });
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
        <Briefcase size={18} className="text-primary" />
        <h5 className="card-title mb-0">Editar Empresa</h5>
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
              <label className="form-label fw-semibold">
                Email <span className="text-danger">*</span>
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
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
                value={form.telefono}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">País</label>
              <select
                className="form-select"
                name="pais"
                value={form.pais}
                onChange={handleChange}
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
              <label className="form-label fw-semibold">Sector</label>
              <select
                className="form-select"
                name="sector"
                value={form.sector}
                onChange={handleChange}
              >
                <option value="">Seleccione el sector...</option>
                {SECTORES.map((s) => (
                  <option key={s} value={s}>{s}</option>
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

export default FormEditEmpresa;
