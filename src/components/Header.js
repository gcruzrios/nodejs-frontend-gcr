import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Bell, LogOut, User, Settings } from "react-feather";

const Header = () => {
  const [userName, setUserName] = useState("Usuario");
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.nombre) setUserName(decoded.nombre);
        if (decoded.role) setUserRole(decoded.role);
      } catch {
        // token inválido
      }
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <nav className="navbar navbar-expand navbar-light navbar-bg">
      <a className="sidebar-toggle js-sidebar-toggle">
        <i className="hamburger align-self-center"></i>
      </a>

      <div className="navbar-collapse collapse">
        <ul className="navbar-nav navbar-align">
          <li className="nav-item dropdown">
            <a
              className="nav-icon dropdown-toggle"
              href="#"
              id="alertsDropdown"
              data-bs-toggle="dropdown"
            >
              <div className="position-relative">
                <Bell className="align-middle" size={20} />
              </div>
            </a>
            <div
              className="dropdown-menu dropdown-menu-lg dropdown-menu-end py-0"
              aria-labelledby="alertsDropdown"
            >
              <div className="dropdown-menu-header">Sin notificaciones</div>
              <div className="dropdown-menu-footer">
                <a href="#" className="text-muted">
                  Ver todas las notificaciones
                </a>
              </div>
            </div>
          </li>

          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle d-none d-sm-inline-block"
              href="#"
              data-bs-toggle="dropdown"
            >
              <div
                className="avatar bg-primary text-white d-inline-flex align-items-center justify-content-center rounded-circle me-1"
                style={{ width: 32, height: 32, fontSize: 13, fontWeight: 600 }}
              >
                {initials}
              </div>
              <span className="text-dark">{userName}</span>
              {userRole && (
                <span className="badge bg-secondary ms-1" style={{ fontSize: 10 }}>
                  {userRole}
                </span>
              )}
            </a>
            <div className="dropdown-menu dropdown-menu-end">
              <div className="dropdown-item disabled text-muted small">
                <User size={14} className="me-1" />
                {userName}
              </div>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">
                <Settings size={14} className="align-middle me-1" />
                Configuración
              </a>
              <div className="dropdown-divider"></div>
              <Link className="dropdown-item text-danger" to="/" onClick={logout}>
                <LogOut size={14} className="align-middle me-1" />
                Cerrar sesión
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
