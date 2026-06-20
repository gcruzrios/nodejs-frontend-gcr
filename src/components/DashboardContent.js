import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Briefcase, PhoneCall, UserCheck, TrendingUp } from "react-feather";

const StatCard = ({ title, value, icon, color, link }) => (
  <div className="col-xl-3 col-md-6 mb-4">
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div className="col mt-0">
            <h5 className="card-title text-muted">{title}</h5>
          </div>
          <div className="col-auto">
            <div className={`stat text-${color}`}>{icon}</div>
          </div>
        </div>
        <h1 className="mt-1 mb-3 display-5 fw-bold">{value}</h1>
        <div className="mb-0">
          <Link to={link} className={`text-${color} text-decoration-none small`}>
            Ver todos →
          </Link>
        </div>
      </div>
    </div>
  </div>
);

const DashboardContent = () => {
  const [stats, setStats] = useState({ empresas: 0, contactos: 0, usuarios: 0 });
  const [empresas, setEmpresas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [empRes, conRes, usrRes] = await Promise.all([
          axios.get("/api/empresas"),
          axios.get("/api/contactos"),
          axios.get("/api/usuarios"),
        ]);
        setStats({
          empresas: empRes.data.total ?? empRes.data.data.length,
          contactos: conRes.data.total ?? conRes.data.data.length,
          usuarios: usrRes.data.total ?? usrRes.data.data.length,
        });
        setEmpresas(empRes.data.data.slice(0, 5));
      } catch {
        // fallo silencioso en dashboard
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <main className="content">
      <div className="container-fluid p-0">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3 mb-0">
            <TrendingUp className="me-2 text-primary" size={22} />
            Dashboard
          </h1>
          <span className="text-muted small">Resumen general del sistema</span>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        ) : (
          <>
            <div className="row">
              <StatCard
                title="Empresas"
                value={stats.empresas}
                icon={<Briefcase size={24} />}
                color="primary"
                link="/empresas"
              />
              <StatCard
                title="Contactos"
                value={stats.contactos}
                icon={<PhoneCall size={24} />}
                color="success"
                link="/contactos"
              />
              <StatCard
                title="Usuarios"
                value={stats.usuarios}
                icon={<UserCheck size={24} />}
                color="warning"
                link="/usuarios"
              />
            </div>

            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="card-title mb-0">
                      <Briefcase size={16} className="me-2 text-primary" />
                      Últimas Empresas
                    </h5>
                    <Link to="/empresas" className="btn btn-sm btn-outline-primary">
                      Ver todas
                    </Link>
                  </div>
                  <div className="card-body p-0">
                    <table className="table table-hover mb-0">
                      <thead className="table-light">
                        <tr>
                          <th>Nombre</th>
                          <th>Email</th>
                          <th>Teléfono</th>
                          <th>País</th>
                          <th>Sector</th>
                        </tr>
                      </thead>
                      <tbody>
                        {empresas.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="text-center text-muted py-4">
                              No hay empresas registradas
                            </td>
                          </tr>
                        ) : (
                          empresas.map((empresa) => (
                            <tr key={empresa._id}>
                              <td>
                                <Link to={`/empleados/${empresa._id}`} className="fw-semibold text-decoration-none">
                                  {empresa.nombre}
                                </Link>
                              </td>
                              <td>{empresa.email}</td>
                              <td>{empresa.telefono}</td>
                              <td>{empresa.pais}</td>
                              <td>
                                <span className="badge bg-light text-dark border">
                                  {empresa.sector}
                                </span>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default DashboardContent;
