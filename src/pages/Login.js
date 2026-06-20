import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { LogIn } from "react-feather";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/auth/login", { email, password });
      const { ok, token } = response.data;

      if (ok && token) {
        localStorage.setItem("Token", token);
        navigate("/index");
      } else {
        Swal.fire({ text: "Usuario o contraseña incorrectos.", icon: "error" });
      }
    } catch (err) {
      if (err.response?.status === 401) {
        Swal.fire({ text: "Usuario o contraseña incorrectos.", icon: "error" });
      } else {
        Swal.fire({ text: "Error de conexión. Verifique que el servidor esté activo.", icon: "error" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="d-flex w-100">
      <div className="container d-flex flex-column">
        <div className="row vh-100">
          <div className="col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto d-table h-100">
            <div className="d-table-cell align-middle">
              <div className="text-center mt-4 mb-4">
                <h1 className="h2 fw-bold">GCR Manager</h1>
                <p className="lead text-muted">Ingrese sus credenciales para continuar</p>
              </div>

              <div className="card shadow-sm">
                <div className="card-body p-4">
                  <form onSubmit={handleLogin}>
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Email</label>
                      <input
                        className="form-control form-control-lg"
                        type="email"
                        name="email"
                        placeholder="correo@ejemplo.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="form-label fw-semibold">Contraseña</label>
                      <input
                        className="form-control form-control-lg"
                        type="password"
                        name="password"
                        placeholder="Su contraseña"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="d-grid">
                      <button
                        type="submit"
                        className="btn btn-lg btn-primary"
                        disabled={loading}
                      >
                        {loading ? (
                          <span className="spinner-border spinner-border-sm me-2" />
                        ) : (
                          <LogIn size={16} className="me-2" />
                        )}
                        Ingresar
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <div className="text-center mt-3">
                <span className="text-muted">¿No tiene cuenta? </span>
                <Link to="/register">Regístrese</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
