import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { PhoneCall, ArrowLeft, Save } from "react-feather";

const FormAddContacto = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [empresas, setEmpresas] = useState([]);
  const [form, setForm] = useState({
    nombre: "", email: "", telefono: "", empresa: "",
  });

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const response = await axios.get("/api/empresas");
        setEmpresas(response.data.data);
      } catch {
        // fallo silencioso en carga de empresas
      }
    };
    fetchEmpresas();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.nombre || !form.email) {
      Swal.fire({ text: "Complete los campos requeridos.", icon: "warning" });
      return;
    }
    try {
      setLoading(true);
      await axios.post("/api/contactos", form);
      Swal.fire({ text: "Contacto registrado con éxito.", icon: "success", timer: 1500, showConfirmButton: false });
      navigate("/contactos");
    } catch {
      Swal.fire({ text: "Error al registrar el contacto.", icon: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-header d-flex align-items-center gap-2">
        <PhoneCall size={18} className="text-success" />
        <h5 className="card-title mb-0">Nuevo Contacto</h5>
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
                placeholder="correo@contacto.com"
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
            <div className="col-md-6 mb-4">
              <label className="form-label fw-semibold">Empresa</label>
              <select
                className="form-select"
                name="empresa"
                value={form.empresa}
                onChange={handleChange}
              >
                <option value="">Sin empresa asignada</option>
                {empresas.map((emp) => (
                  <option key={emp._id} value={emp.nombre}>
                    {emp.nombre}
                  </option>
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
              Guardar
            </button>
            <Link to="/contactos" className="btn btn-outline-secondary">
              <ArrowLeft size={15} className="me-1" />
              Volver
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormAddContacto;
