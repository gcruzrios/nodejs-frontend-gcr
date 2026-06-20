import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PhoneCall, ArrowLeft, Save } from "react-feather";

const FormEditContacto = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [empresas, setEmpresas] = useState([]);
  const [form, setForm] = useState({
    nombre: "", email: "", telefono: "", empresa: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contactoRes, empresasRes] = await Promise.all([
          axios.get(`/api/contactos/${id}`),
          axios.get("/api/empresas"),
        ]);
        const data = contactoRes.data.data;
        setForm({
          nombre: data.nombre || "",
          email: data.email || "",
          telefono: data.telefono || "",
          empresa: data.empresa || "",
        });
        setEmpresas(empresasRes.data.data);
      } catch {
        Swal.fire({ text: "Error al cargar el contacto.", icon: "error" });
        navigate("/contactos");
      } finally {
        setFetching(false);
      }
    };
    fetchData();
  }, [id, navigate]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.put(`/api/contactos/${id}`, form);
      Swal.fire({ text: "Contacto actualizado con éxito.", icon: "success", timer: 1500, showConfirmButton: false });
      navigate("/contactos");
    } catch {
      Swal.fire({ text: "Error al actualizar el contacto.", icon: "error" });
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
        <PhoneCall size={18} className="text-success" />
        <h5 className="card-title mb-0">Editar Contacto</h5>
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
              Actualizar
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

export default FormEditContacto;
