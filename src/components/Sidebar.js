import React from "react";

const Sidebar = () => {
  return (
    <div>
      <nav id="sidebar" className="sidebar js-sidebar">
        <div className="sidebar-content js-simplebar">
          <a className="sidebar-brand" href="index.html">
            <span className="align-middle">AdminKit</span>
          </a>

          <ul className="sidebar-nav">
            <li className="sidebar-header">Pages</li>

            <li className="sidebar-item active">
              <a className="sidebar-link" href="/index">
                <i className="align-middle" data-feather="sliders"></i>{" "}
                
                
                <span className="align-middle">Dashboard</span>
              </a>
            </li>
            <li className="sidebar-item">
              <a className="sidebar-link" href="/empresas">
                <i className="align-middle" data-feather="user"></i>{" "}
                <span className="align-middle">Empresas</span>
              </a>
            </li>

            <li className="sidebar-item">
              <a className="sidebar-link" href="/contactos">
                <i className="align-middle" data-feather="user"></i>{" "}
                <span className="align-middle">Contactos</span>
              </a>
            </li>
            <li className="sidebar-item">
              <a className="sidebar-link" href="/usuarios">
                <i className="align-middle" data-feather="user"></i>{" "}
                <span className="align-middle">Usuarios</span>
              </a>
            </li>

            {/* <li className="sidebar-item">
              <a className="sidebar-link" href="pages-sign-in.html">
                <i className="align-middle" data-feather="log-in"></i>{" "}
                <span className="align-middle">Sign In</span>
              </a>
            </li>

            <li className="sidebar-item">
              <a className="sidebar-link" href="pages-sign-up.html">
                <i className="align-middle" data-feather="user-plus"></i>{" "}
                <span className="align-middle">Sign Up</span>
              </a>
            </li> */}

            <li className="sidebar-item ">
              <a className="sidebar-link" href="/blank">
                <i className="align-middle" data-feather="book"></i>{" "}
                <span className="align-middle">Blank</span>
              </a>
            </li>

            

            <li className="sidebar-header">Plugins & Addons</li>

            <li className="sidebar-item">
              <a className="sidebar-link" href="charts-chartjs.html">
                <i className="align-middle" data-feather="bar-chart-2"></i>{" "}
                <span className="align-middle">Charts</span>
              </a>
            </li>

            <li className="sidebar-item">
              <a className="sidebar-link" href="maps-google.html">
                <i className="align-middle" data-feather="map"></i>{" "}
                <span className="align-middle">Maps</span>
              </a>
            </li>
          </ul>

          
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
