import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BarChart2,
  Briefcase,
  Users,
  PhoneCall,
  UserCheck,
} from "react-feather";

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <nav id="sidebar" className="sidebar js-sidebar">
      <div className="sidebar-content js-simplebar">
        <Link className="sidebar-brand" to="/index">
          <span className="align-middle">GCR Manager</span>
        </Link>

        <ul className="sidebar-nav">
          <li className="sidebar-header">Páginas</li>

          <li className={`sidebar-item${isActive("/index") ? " active" : ""}`}>
            <Link className="sidebar-link" to="/index">
              <BarChart2 className="align-middle" size={18} />
              <span className="align-middle ms-2">Dashboard</span>
            </Link>
          </li>

          <li className={`sidebar-item${isActive("/empresas") ? " active" : ""}`}>
            <Link className="sidebar-link" to="/empresas">
              <Briefcase className="align-middle" size={18} />
              <span className="align-middle ms-2">Empresas</span>
            </Link>
          </li>

          <li className={`sidebar-item${isActive("/contactos") ? " active" : ""}`}>
            <Link className="sidebar-link" to="/contactos">
              <PhoneCall className="align-middle" size={18} />
              <span className="align-middle ms-2">Contactos</span>
            </Link>
          </li>

          <li className={`sidebar-item${isActive("/usuarios") ? " active" : ""}`}>
            <Link className="sidebar-link" to="/usuarios">
              <UserCheck className="align-middle" size={18} />
              <span className="align-middle ms-2">Usuarios</span>
            </Link>
          </li>

          <li className="sidebar-header">Reportes</li>

          <li className="sidebar-item">
            <a className="sidebar-link" href="#charts">
              <Users className="align-middle" size={18} />
              <span className="align-middle ms-2">Estadísticas</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
