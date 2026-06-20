import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Users, ArrowLeft, Save } from "react-feather";

const CONTRATOS = ["Pasante", "Temporal", "Fijo"];

const FormEditEmpleado = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [empresaId, setEmpresaId] = useState(null);
  const [form, setForm] = useState({
    nombre: "", email: "", telefono: "",
    puesto: "", salario: "", tipo_contrato: "", estatus: true,
  });

  useEffect(() => {
    const fetchEmpleado = async () => {
      try {
        const response = await axios.get(`/api/empleados/${id}`);
        const data = response.data.data;
        setForm({
          nombre: data.nombre || "",
          email: data.email || "",
          telefono: data.telefono || "",
          puesto: data.puesto || "",
          salario: data.salario || "",
          tipo_contrato: data.tipo_contrato || "",
          estatus: data.estatus !== undefined ? data.estatus : true,
        });
        setEmpresaId(data.id_empresa);
      } catch {
        Swal.fire({ text: "Error al cargar el empleado.", icon: "error" });
        navigate("/empresas");
      } finally {
        setFetching(false);
      }
    };
    fetchEmpleado();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "estatus" ? value === "true" : value });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.put(`/api/empleados/${id}`, {
        ...form, id_empresa: empresaId,
      });
      Swal.fire({ text: "Empleado actualizado con éxito.", icon: "success", timer: 1500, showConfirmButton: false });
      navigate(`/empleados/${empresaId}`);
    } catch {
      Swal.fire({ text: "Error al actualizar el empleado.", icon: "error" });
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
        <Users size={18} className="text-primary" />
        <h5 className="card-title mb-0">Editar Empleado</h5>
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
                onChange={handleChange}
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
              <label className="form-label fw-semibold">Puesto</label>
              <input
                type="text"
                className="form-control"
                name="puesto"
                value={form.puesto}
                onChange={handleChange}
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
                  min="0"
                  value={form.salario}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label fw-semibold">Tipo de Contrato</label>
              <select
                className="form-select"
                name="tipo_contrato"
                value={form.tipo_contrato}
                onChange={handleChange}
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
              Actualizar
            </button>
            {empresaId && (
              <Link to={`/empleados/${empresaId}`} className="btn btn-outline-secondary">
                <ArrowLeft size={15} className="me-1" />
                Volver
              </Link>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormEditEmpleado;
