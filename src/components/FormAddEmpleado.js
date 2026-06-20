import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Users, ArrowLeft, Save } from "react-feather";

const CONTRATOS = ["Pasante", "Temporal", "Fijo"];

const FormAddEmpleado = () => {
  const navigate = useNavigate();
  const { empresaId } = useParams();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nombre: "", email: "", telefono: "",
    puesto: "", salario: "", tipo_contrato: "", estatus: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "estatus" ? value === "true" : value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.nombre || !form.email || !form.puesto || !form.tcontrato) {
      Swal.fire({ text: "Complete todos los campos requeridos.", icon: "warning" });
      return;
    }
    try {
      setLoading(true);
      await axios.post("/api/empleados", { ...form, id_empresa: empresaId });
      Swal.fire({ text: "Empleado registrado con éxito.", icon: "success", timer: 1500, showConfirmButton: false });
      navigate(`/empleados/${empresaId}`);
    } catch {
      Swal.fire({ text: "Error al registrar el empleado.", icon: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-header d-flex align-items-center gap-2">
        <Users size={18} className="text-primary" />
        <h5 className="card-title mb-0">Nuevo Empleado</h5>
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
                placeholder="correo@empleado.com"
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
                Puesto <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="puesto"
                placeholder="Ej: Desarrollador, Gerente..."
                value={form.puesto}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 mb-3">
              <label className="form-label fw-semibold">Salario</label>
              <div className="input-group">
                <span className="input-group-text">Q</span>
                <input
                  type="number"
                  className="form-control"
                  name="salario"
                  placeholder="0.00"
                  min="0"
                  value={form.salario}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label fw-semibold">
                Tipo de Contrato <span className="text-danger">*</span>
              </label>
              <select
                className="form-select"
                name="tipo_contrato"
                value={form.tipo_contrato}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione...</option>
                {CONTRATOS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="col-md-4 mb-4">
              <label className="form-label fw-semibold">Estado</label>
              <select
                className="form-select"
                name="estatus"
                value={String(form.estatus)}
                onChange={handleChange}
              >
                <option value="true">Activo</option>
                <option value="false">Inactivo</option>
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
            <Link to={`/empleados/${empresaId}`} className="btn btn-outline-secondary">
              <ArrowLeft size={15} className="me-1" />
              Volver
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormAddEmpleado;
